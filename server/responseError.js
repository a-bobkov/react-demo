import * as http2 from 'node:http2';

export function create(message, responseStatusCode, responseHeaders, responseBodyValue)
{
  const error = new Error(message);

  error.info = {
    responseStatusCode,
    responseHeaders,
    responseBodyValue,
  };

  return error;
}

export function getInfo(error)
{
  console.error('\n', error.stack, printDetails(error.info));

  const responseStatusCode = error.info?.responseStatusCode ?? http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;

  const responseHeaders = error.info?.responseHeaders ?? {};

  const responseBodyValue = error.info?.responseBodyValue ?? '';

  return {
    responseStatusCode,
    responseHeaders,
    responseBodyValue,
  };
}

function printDetails(details)
{
  return Object.entries(details || []).map(([key, value]) =>
    `\n       ${ key }: ${ JSON.stringify(value) }`
  ).join('');
}
