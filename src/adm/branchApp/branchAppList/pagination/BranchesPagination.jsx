import './BranchesPagination.css';

export function BranchesPagination({ total, pagination, isBlocked, onChangePagination })
{
  const last = Math.ceil( total / pagination.size );

  return (
    <div className="BranchesPagination" inert={ isBlocked }>
      <BranchesPaginationFirst />
      <BranchesPaginationPrev />
      <BranchesPaginationPages />
      <BranchesPaginationNext />
      <BranchesPaginationLast />
    </div>
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
      <button
        type="button"
        disabled={ page === pagination.count }
        onClick={ onClickPage }
      >
        { page }
      </button>
    );

    function onClickPage()
    {
      changeCount( page );
    }
  }

  function BranchesPaginationFirst()
  {
    return (
      <button
        type="button"
        disabled={ pagination.count === 1 }
        onClick={ onClickFirst }
      >
        &lt;&lt;
      </button>
    );
  }

  function onClickFirst()
  {
    changeCount( 1 );
  }

  function BranchesPaginationPrev()
  {
    return (
      <button
        type="button"
        disabled={ pagination.count === 1 }
        onClick={ onClickPrev }
      >
        &lt;
      </button>
    );
  }

  function onClickPrev()
  {
    changeCount( pagination.count - 1 );
  }

  function BranchesPaginationNext()
  {
    return (
      <button
        type="button"
        disabled={ pagination.count >= last }
        onClick={ onClickNext }
      >
        &gt;
      </button>
    );
  }

  function onClickNext()
  {
    changeCount( pagination.count + 1 );
  }

  function BranchesPaginationLast()
  {
    return (
      <button
        type="button"
        disabled={ pagination.count >= last }
        onClick={ onClickLast }
      >
        &gt;&gt;
      </button>
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
