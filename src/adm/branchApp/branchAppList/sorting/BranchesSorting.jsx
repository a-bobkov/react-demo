import { BranchesSortingField } from './BranchesSortingField.jsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import './BranchesSorting.css';

export function BranchesSorting({ sorting = {}, onChangeSorting })
{
  const { id, name, created } = sorting;

  const { lingo } = useLingo();

  return (
    <branches-sorting>
      <BranchesSortingField
        className="BranchSortingId"
        name={ lingo({
          en: 'id',
          de: 'ID',
        })}
        fieldSorting={{ id }}
        onChangeSorting={ onChangeSorting }
      />
      <BranchesSortingField
        className="BranchSortingName"
        name={ lingo({
          en: 'name',
          de: 'Name',
        })}
        fieldSorting={{ name }}
        onChangeSorting={ onChangeSorting }
      />
      <BranchesSortingField
        className="BranchSortingCreated"
        name={ lingo({
          en: 'created',
          de: 'erstellt',
        })}
        fieldSorting={{ created }}
        onChangeSorting={ onChangeSorting }
      />
    </branches-sorting>
  );
}
