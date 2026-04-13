import { FetchCommonError } from '../FetchCommonError.jsx';

export function UserAppGet({ getOptions: { userId, fetchCommonError }})
{
  console.log(`UserAppGet userId: ${ JSON.stringify( userId )}`);
  console.log(`UserAppGet fetchCommonError: ${ JSON.stringify( fetchCommonError )}`);

  if ( fetchCommonError ) {
    return (
      <FetchCommonError error={ fetchCommonError } />
    );
  }

  return (
    <div className="UserAppGet">
      {`Loading user ${ userId } ...`}
    </div>
  );
}
