import * as http2 from 'node:http2';
import * as responseError from '../responseError.js';
import * as User from './User.js';
import initialUsers from './initialUsers.js';
import serverParameters from '../../serverParameters.js';

const href = `${ serverParameters.protocol}//${ serverParameters.host}:${ serverParameters.port }${ serverParameters.startPath }`;
console.log(`curl -i -X QUERY ${ href }/user -d'{"filters":[{"field":"login","operator":"includes","value":"mail"}]}'`);
console.log(`curl -i -X QUERY ${ href }/user -d'{"filters":[{"field":"active","operator":"equal","value":false}]}'`);
console.log(`curl -i -X QUERY ${ href }/user -d'{"sortings":[{"field":"login","order":"asc"}]}'`);
console.log(`curl -i -X QUERY ${ href }/user -d'{"pagination":{"limit":5,"offset":3}}'`);
console.log(`curl -i -X GET ${ href }/user/1`);
console.log(`curl -i -X POST ${ href }/user -d'{"login":"aaa@mail.ru","name":"An","company":"Noname","active":true}'`);
console.log(`curl -i -X PUT ${ href }/user/1 -d'{"login":"a@mail.ru","name":"An","company":"Noname","active":false}'`);
console.log(`curl -i -X PUT ${ href }/user/1 -d'{"login":"a@b","salutation":9}'`);  // error
console.log(`curl -i -X DELETE ${ href }/user/2`);

const users = User.create( initialUsers );

export function dispatchUser( requestMethod, requestPathParameter, requestBodyValue )
{
  switch ( requestMethod ) {
    case 'QUERY':
      return users.queryUser( requestBodyValue );
    case 'GET':
      return users.getUser( requestPathParameter );
    case 'POST':
      return users.createUser( requestBodyValue) ;
    case 'PUT':
      return users.updateUser( requestPathParameter, requestBodyValue );
    case 'DELETE':
      return users.deleteUser( requestPathParameter );
  }

  throw responseError.create(
    `Method not allowed: ${ requestMethod }`,
    http2.constants.HTTP_STATUS_METHOD_NOT_ALLOWED,
  );
}
