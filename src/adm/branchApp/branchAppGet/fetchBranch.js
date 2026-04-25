export async function fetchBranch( branchId, lingo )
{
  const response = await fetch(`/api/branch/${ branchId }`);

  if (!response.ok) {
    throw new Error( lingo({
      en: `Get branch ${ branchId } returned status: ${ response.status }`,
      de: `Abrufen die Niederlassung ${ branchId } gab den Status zurück: ${ response.status }`,
    }));
  }

  const result = await response.json();

  console.log(`Get result: ${ JSON.stringify( result )}`);

  return result;
}
