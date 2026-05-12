export async function getBranch( branchId )
{
  const response = await fetch(`/api/branch/${ branchId }`);

  if ( !response.ok )
  {
    throw new Error(`returned status ${ response.status }`);
  }

  const result = await response.json();

  console.log(`Get result: ${ JSON.stringify( result )}`);

  return result;
}
