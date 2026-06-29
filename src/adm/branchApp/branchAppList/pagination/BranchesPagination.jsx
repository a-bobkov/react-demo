import './BranchesPagination.css';

export function BranchesPagination({ total, pagination, isBlocked, onChangePagination })
{
  const last = Math.ceil( total / pagination.size );

  return (
    <branches-pagination inert={ isBlocked }>
      <BranchesPaginationFirst />
      <BranchesPaginationPrev />
      <BranchesPaginationPages />
      <BranchesPaginationNext />
      <BranchesPaginationLast />
    </branches-pagination>
  );

  function BranchesPaginationPages()
  {
    const pages = [];

    if (pagination.count > 2) {
      pages.push( pagination.count - 2 );
    }

    if (pagination.count > 1) {
      pages.push( pagination.count - 1 );
    }

    pages.push( pagination.count );

    if (pagination.count < last) {
      pages.push( pagination.count + 1 );
    }

    if (pagination.count < last - 1) {
      pages.push( pagination.count + 2 );
    }

    return pages.map(page =>
      <Page page={ page } />
    );
  }

  function Page({ page })
  {
    return (
      <BranchPaginationButton
        label={ page }
        disabled={ page === pagination.count }
        onClick={ onClickPage }
      />
    );

    function onClickPage()
    {
      changeCount( page );
    }
  }

  function BranchesPaginationFirst()
  {
    return (
      <BranchPaginationButton
        label="<<"
        disabled={ pagination.count === 1 }
        onClick={ onClickFirst }
      />
    );
  }

  function onClickFirst()
  {
    changeCount( 1 );
  }

  function BranchesPaginationPrev()
  {
    return (
      <BranchPaginationButton
        label="<"
        disabled={ pagination.count === 1 }
        onClick={ onClickPrev }
      />
    );
  }

  function onClickPrev()
  {
    changeCount( pagination.count - 1 );
  }

  function BranchesPaginationNext()
  {
    return (
      <BranchPaginationButton
        label=">"
        disabled={ pagination.count >= last }
        onClick={ onClickNext }
      />
    );
  }

  function onClickNext()
  {
    changeCount( pagination.count + 1 );
  }

  function BranchesPaginationLast()
  {
    return (
      <BranchPaginationButton
        label=">>"
        disabled={ pagination.count >= last }
        onClick={ onClickLast }
      />
    );

    function onClickLast()
    {
      changeCount( last );
    }
  }

  function changeCount( newPage )
  {
    onChangePagination({
      ...pagination,
      count: newPage,
    });
  }
}

function BranchPaginationButton({ label, disabled, onClick })
{
  return (
    <button
      type="button"
      className="BranchPaginationButton"
      disabled={ disabled }
      onClick={ onClick }
    >
      { label }
    </button>
  );
}
