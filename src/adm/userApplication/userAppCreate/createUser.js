export async function createUser( formUser, lingo )
{
  console.log(`Starting create: ${ JSON.stringify( formUser )}`);

  const body = JSON.stringify( formUser );

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
    throw new Error( lingo({
      en: `Create user returned status: ${ response.status }`,
      de: `Erstellen den Benutzer gab den Status zurück: ${ response.status }`,
    }));
  }

  const result = await response.json();

  console.log(`Create result: ${ JSON.stringify( result )}`);

  return result;
}
