import * as http2 from 'node:http2';
import * as http1Server from './http1server.js';
import * as responseError from './responseError.js';
import * as Users from './Users.js';
import serverParameters from '../serverParameters.js';
import initialUsers from './initialUsers.js';

const users = Users.create( initialUsers );

const httpServer = await http1Server.create(
  serverParameters.host,
  serverParameters.port,
  onRequestReceived
);

const href = `${ serverParameters.protocol}//${ serverParameters.host}:${ serverParameters.port }${ serverParameters.startPath }`;
console.log(`curl -i ${ href }/users -d'{"filters":[{"field":"login","operator":"includes","value":"mail"}]}'`);
console.log(`curl -i ${ href }/users -d'{"filters":[{"field":"active","operator":"equal","value":false}]}'`);
console.log(`curl -i ${ href }/users -d'{"sortings":[{"field":"login","order":"asc"}]}'`);
console.log(`curl -i ${ href }/users -d'{"pagination":{"limit":5,"offset":3}}'`);
console.log(`curl -i ${ href }/user/1`);
console.log(`curl -i ${ href }/user -d'{"login":"aaa@mail.ru","name":"An","company":"Noname"}'`);
console.log(`curl -i -X PUT ${ href }/user/1 -d'{"login":"a@mail.ru"}'`);
console.log(`curl -i -X PUT ${ href }/user/1 -d'{"login":"a@b","salutation":9}'`);  // error
console.log(`curl -i -X DELETE ${ href }/user/2`);

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
    const requestUrlSegments = requestPath.replace( serverParameters.startPath, '').split('/');

    if (requestUrlSegments[1] === 'users')
    {
      return dispatchUsers( requestMethod, requestBodyValue );
    }

    if (requestUrlSegments[1] === 'user')
    {
      return dispatchUser( requestMethod, requestUrlSegments[2], requestBodyValue );
    }

  }

  throw responseError.create(
    `Incorrect request path: ${ requestPath }`,
    http2.constants.HTTP_STATUS_NOT_FOUND,
  );
}

function dispatchUsers( requestMethod, options )
{
  switch ( requestMethod ) {
    case 'POST':
      return users.searchUsers(options);
  }

  throw responseError.create(
    `Method not allowed: ${ requestMethod }`,
    http2.constants.HTTP_STATUS_METHOD_NOT_ALLOWED,
  );
}

function dispatchUser( requestMethod, userId, user )
{
  switch ( requestMethod ) {
    case 'GET':
      return users.getUser(userId);
    case 'POST':
      return users.createUser(user);
    case 'PUT':
      return users.updateUser(userId, user);
    case 'DELETE':
      return users.deleteUser(userId);
  }

  throw responseError.create(
    `Method not allowed: ${ requestMethod }`,
    http2.constants.HTTP_STATUS_METHOD_NOT_ALLOWED,
  );
}
