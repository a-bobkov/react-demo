import { BranchFormFieldName } from './name/BranchFormFieldName.jsx';
import './BranchFormFields.css';

export function BranchFormFields({ formBranch, formErrors, saveErrors, isFieldChangedDb, setFormBranch })
{
  return (
    <branch-form-fields>
      <BranchFormFieldName
        value={ formBranch.name }
        formErrors={ formErrors.name }
        saveErrors={ saveErrors.name }
        isFieldChanged={ isFieldChangedDb.name }
        onChangeName={ onChangeName }
      />
    </branch-form-fields>
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
