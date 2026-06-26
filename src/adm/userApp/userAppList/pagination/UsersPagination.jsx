import './UsersPagination.css';

export function UsersPagination({ total, pagination, isBlocked, onChangePagination })
{
  const last = Math.ceil( total / pagination.size );

  return (
    <div className="UsersPagination" inert={ isBlocked }>
      <UsersPaginationFirst />
      <UsersPaginationPrev />
      <UsersPaginationPages />
      <UsersPaginationNext />
      <UsersPaginationLast />
    </div>
  );

  function UsersPaginationPages()
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
      <UsersPaginationButton
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

  function UsersPaginationFirst()
  {
    return (
      <UsersPaginationButton
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

  function UsersPaginationPrev()
  {
    return (
      <UsersPaginationButton
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

  function UsersPaginationNext()
  {
    return (
      <UsersPaginationButton
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

  function UsersPaginationLast()
  {
    return (
      <UsersPaginationButton
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

function UsersPaginationButton({ label, disabled, onClick })
{
  return (
    <button
      type="button"
      className="UsersPaginationButton"
      disabled={ disabled }
      onClick={ onClick }
    >
      { label }
    </button>
  );
}
