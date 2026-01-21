import * as http2 from 'node:http2';
import * as responseError from '../responseError.js';

export function newErrorBadRequest( message )
{
  return responseError.create(
    message,
    http2.constants.HTTP_STATUS_BAD_REQUEST,
  );
}
