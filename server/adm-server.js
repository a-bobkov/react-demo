import * as http2 from 'node:http2';
import * as http1Server from './http1server.js';
import * as responseError from './responseError.js';
import serverParameters from '../serverParameters.js';
import { dispatchUser } from './user/dispatchUser.js';

const httpServer = await http1Server.create(
  serverParameters.host,
  serverParameters.port,
  onRequestReceived
);

async function onRequestReceived( request, response )
{
  try
  {
    const requestPath = decodeURIComponent( request.url );

    const requestBodyValue = await httpServer.getRequestBodyValue( request );

    const responseBodyValue = dispatchRequest( requestPath, request.method, requestBodyValue );

    await replySuccess( response, responseBodyValue );
  }
  catch (error)
  {
    const { responseStatusCode, responseHeaders, responseBodyValue } = responseError.getInfo(error);

    try {
      await httpServer.replyResponse( response, responseStatusCode, responseHeaders, responseBodyValue );
    } catch (error) {
      console.log('Unrecoverable error sending error response: ', error);
    }
  }
}

async function replySuccess( response, responseBodyValue)
{
  const responseStatusCode = http2.constants.HTTP_STATUS_OK;

  const responseHeaders = {};

  await httpServer.replyResponse( response, responseStatusCode, responseHeaders, responseBodyValue );
}

function dispatchRequest( requestPath, requestMethod, requestBodyValue )
{
  if ( requestPath.startsWith( serverParameters.startPath ))
  {
    const requestPathSegments = requestPath.replace( serverParameters.startPath, '').split('/');

    if (requestPathSegments[1] === 'user')
    {
      return dispatchUser( requestMethod, requestPathSegments[2], requestBodyValue );
    }
  }

  throw responseError.create(
    `Incorrect request path: ${ requestPath }`,
    http2.constants.HTTP_STATUS_NOT_FOUND,
  );
}
