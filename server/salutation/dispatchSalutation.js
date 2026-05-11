import * as http2 from 'node:http2';
import * as Salutation from './Salutation.js';
import * as responseError from '../responseError.js';
import serverParameters from '../../serverParameters.js';
import initialSalutations from './initialSalutations.js';

const href = `${ serverParameters.protocol }//${ serverParameters.host }:${ serverParameters.port }${ serverParameters.startPath }/salutation`;
console.log('');
console.log(`curl -i -X QUERY ${ href }`);

export const salutations = Salutation.create( initialSalutations );

export function dispatchSalutation( requestMethod )
{
  switch ( requestMethod ) {
    case 'QUERY':
      return salutations.querySalutation();
  }

  throw responseError.create(
    `Method not allowed: ${ requestMethod }`,
    http2.constants.HTTP_STATUS_METHOD_NOT_ALLOWED,
  );
}
