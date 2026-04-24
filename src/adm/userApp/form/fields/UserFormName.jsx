import { clsx } from 'clsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { UserFieldErrors } from './UserFieldErrors.jsx';
import './UserFormName.css';

export function UserFormName({ value, saveErrors, formErrors, isFieldChanged, onChangeName })
{
  const { lingo } = useLingo();

  return (
    <div className="UserFormName">
      <div className={ clsx('UserFormFieldName', isFieldChanged && 'isFieldChanged') }>
        { lingo({
          en: 'Name',
          de: 'Name',
        })}
      </div>
      <div className="UserFormFieldValue">
        <input
          placeholder={ lingo({
            en: 'name',
            de: 'Name',
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

    onChangeName( newValue );
  }
}
