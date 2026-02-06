export async function createUser( user )
{
  console.log(`Starting create: "${ JSON.stringify( user )}"`);

  const body = JSON.stringify( user );

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Content-Length': (new TextEncoder).encode(body).length.toString(),
  });

  const response = await fetch(
    `https://localhost:8082/user`,
    {
      method: 'POST',
      headers,
      body,
    }
  );

  if (!response.ok) {
    throw new Error(`Create user finished with status ${ response.status }`);
  }

  const result = await response.json();

  console.log(`Finished create: "${ JSON.stringify( result )}"`);

  return result;
}
