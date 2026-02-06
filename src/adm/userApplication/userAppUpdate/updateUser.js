export async function updateUser( user )
{
  console.log(`Starting update: ${ JSON.stringify( user )}`);

  const body = JSON.stringify( user );

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Content-Length': (new TextEncoder).encode(body).length.toString(),
  });

  const response = await fetch(
    `https://localhost:8082/user/${ user.id }`,
    {
      method: 'PUT',
      headers,
      body,
    }
  );

  if (!response.ok) {
    throw new Error(`Update user finished with status ${ response.status }`);
  }

  const result = await response.json();

  console.log(`Finished update: ${ JSON.stringify( result )}`);

  return result;
}
