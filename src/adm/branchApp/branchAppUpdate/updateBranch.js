export async function updateBranch( formBranch )
{
  console.log(`Starting update: ${ JSON.stringify( formBranch )}`);

  const body = (new TextEncoder).encode( JSON.stringify( formBranch ));

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Content-Length': body.length.toString(),
  });

  const response = await fetch(
    `/api/branch/${ formBranch.id }`,
    {
      method: 'PUT',
      headers,
      body,
    }
  );

  if ( !response.ok )
  {
    throw new Error(`returned status ${ response.status }`);
  }

  const result = await response.json();

  console.log(`Update result: ${ JSON.stringify( result )}`);

  return result;
}
