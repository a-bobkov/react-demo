const paginationKey = 'page';

export function savePagination( searchParams, pagination )
{
  searchParams.set(
    paginationKey,
    `${ pagination.size }.${ pagination.count }`
  );
}

export function loadPagination( searchParams )
{
  const pagination = {};

  const paginationValue = searchParams.get(paginationKey);

  if (paginationValue)
  {
    const [sizeStr, countStr] = paginationValue.split('.');

    const size = parseInt(sizeStr);

    if (size) {
      pagination.size = size;
    }

    const count = parseInt(countStr);

    if (count) {
      pagination.count = count;
    }
  }

  return pagination;
}
