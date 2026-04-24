import { clsx } from 'clsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { UserFieldErrors } from './UserFieldErrors.jsx';
import './UserFormCompany.css';

export function UserFormCompany({ value, saveErrors, formErrors, isFieldChanged, onChangeCompany })
{
  const { lingo } = useLingo();

  return (
    <div className="UserFormCompany">
      <div className={ clsx('UserFormFieldName', isFieldChanged && 'isFieldChanged') }>
        { lingo({
          en: 'Company',
          de: 'Unternehmen',
        })}
      </div>
      <div className="UserFormFieldValue">
        <input
          placeholder={ lingo({
            en: 'company',
            de: 'unternehmen',
          })}
          value={ value }
          onChange={ onChange }
        />
        <UserFieldErrors
          formError={ formErrors }
          saveError={ saveErrors }
        />
      </div>
    </div>
  );

  function onChange( event )
  {
    const newValue = event.target.value

    onChangeCompany( newValue );
  }
}
