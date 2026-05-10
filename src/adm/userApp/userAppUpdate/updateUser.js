export async function updateUser( formUser )
{
  console.log(`Starting update: ${ JSON.stringify( formUser )}`);

  const body = (new TextEncoder).encode( JSON.stringify( formUser ));

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Content-Length': body.length.toString(),
  });

  const response = await fetch(
    `/api/user/${ formUser.id }`,
    {
      method: 'PUT',
      headers,
      body,
    }
  );

  if (!response.ok)
  {
    throw new Error(`Update user ${ formUser.id } returned status: ${ response.status }`);
  }

  const result = await response.json();

  console.log(`Update result: ${ JSON.stringify( result )}`);

  return result;
}
