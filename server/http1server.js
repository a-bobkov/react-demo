export {
  create as create,
};

import * as http from 'node:http';
import * as http2 from 'node:http2';
import * as events from 'node:events';

async function create( api, onRequestReceived )
{
  const httpServer = http.createServer({
    keepAliveTimeout: 0,
  });

  httpServer.on( 'request', onRequestReceived );

  await listen( api.host, api.port );

  return {
    getRequestBodyValue: getRequestBodyValue,
    replyResponse: replyResponse,
  };

  function listen( host, port )
  {
    httpServer.listen( port, host );

    return events.once( httpServer, 'listening');
  }

  async function getRequestBodyValue( request )
  {
    const bodyChunks = await request.toArray();

    const body = Buffer.concat( bodyChunks ).toString();

    return body !== '' ? JSON.parse( body ) : null;
  }

  async function replyResponse( response, status, headers, bodyValue )
  {
    await delay( 1000 );

    const body = bodyValue
      ? JSON.stringify( bodyValue )
      : '';

    headers[ http2.constants.HTTP2_HEADER_CONTENT_LENGTH ] = Buffer.byteLength( body );

    if ( bodyValue ) {
      headers[ http2.constants.HTTP2_HEADER_CONTENT_TYPE ] = 'application/json';
    }

    return new Promise(( resolve, reject ) =>
    {
      try {
        response.writeHead( status, headers )
        response.end( body, resolve );
      }
      catch ( error )
      {
        reject( error );
      }
    });
  }
}

function delay( ms )
{
  return new Promise(resolve => setTimeout( resolve, ms ));
}