import { useLingo } from '../../../lingo/LingoProvider.jsx';
import './BranchFormFieldErrors.css';

export function BranchFormFieldErrors({ formError, saveError })
{
  return (
    <branch-form-field-errors>
      <BranchFieldFormError
        formError={ formError }
      />
      <BranchFieldSaveError
        saveError={ saveError }
      />
    </branch-form-field-errors>
  );
}

function BranchFieldFormError({ formError })
{
  return formError && (
    <branch-field-form-error>
      { formError }
    </branch-field-form-error>
  );
}

function BranchFieldSaveError({ saveError })
{
  const { lingo } = useLingo();

  return saveError && (
    <branch-field-save-error>
      { lingo( saveError ) }
    </branch-field-save-error>
  );
}
