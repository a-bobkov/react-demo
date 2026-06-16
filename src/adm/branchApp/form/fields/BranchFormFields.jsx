import { BranchFormFieldName } from './name/BranchFormFieldName.jsx';
import './BranchFormFields.css';

export function BranchFormFields({ formBranch, formErrors, saveErrors, isFieldChangedDb, setFormBranch })
{
  return (
    <div className="BranchFormFields">
      <BranchFormFieldName
        value={ formBranch.name }
        formErrors={ formErrors.name }
        saveErrors={ saveErrors.name }
        isFieldChanged={ isFieldChangedDb.name }
        onChangeName={ onChangeName }
      />
    </div>
  );

  function onChangeName( formName )
  {
    updateFormBranch({ name: formName });
  }

  function updateFormBranch( update )
  {
    setFormBranch({
      ...formBranch,
      ...update,
    });
  }
}
