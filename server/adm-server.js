import * as http2 from 'node:http2';
import * as http2Server from './http2server.js';
import * as responseError from './responseError.js';
import * as Users from './Users.js';
import initialUsers from './initialUsers.js';

const users = Users.create(initialUsers);

const parameters = {
  host: 'localhost',
  port: 8082,
  keyName: 'localhost-key.pem',
  certName: 'localhost.pem',
};

const httpServer = await http2Server.create(
  parameters,
  onRequestReceived
);

console.log(`curl -i https://${ parameters.host}:${ parameters.port }/users -d'{"filters":[{"field":"login","operator":"includes","value":"mail"}]}'`);
console.log(`curl -i https://${ parameters.host}:${ parameters.port }/users -d'{"sortings":[{"field":"login","order":"asc"}]}'`);
console.log(`curl -i https://${ parameters.host}:${ parameters.port }/users -d'{"pagination":{"limit":5,"offset":3}}'`);
console.log(`curl -i https://${ parameters.host}:${ parameters.port }/user/1`);
console.log(`curl -i https://${ parameters.host}:${ parameters.port }/user -d'{"login":"aaa@mail.ru","name":"An","company":"Noname"}'`);
console.log(`curl -i -X PUT https://${ parameters.host}:${ parameters.port }/user/1 -d'{"login":"a@mail.ru"'`);
console.log(`curl -i -X DELETE https://${ parameters.host}:${ parameters.port }/user/2`);

async function onRequestReceived(stream, requestHeaders)
{
  try
  {
    const requestPath = decodeURIComponent(requestHeaders[http2.constants.HTTP2_HEADER_PATH]);

    const requestBodyValue = await httpServer.getRequestBodyValue(stream);

    const responseBodyValue = dispatchRequest(requestPath, requestHeaders, requestBodyValue);

    await replySuccess(stream, responseBodyValue);
  }
  catch (error)
  {
    const { responseStatusCode, responseHeaders, responseBodyValue } = responseError.getInfo(error);

    try {
      await httpServer.replyResponse(stream, responseStatusCode, responseHeaders, responseBodyValue);
    } catch (error) {
      console.log('Unrecoverable error sending error response: ', error);
    }
  }
}

async function replySuccess(stream, responseBodyValue)
{
  await delay(1000);

  const responseStatusCode = http2.constants.HTTP_STATUS_OK;

  const responseHeaders = {};

  await httpServer.replyResponse(stream, responseStatusCode, responseHeaders, responseBodyValue);
}

function dispatchRequest(requestPath, requestHeaders, requestBodyValue)
{
  const requestUrlSegments = requestPath.split('/');

  if (requestUrlSegments[1] === 'users') {
    return dispatchUsers(requestHeaders, requestBodyValue);
  }

  if (requestUrlSegments[1] === 'user') {
    return dispatchUser(requestHeaders, requestUrlSegments[2], requestBodyValue);
  }

  throw responseError.create(
    `Incorrect request path: ${ requestPath }`,
    http2.constants.HTTP_STATUS_NOT_FOUND,
  );
}

function dispatchUsers(headers, options)
{
  switch (headers[http2.constants.HTTP2_HEADER_METHOD]) {
    case 'POST':
      return users.searchUsers(options);
  }

  throw responseError.create(
    `Method not allowed: ${ headers[http2.constants.HTTP2_HEADER_METHOD] }`,
    http2.constants.HTTP_STATUS_METHOD_NOT_ALLOWED,
  );
}

function dispatchUser(headers, userId, user)
{
  switch (headers[http2.constants.HTTP2_HEADER_METHOD]) {
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
    `Method not allowed: ${ headers[http2.constants.HTTP2_HEADER_METHOD] }`,
    http2.constants.HTTP_STATUS_METHOD_NOT_ALLOWED,
  );
}

function delay(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}