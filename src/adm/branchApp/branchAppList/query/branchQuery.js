import { getRequestOptions } from './getRequestOptions.js';

export async function branchQuery( options, signal )
{
  console.log(`Starting abortable query branch with options: ${ JSON.stringify( options )}`);

  const body = (new TextEncoder).encode( JSON.stringify( getRequestOptions( options )));

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Content-Length': body.length.toString(),
  });

  const response = await fetch(
    '/api/branch',
    {
      method: 'QUERY',
      headers,
      body,
      signal,
    }
  );

  if ( !response.ok )
  {
    throw new Error(`returned status ${ response.status }`);
  }

  const branches = await response.json();

  console.log(`Finished fetch: ${ JSON.stringify( branches )}`);

  return branches;
}
