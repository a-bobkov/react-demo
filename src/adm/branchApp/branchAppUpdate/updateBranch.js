export async function updateBranch( formBranch, lingo )
{
  console.log(`Starting update: ${ JSON.stringify( formBranch )}`);

  const body = (new TextEncoder).encode( JSON.stringify( formBranch ));

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Content-Length': body.length.toString(),
  });

  const response = await fetch(
    `/api/branch/${ formBranch.id }`,
    {
      method: 'PUT',
      headers,
      body,
    }
  );

  if (!response.ok) {
    throw new Error( lingo({
      en: `Update branch ${ formBranch.id } returned status: ${ response.status }`,
      de: `Aktualisieren die Niederlassung ${ formBranch.id } gab den Status zurück: ${ response.status }`,
    }));
  }

  const result = await response.json();

  console.log(`Update result: ${ JSON.stringify( result )}`);

  return result;
}
