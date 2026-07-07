import { useLingo } from '../../../../lingo/LingoProvider.jsx';
import { UserFormField } from '../UserFormField.jsx';
import { SingleSelect } from '../../../../components/SingleSelect/SingleSelect.jsx';
import './UserFormFieldSalutation.css';

export function UserFormFieldSalutation({ value, salutations, formErrors, saveErrors, isFieldChanged, onChangeSalutation })
{
  const { lingo } = useLingo();

  return (
    <UserFormField
      label={ lingo({
        en: 'Salutation',
        de: 'Anrede',
      }) }
      control={ <UserSalutationControl
        value={ value }
        salutations={ salutations }
        onChangeSalutation={ onChangeSalutation }
      /> }
      formErrors={ formErrors }
      saveErrors={ saveErrors }
      isFieldChanged={ isFieldChanged }
    />
  );
}

function UserSalutationControl({ value, salutations, onChangeSalutation })
{
  const { lingo } = useLingo();

  return (
    <SingleSelect
      className='UserFormSalutationSelect'
      empty={ lingo({
        en: 'Hello',
        de: 'Hallo',
      })}
      options={ salutations2options( salutations, lingo )}
      selectedId={ value2option( value )}
      onChangeSelectedId={ onChangeSelectedId }
    />
  );

  function onChangeSelectedId( newSelectedId )
  {
    const newFormValue = option2value( newSelectedId );

    onChangeSalutation( newFormValue );
  }
}

function salutations2options( salutations, lingo )
{
  return new Map( salutations.map( salutation =>
    [ salutation.id, lingo( salutation.name ) ]
  ));
}

function value2option( value )
{
  return value && value.id;
}

function option2value( selectedId )
{
  return selectedId && { id: selectedId };
}
