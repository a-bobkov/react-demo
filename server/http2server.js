export {
  create as create,
};

import * as http2 from 'node:http2';
import * as events from 'node:events';
import * as fs from 'node:fs/promises';

async function create(api, onRequestReceived)
{
  const serverOptions = {
    key: await fs.readFile(api.keyName),
    cert: await fs.readFile(api.certName),
  };

  const httpServer = http2.createSecureServer(serverOptions);

  setupOnStream();

  await listen(api.host, api.port);

  return {
    getRequestBodyValue: getRequestBodyValue,
    replyResponse: replyResponse,
  };

  function setupOnStream()
  {
    httpServer.on('stream', async (stream, requestHeaders) =>
    {
      if (requestHeaders[http2.constants.HTTP2_HEADER_METHOD] === http2.constants.HTTP2_METHOD_OPTIONS)
      {
        return await replyOptionsResponse(stream);
      }

      await onRequestReceived(stream, requestHeaders);
    });
  }

  function listen(host, port)
  {
    httpServer.listen(port, host);

    return events.once(httpServer, 'listening');
  }

  async function getRequestBodyValue(stream)
  {
    const bodyChunks = await stream.toArray();

    const body = Buffer.concat(bodyChunks).toString();

    return body !== '' ? JSON.parse(body) : null;
  }

  async function replyResponse(stream, status, headers, bodyValue)
  {
    await delay(1000);

    const body = bodyValue
      ? JSON.stringify(bodyValue)
      : '';

    if (bodyValue) {
      headers[http2.constants.HTTP2_HEADER_CONTENT_TYPE] = 'application/json';
    }

    headers[http2.constants.HTTP2_HEADER_CONTENT_LENGTH] = Buffer.byteLength(body);

    headers[http2.constants.HTTP2_HEADER_STATUS] = status;

    headers['Access-Control-Allow-Origin'] = 'http://localhost:4173';

    return new Promise((resolve, reject) => {
      try {
        stream.respond(headers);
        stream.end(body, resolve);
      }
      catch (error)
      {
        reject(error);
      }
    });
  }
}

async function replyOptionsResponse(stream)
{
  const headers = {
    [http2.constants.HTTP2_HEADER_STATUS]: http2.constants.HTTP_STATUS_NO_CONTENT,
    'Access-Control-Allow-Origin': 'http://localhost:4173',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Max-Age': '86400',
  };

  return new Promise((resolve, reject) => {
    try {
      stream.respond(headers);
      stream.end(resolve);
    }
    catch (error)
    {
      reject(error);
    }
  });
}

function delay(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}