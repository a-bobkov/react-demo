export async function deleteUser( userId )
{
  console.log(`Starting delete: "${ JSON.stringify( userId )}"`);

  const response = await fetch(
    `https://localhost:8082/user/${ userId }`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error(`Deleting user ${ userId } finished with status ${ response.status }`);
  }

  console.log(`Finished delete: "${ JSON.stringify( response.status )}"`);
}
