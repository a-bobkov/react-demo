export async function updateUser( formUser )
{
  console.log(`Starting update: ${ JSON.stringify( formUser )}`);

  const body = JSON.stringify( formUser );

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Content-Length': (new TextEncoder).encode(body).length.toString(),
  });

  const response = await fetch(
    `https://localhost:8082/user/${ formUser.id }`,
    {
      method: 'PUT',
      headers,
      body,
    }
  );

  if (!response.ok) {
    throw new Error(`Update user returned status ${ response.status }`);
  }

  const result = await response.json();

  console.log(`Update result: ${ JSON.stringify( result )}`);

  return result;
}
