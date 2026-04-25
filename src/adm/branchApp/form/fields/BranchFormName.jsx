import { clsx } from 'clsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { BranchFieldErrors } from './BranchFieldErrors.jsx';
import './BranchFormName.css';

export function BranchFormName( { value, saveErrors, formErrors, isFieldChanged, onChangeName })
{
  const { lingo } = useLingo();

  return (
    <div className="BranchFormName">
      <div className={ clsx('BranchFormFieldName', isFieldChanged && 'isFieldChanged') }>
        { lingo({
          en: 'Name',
          de: 'Name',
        })}
      </div>
      <div className="BranchFormFieldValue">
        <input
          placeholder={ lingo({
            en: 'name',
            de: 'Name',
          })}
          value={ value }
          onChange={ onChange }
        />
        <BranchFieldErrors
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
