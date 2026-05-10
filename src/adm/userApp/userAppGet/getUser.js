export async function getUser( userId )
{
  const response = await fetch(`/api/user/${ userId }`);

  if ( !response.ok )
  {
    throw new Error(`Get user ${ userId } returned status: ${ response.status }`);
  }

  const result = await response.json();

  console.log(`Get result: ${ JSON.stringify( result )}`);

  return result;
}
