export async function deleteUser( userId )
{
  console.log(`Starting delete: ${ userId }`);

  const response = await fetch(
    `https://localhost:8082/user/${ userId }`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error(`Delete user ${ userId } returned status ${ response.status }`);
  }

  console.log(`Delete result: ${ JSON.stringify( response.status )}`);
}
