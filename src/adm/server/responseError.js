import * as http2 from 'node:http2';

export function create(message, responseStatusCode, responseHeaders, responseBodyJson)
{
  const error = new Error(message);

  error.info = {
    responseStatusCode: responseStatusCode,
    responseHeaders: responseHeaders,
    responseBodyJson: responseBodyJson,
  };

  return error;
}

export function getInfo(error)
{
  console.error('\n', error);

  const responseStatusCode = error.info?.responseStatusCode ?? http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;

  const responseHeaders = error.info?.responseHeaders ?? {};

  const responseBodyJson = error.info?.responseBodyJson ?? '';

  return {
    responseStatusCode,
    responseHeaders,
    responseBodyJson,
  };
}