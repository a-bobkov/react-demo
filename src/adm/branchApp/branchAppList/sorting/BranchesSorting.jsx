import { BranchesSortingField } from './BranchesSortingField.jsx';
import { useLingo } from '../../../lingo/LingoProvider.jsx';
import './BranchesSorting.css';

export function BranchesSorting( { sorting = {}, onChangeSorting })
{
  const { id, name } = sorting;

  const { lingo } = useLingo();

  return (
    <div className="BranchesSorting">
      <BranchesSortingField
        name={ lingo({
          en: 'id',
          de: 'ID',
        })}
        fieldSorting={{ id }}
        onChangeSorting={ onChangeSorting }
      />
      <BranchesSortingField
        name={ lingo({
          en: 'name',
          de: 'Name',
        })}
        fieldSorting={{ name }}
        onChangeSorting={ onChangeSorting }
      />
    </div>
  );
}
