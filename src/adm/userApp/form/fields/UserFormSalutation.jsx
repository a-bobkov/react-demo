import { clsx } from 'clsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { SingleSelect } from '../../../SingleSelect/SingleSelect.jsx';
import { UserFieldErrors } from './UserFieldErrors.jsx';
import './UserFormSalutation.css';

export function UserFormSalutation({ value, salutations, saveErrors, formErrors, isFieldChanged, onChangeSalutation })
{
  const { lingo } = useLingo();

  return (
    <div className="UserFormSalutation">
      <div className={ clsx('UserFormFieldName', isFieldChanged && 'isFieldChanged') }>
        { lingo({
          en: 'Salutation',
          de: 'Anrede',
        })}
      </div>
      <div className="UserFormFieldValue">
        <SingleSelect className='UserFormSalutationSelect'
          empty={ lingo({
            en: 'Hello',
            de: 'Hallo',
          })}
          options={ salutations2options( salutations, lingo )}
          selectedId={ value2option( value )}
          onChangeSelectedId={ onChangeSelectedId }
        />
        <UserFieldErrors
          formError={ formErrors }
          saveError={ saveErrors }
        />
      </div>
    </div>
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
