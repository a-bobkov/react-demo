export async function deleteUser( userId )
{
  const response = await fetch(
    `/api/user/${ userId }`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok)
  {
    throw new Error(`Delete user ${ userId } returned status: ${ response.status }`);
  }
}
