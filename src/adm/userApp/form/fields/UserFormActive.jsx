import { clsx } from 'clsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { UserFieldErrors } from './UserFieldErrors.jsx';
import './UserFormCompany.css';

export function UserFormActive({ value, saveErrors, formErrors, isFieldChanged, onChangeActive })
{
  const { lingo } = useLingo();

  return (
    <div className="UserFormActive">
      <div className={ clsx('UserFormFieldName', isFieldChanged && 'isFieldChanged') }>
        { lingo({
          en: 'Active',
          de: 'Tätig',
        })}
      </div>
      <div className="UserFormFieldValue">
        <input
          type="checkbox"
          checked={ value }
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
    const newValue = event.target.checked;

    onChangeActive( newValue );
  }
}
