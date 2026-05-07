import * as http2 from 'node:http2';
import * as User from './User.js';
import * as responseError from '../responseError.js';
import serverParameters from '../../serverParameters.js';
import initialUsers from './initialUsers.js';

const href = `${ serverParameters.protocol}//${ serverParameters.host}:${ serverParameters.port }${ serverParameters.startPath }/user`;
console.log('');
console.log(`curl -i -X QUERY ${ href } -d'{"filters":[{"field":"login","operator":"includes","value":"mail"}]}'`);
console.log(`curl -i -X QUERY ${ href } -d'{"filters":[{"field":"active","operator":"equal","value":false}]}'`);
console.log(`curl -i -X QUERY ${ href } -d'{"sortings":[{"field":"login","order":"asc"}]}'`);
console.log(`curl -i -X QUERY ${ href } -d'{"pagination":{"limit":5,"offset":3}}'`);
console.log(`curl -i -X GET ${ href }/1`);
console.log(`curl -i -X POST ${ href } -d'{"login":"aaa@mail.ru","name":"An","company":"Noname","branch":{"id":1},"active":true}'`);
console.log(`curl -i -X PUT ${ href }/1 -d'{"login":"a@mail.ru","name":"An","company":"Noname","branch":{"id":2},"active":false}'`);
console.log(`curl -i -X PUT ${ href }/1 -d'{"login":"a@b","branch":{"id":11},"salutation":9}'`);  // error
console.log(`curl -i -X DELETE ${ href }/2`);

export const users = User.create( initialUsers );

export function dispatchUser( requestMethod, requestPathParameter, requestBodyValue )
{
  const userId = requestPathParameter
    ? parseInt( requestPathParameter )
    : undefined;

  switch ( requestMethod ) {
    case 'QUERY':
      return users.queryUser( requestBodyValue );
    case 'GET':
      return users.getUser( userId );
    case 'POST':
      return users.createUser( requestBodyValue) ;
    case 'PUT':
      return users.updateUser( userId, requestBodyValue );
    case 'DELETE':
      return users.deleteUser( userId );
  }

  throw responseError.create(
    `Method not allowed: ${ requestMethod }`,
    http2.constants.HTTP_STATUS_METHOD_NOT_ALLOWED,
  );
}
