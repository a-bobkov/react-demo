import { useLingo } from '../../../../lingo/LingoProvider.jsx';
import { UserFormField } from '../UserFormField.jsx';
import { SingleSelect } from '../../../../components/SingleSelect/SingleSelect.jsx';
import './UserFormFieldBranch.css';

export function UserFormFieldBranch( { value, branches, saveErrors, formErrors, isFieldChanged, onChangeBranch })
{
  const { lingo } = useLingo();

  return (
    <UserFormField
      label={ lingo({
        en: 'Branch',
        de: 'Niederlassung',
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
        className='UserFormBranchSelect'
        empty={ lingo({
          en: 'Select one',
          de: 'Wählen eine aus',
        })}
        options={ branches2options( branches )}
        selectedId={ value2option( value )}
        onChangeSelectedId={ onChangeSelectedId }
      />
    );
  }

  function onChangeSelectedId( newSelectedId )
  {
    const newBranch = option2value( newSelectedId );

    onChangeBranch( newBranch );
  }
}

function branches2options( branches )
{
  return new Map( branches.map( branch =>
    [ branch.id, `${ branch.id }: ${ branch.name }`]
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
