export async function fetchUser( userId )
{
  console.log(`Starting get: ${ userId }`);

  const response = await fetch(`https://localhost:8082/user/${ userId }`);

  if (!response.ok) {
    throw new Error(`Get user ${ userId } returned status ${ response.status }`);
  }

  const result = await response.json();

  console.log(`Get result: ${ JSON.stringify( result )}`);

  return result;
}
