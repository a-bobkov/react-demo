import { getRequestOptions } from './getRequestOptions.js';

export async function userQuery( options, signal )
{
  console.log(`Starting abortable query user with options: ${ JSON.stringify( options )}`);

  const body = (new TextEncoder).encode( JSON.stringify( getRequestOptions( options )));

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Content-Length': body.length.toString(),
  });

  const response = await fetch(
    '/api/user',
    {
      method: 'QUERY',
      headers,
      body,
      signal,
    }
  );

  if ( !response.ok )
  {
    throw new Error(`User query returned status: ${ response.status }`);
  }

  const users = await response.json();

  console.log(`Finished fetch: ${ JSON.stringify( users )}`);

  return users;
}
