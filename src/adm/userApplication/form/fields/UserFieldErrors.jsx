import { useLingo } from '../../../lingo/LingoProvider.jsx';
import './UserFieldErrors.css';

export function UserFieldErrors({ formError, saveError })
{
  return (
    <div className="UserFieldErrors">
      <UserFieldFormError
        formError={ formError }
      />
      <UserFieldSaveError
        saveError={ saveError }
      />
    </div>
  );
}

function UserFieldFormError({ formError })
{
  return formError && (
    <div className="UserFieldFormError">
      { formError }
    </div>
  );
}

function UserFieldSaveError({ saveError })
{
  const { lingo } = useLingo();

  return saveError && (
    <div className="UserFieldSaveError">
      { lingo( saveError ) }
    </div>
  );
}
