import { clsx } from 'clsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { SingleSelect } from '../../../components/SingleSelect/SingleSelect.jsx';
import { UserFieldErrors } from './UserFieldErrors.jsx';
import './UserFormBranch.css';

export function UserFormBranch({ value, branches, saveErrors, formErrors, isFieldChanged, onChangeBranch })
{
  const { lingo } = useLingo();

  return (
    <div className="UserFormBranch">
      <div className={ clsx('UserFormFieldName', isFieldChanged && 'isFieldChanged') }>
        { lingo({
          en: 'Branch',
          de: 'Niederlassung',
        })}
      </div>
      <div className="UserFormFieldValue">
        <SingleSelect className='UserFormBranchSelect'
          empty={ lingo({
            en: 'Select one',
            de: 'Wählen eine aus',
          })}
          options={ branches2options( branches )}
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
