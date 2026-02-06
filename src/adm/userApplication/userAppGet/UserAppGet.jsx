import { FetchCommonError } from '../FetchCommonError.jsx';

export function UserAppGet({ getOptions: { userId, error }})
{
  console.log(`UserAppGet userId: ${ JSON.stringify( userId )}`);
  console.log(`UserAppGet error: ${ JSON.stringify( error )}`);

  if (error) {
    return (
      <FetchCommonError error={ error } />
    );
  }

  return (
    <div className="UserAppGet">
      <div>
        {`Loading user ${userId} ...`}
      </div>
    </div>
  );
}
