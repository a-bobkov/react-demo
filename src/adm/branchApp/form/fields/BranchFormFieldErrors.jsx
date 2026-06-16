import { useLingo } from '../../../lingo/LingoProvider.jsx';
import './BranchFormFieldErrors.css';

export function BranchFormFieldErrors({ formError, saveError })
{
  return (
    <div className="BranchFieldErrors">
      <BranchFieldFormError
        formError={ formError }
      />
      <BranchFieldSaveError
        saveError={ saveError }
      />
    </div>
  );
}

function BranchFieldFormError({ formError })
{
  return formError && (
    <div className="BranchFieldFormError">
      { formError }
    </div>
  );
}

function BranchFieldSaveError({ saveError })
{
  const { lingo } = useLingo();

  return saveError && (
    <div className="BranchFieldSaveError">
      { lingo( saveError ) }
    </div>
  );
}
