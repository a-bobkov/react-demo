import { UserFormFieldLogin } from './login/UserFormFieldLogin.jsx';
import { UserFormFieldSalutation } from './salutation/UserFormFieldSalutation.jsx';
import { UserFormFieldName } from './name/UserFormFieldName.jsx';
import { UserFormFieldBranch } from './branch/UserFormFieldBranch.jsx';
import { UserFormFieldCompany } from './company/UserFormFieldCompany.jsx';
import { UserFormFieldActive } from './active/UserFormFieldActive.jsx';
import './UserFormFields.css';

export function UserFormFields({ formUser, subordinates, formErrors, saveErrors, isFieldChangedDb, setFormUser })
{
  return (
    <div className="UserFormFields">
      <UserFormFieldLogin
        value={ formUser.login }
        formErrors={ formErrors.login }
        saveErrors={ saveErrors.login }
        isFieldChanged={ isFieldChangedDb.login }
        onChangeLogin={ onChangeLogin }
      />
      <UserFormFieldSalutation
        value={ formUser.salutation }
        salutations={ subordinates.salutations }
        formErrors={ formErrors.salutation }
        saveErrors={ saveErrors.salutation }
        isFieldChanged={ isFieldChangedDb.salutation }
        onChangeSalutation={ onChangeSalutation }
      />
      <UserFormFieldName
        value={ formUser.name }
        formErrors={ formErrors.name }
        saveErrors={ saveErrors.name }
        isFieldChanged={ isFieldChangedDb.name }
        onChangeName={ onChangeName }
      />
      <UserFormFieldBranch
        value={ formUser.branch }
        branches={ subordinates.branches }
        formErrors={ formErrors.branch }
        saveErrors={ saveErrors.branch }
        isFieldChanged={ isFieldChangedDb.branch }
        onChangeBranch={ onChangeBranch }
      />
      <UserFormFieldCompany
        value={ formUser.company }
        formErrors={ formErrors.company }
        saveErrors={ saveErrors.company }
        isFieldChanged={ isFieldChangedDb.company }
        onChangeCompany={ onChangeCompany }
      />
      <UserFormFieldActive
        value={ formUser.active }
        formErrors={ formErrors.active }
        saveErrors={ saveErrors.active }
        isFieldChanged={ isFieldChangedDb.active }
        onChangeActive={ onChangeActive }
      />
    </div>
  );

  function onChangeLogin( formLogin )
  {
    updateFormUser({ login: formLogin });
  }

  function onChangeSalutation( formSalutation )
  {
    updateFormUser({ salutation: formSalutation });
  }

  function onChangeName( formName )
  {
    updateFormUser({ name: formName });
  }

  function onChangeBranch( formBranch )
  {
    updateFormUser({ branch: formBranch });
  }

  function onChangeCompany( formCompany )
  {
    updateFormUser({ company: formCompany });
  }

  function onChangeActive( formActive )
  {
    updateFormUser({ active: formActive });
  }

  function updateFormUser( update )
  {
    setFormUser({
      ...formUser,
      ...update,
    });
  }
}
