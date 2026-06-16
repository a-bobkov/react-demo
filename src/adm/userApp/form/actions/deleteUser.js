export async function deleteUser( userId )
{
  const response = await fetch(
    `/api/user/${ userId }`,
    {
      method: 'DELETE',
    }
  );

  if ( !response.ok )
  {
    throw new Error(`returned status ${ response.status }`);
  }
}
