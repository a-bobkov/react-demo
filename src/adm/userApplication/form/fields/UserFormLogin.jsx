import { clsx } from 'clsx';
import { FormFieldError } from './FormFieldError.jsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import './UserFormLogin.css';

export function UserFormLogin({ value, saveErrors, formErrors, isFieldChanged, onChangeLogin })
{
  const { lingo } = useLingo();

  return (
    <div className="UserFormLogin">
      <div className={ clsx('UserFormFieldName', isFieldChanged && 'isFieldChanged') }>
        { lingo({
          en: 'Login',
          de: 'Login',
        })}
      </div>
      <div className="UserFormFieldValue">
        <input
          placeholder={ lingo({
            en: 'email address',
            de: 'E-Mail-Adresse',
          })}
          value={ value }
          onChange={ onChange }
        />
        <div className="UserFormErrors">
          <FormFieldError error={ formErrors } />
        </div>
        <div className="UserSaveErrors">
          <FormFieldError error={ saveErrors } />
        </div>
      </div>
    </div>
  );

  function onChange(event)
  {
    const newValue = event.target.value

    onChangeLogin( newValue );
  }
}
