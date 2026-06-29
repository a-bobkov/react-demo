import { useLingo } from '../../../lingo/LingoProvider.jsx';
import './UserFormFieldErrors.css';

export function UserFormFieldErrors({ formError, saveError })
{
  return (
    <user-form-field-errors>
      <UserFieldFormError
        formError={ formError }
      />
      <UserFieldSaveError
        saveError={ saveError }
      />
    </user-form-field-errors>
  );
}

function UserFieldFormError({ formError })
{
  return formError && (
    <user-field-form-error>
      { formError }
    </user-field-form-error>
  );
}

function UserFieldSaveError({ saveError })
{
  const { lingo } = useLingo();

  return saveError && (
    <user-field-save-error>
      { lingo( saveError ) }
    </user-field-save-error>
  );
}
