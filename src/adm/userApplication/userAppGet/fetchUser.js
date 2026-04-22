export async function fetchUser( userId, lingo )
{
  const response = await fetch(`/api/user/${ userId }`);

  if (!response.ok) {
    throw new Error( lingo({
      en: `Get user ${ userId } returned status: ${ response.status }`,
      de: `Abrufen den Benutzer ${ userId } gab den Status zurück: ${ response.status }`,
    }));
  }

  const result = await response.json();

  console.log(`Get result: ${ JSON.stringify( result )}`);

  return result;
}
