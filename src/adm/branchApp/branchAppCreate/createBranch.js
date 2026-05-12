export async function createBranch( formBranch )
{
  console.log(`Starting create: ${ JSON.stringify( formBranch )}`);

  const body = (new TextEncoder).encode( JSON.stringify( formBranch ));

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Content-Length': body.length.toString(),
  });

  const response = await fetch(
    `/api/branch`,
    {
      method: 'POST',
      headers,
      body,
    }
  );

  if ( !response.ok )
  {
    throw new Error(`returned status ${ response.status }`);
  }

  const result = await response.json();

  console.log(`Create result: ${ JSON.stringify( result )}`);

  return result;
}
