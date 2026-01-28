export async function fetchUser( userId )
{
  console.log(`Starting fetch with userId: "${ userId }"`);

  const response = await fetch(`https://localhost:8082/user/${ userId }`);

  if (!response.ok) {
    throw new Error(`Get user finished with status ${ response.status }`);
  }

  const user = await response.json();

  console.log(`Finished fetch user: "${ JSON.stringify( user )}"`);

  return user;
}
