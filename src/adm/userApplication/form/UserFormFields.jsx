import { UserFormLogin } from './fields/UserFormLogin.jsx';
import { UserFormName } from './fields/UserFormName.jsx';
import { UserFormCompany } from './fields/UserFormCompany.jsx';
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
    </div>
  );

  function onChangeLogin( formLogin )
  {
    updateFormUser({ login: formLogin });
  }

  function onChangeName( formName )
  {
    updateFormUser({ name: formName });
  }

  function onChangeCompany( formCompany )
  {
    updateFormUser({ company: formCompany });
  }

  function updateFormUser( update )
  {
    setFormUser({
      ...formUser,
      ...update,
    });
  }
}
