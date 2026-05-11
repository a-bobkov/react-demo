export async function querySalutations()
{
  const response = await fetch(
    '/api/salutation',
    {
      method: 'QUERY',
    }
  );

  if ( !response.ok )
  {
    throw new Error(`Salutation query returned status: ${ response.status }`);
  }

  const salutations = await response.json();

  console.log(`Finished fetch: "${ JSON.stringify( salutations )}"`);

  return salutations;
}
