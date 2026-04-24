import './UsersSortingField.css';

export function UsersSortingField({ name, fieldSorting, onChangeSorting })
{
  const [[sortingKey, sortingValue]] = Object.entries( fieldSorting );

  return (
    <div className="UsersSortingField"
         onClick={onClickSorting}
    >
      <span>
        { name }
      </span>
      <span>
        {getSortingChar(sortingValue)}
      </span>
    </div>
  );

  function onClickSorting()
  {
    onChangeSorting({
      [sortingKey]: getNextSortingValue( sortingValue )
    });
  }
}

const ASC = 'asc';
const DESC = 'desc';

function getNextSortingValue( sortingValue )
{
  switch (sortingValue) {
    case undefined:
      return ASC;
    case ASC:
      return DESC;
  }
}

function getSortingChar(sortingValue)
{
  switch (sortingValue) {
    case ASC:
      return '↑';
    case DESC:
      return '↓';
  }

  return '';
}