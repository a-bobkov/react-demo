import { useLingo } from '../../../../lingo/LingoProvider.jsx';
import { UserFormField } from '../UserFormField.jsx';
import { SingleSelect } from '../../../../components/SingleSelect/SingleSelect.jsx';
import './UserFormFieldSalutation.css';

export function UserFormFieldSalutation({ value, salutations, saveErrors, formErrors, isFieldChanged, onChangeSalutation })
{
  const { lingo } = useLingo();

  return (
    <UserFormField
      label={ lingo({
        en: 'Salutation',
        de: 'Anrede',
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
  }

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
