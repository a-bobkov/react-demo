export async function deleteUser( userId, lingo )
{
  const response = await fetch(
    `/api/user/${ userId }`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error( lingo({
      en: `Delete user ${ userId } returned status: ${ response.status }`,
      de: `Löschen den Benutzer ${ userId } gab den Status zurück: ${ response.status }`,
    }));
  }

  console.log(`Delete result: ${ JSON.stringify( response.status )}`);
}
