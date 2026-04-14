import { clsx } from 'clsx';
import { FormFieldError } from './FormFieldError.jsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
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
        <div className="UserFormErrors">
          <FormFieldError error={ formErrors } />
        </div>
        <div className="UserSaveErrors">
          <FormFieldError error={ saveErrors } />
        </div>
      </div>
    </div>
  );

  function onChange( event )
  {
    const newValue = event.target.value

    onChangeCompany( newValue );
  }
}
