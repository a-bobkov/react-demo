const sortingKey = 'sort';

export function saveSorting( searchParams, sorting = {})
{
  for (const [field, order] of Object.entries(sorting))
  {
    if (order)
    {
      searchParams.set( sortingKey, `${field}.${order}`);
    }
  }
}

export function loadSorting( searchParams )
{
  const sorting = {};

  const sortingValue = searchParams.get( sortingKey );

  if (sortingValue != null)
  {
    const [field, order] = sortingValue.split('.');

    sorting[field] = order;
  }

  return sorting;
}
