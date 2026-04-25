export async function deleteBranch( branchId, lingo )
{
  const response = await fetch(
    `/api/branch/${ branchId }`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error( lingo({
      en: `Delete branch ${ branchId } returned status: ${ response.status }`,
      de: `Löschen die Niederlassung ${ branchId } gab den Status zurück: ${ response.status }`,
    }));
  }

  console.log(`Delete result: ${ JSON.stringify( response.status )}`);
}
