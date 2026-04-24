import { FetchCommonError } from '../FetchCommonError.jsx';
import { useLingo } from '../../lingo/LingoProvider.jsx';

export function UserAppGet({ getOptions: { userId, fetchCommonError }})
{
  const { lingo } = useLingo();

  console.log(`UserAppGet userId: ${ JSON.stringify( userId )}`);
  console.log(`UserAppGet fetchCommonError: ${ JSON.stringify( fetchCommonError )}`);

  if ( fetchCommonError ) {
    return (
      <FetchCommonError error={ fetchCommonError } />
    );
  }

  return (
    <div className="UserAppGet">
      { lingo({
        en: `Loading user ${ userId } ...`,
        de: `Benutzer ${ userId } wird geladen ...`,
      })}
    </div>
  );
}
