import { useLingo } from '../../../../lingo/LingoProvider.jsx';
import { UserFormField } from '../UserFormField.jsx';
import './UserFormFieldActive.css';

export function UserFormFieldActive({ value, saveErrors, formErrors, isFieldChanged, onChangeActive })
{
  const { lingo } = useLingo();

  return (
    <UserFormField
      label={ lingo({
        en: 'Active',
        de: 'Tätig',
      }) }
      renderControl={ renderControl }
      saveErrors={ saveErrors }
      formErrors={ formErrors }
      isFieldChanged={ isFieldChanged }
    />
  );

  function renderControl()
  {
    return (
      <InputCheckbox
        value={ value }
        onChange={ onChange }
      />
    );
  }

  function onChange( event )
  {
    const newValue = event.target.checked;

    onChangeActive( newValue );
  }
}

function InputCheckbox({ value, onChange })
{
  return(
    <input
      className="InputCheckbox"
      type="checkbox"
      checked={ value }
      onChange={ onChange }
    />
  );
}
