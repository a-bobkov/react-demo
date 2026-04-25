import * as http2 from 'node:http2';
import * as Branch from './Branch.js';
import * as responseError from '../responseError.js';
import serverParameters from '../../serverParameters.js';
import initialBranches from './initialBranches.js';

const href = `${ serverParameters.protocol }//${ serverParameters.host }:${ serverParameters.port }${ serverParameters.startPath }/branch`;
console.log('');
console.log(`curl -i -X QUERY ${ href } -d'{"filters":[{"field":"name","operator":"includes","value":"mü"}]}'`);
console.log(`curl -i -X QUERY ${ href } -d'{"sortings":[{"field":"name","order":"asc"}]}'`);
console.log(`curl -i -X QUERY ${ href } -d'{"pagination":{"limit":2,"offset":2}}'`);
console.log(`curl -i -X GET ${ href }/1`);
console.log(`curl -i -X POST ${ href } -d'{"name":"Dresden"}'`);
console.log(`curl -i -X PUT ${ href }/1 -d'{"name":"Leipzig"}'`);
console.log(`curl -i -X PUT ${ href }/1 -d'{"name":""}'`);  // error
console.log(`curl -i -X DELETE ${ href }/2`);

const branches = Branch.create( initialBranches );

export function dispatchBranch( requestMethod, requestPathParameter, requestBodyValue )
{
  switch ( requestMethod ) {
    case 'QUERY':
      return branches.queryBranch( requestBodyValue );
    case 'GET':
      return branches.getBranch( requestPathParameter );
    case 'POST':
      return branches.createBranch( requestBodyValue) ;
    case 'PUT':
      return branches.updateBranch( requestPathParameter, requestBodyValue );
    case 'DELETE':
      return branches.deleteBranch( requestPathParameter );
  }

  throw responseError.create(
    `Method not allowed: ${ requestMethod }`,
    http2.constants.HTTP_STATUS_METHOD_NOT_ALLOWED,
  );
}
