export async function deleteBranch( branchId )
{
  const response = await fetch(
    `/api/branch/${ branchId }`,
    {
      method: 'DELETE',
    }
  );

  if ( !response.ok )
  {
    throw new Error(`returned status ${ response.status }`, {
      cause: {
        status: response.status,
      }
    });
  }
}
