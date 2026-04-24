import { UserFormLogin } from './fields/UserFormLogin.jsx';
import { UserFormSalutation } from './fields/UserFormSalutation.jsx';
import { UserFormName } from './fields/UserFormName.jsx';
import { UserFormCompany } from './fields/UserFormCompany.jsx';
import { UserFormActive } from './fields/UserFormActive.jsx';
import './UserFormFields.css';

export function UserFormFields({ formUser, formErrors, saveErrors, isFieldChangedDb, setFormUser })
{
  return (
    <div className="UserFormFields">
      <UserFormLogin
        value={ formUser.login }
        formErrors={ formErrors.login }
        saveErrors={ saveErrors.login }
        isFieldChanged={ isFieldChangedDb.login }
        onChangeLogin={ onChangeLogin }
      />
      <UserFormSalutation
        value={ formUser.salutation }
        formErrors={ formErrors.salutation }
        saveErrors={ saveErrors.salutation }
        isFieldChanged={ isFieldChangedDb.salutation }
        onChangeSalutation={ onChangeSalutation }
      />
      <UserFormName
        value={ formUser.name }
        formErrors={ formErrors.name }
        saveErrors={ saveErrors.name }
        isFieldChanged={ isFieldChangedDb.name }
        onChangeName={ onChangeName }
      />
      <UserFormCompany
        value={ formUser.company }
        formErrors={ formErrors.company }
        saveErrors={ saveErrors.company }
        isFieldChanged={ isFieldChangedDb.company }
        onChangeCompany={ onChangeCompany }
      />
      <UserFormActive
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
