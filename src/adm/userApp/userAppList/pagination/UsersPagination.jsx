import './UsersPagination.css';

export function UsersPagination({ total, pagination, isBlocked, onChangePagination })
{
  console.log(`UsersPagination: "${ JSON.stringify( pagination )}"`);

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

    const last = Math.ceil( total / pagination.size );

    if (pagination.count < last) {
      pages.push( pagination.count + 1 );
    }

    if (pagination.count < last - 1) {
      pages.push( pagination.count + 2 );
    }

    return pages.map(page => <Page page={page} />);
  }

  function Page({ page })
  {
    return page === pagination.count
      ? <CurrentPage page={page}/>
      : <NonCurrentPage page={page}/>
  }

  function CurrentPage({ page })
  {
    return (
      <div className="UsersPaginationCurrentPage inactive">
        {page}
      </div>
    );
  }

  function NonCurrentPage({ page })
  {
    return (
      <div className="UsersPaginationNonCurrentPage" onClick={onClickPage}>
        {page}
      </div>
    );

    function onClickPage()
    {
      onChangePagination({
        ...pagination,
        count: page,
      });
    }
  }

  function UsersPaginationFirst()
  {
    if (pagination.count === 1) {
      return (
        <div className="UsersPaginationFirst inactive">
          &lt;&lt;
        </div>
      );
    }

    return (
      <div className="UsersPaginationFirst" onClick={onClickFirst}>
        &lt;&lt;
      </div>
    );
  }

  function onClickFirst()
  {
    onChangePagination({
      ...pagination,
      count: 1,
    });
  }

  function UsersPaginationPrev()
  {
    if (pagination.count === 1) {
      return (
        <div className="UsersPaginationPrev inactive">
          &lt;
        </div>
      );
    }

    return (
      <div className="UsersPaginationPrev" onClick={onClickPrev}>
        &lt;
      </div>
    );
  }

  function onClickPrev()
  {
    onChangePagination({
      ...pagination,
      count: pagination.count - 1,
    });
  }

  function UsersPaginationNext()
  {
    const last = Math.ceil( total / pagination.size );

    if (pagination.count >= last) {
      return (
        <div className="UsersPaginationNext inactive">
          &gt;
        </div>
      );
    }

    return (
      <div className="UsersPaginationNext" onClick={onClickNext}>
        &gt;
      </div>
    );
  }

  function onClickNext()
  {
    onChangePagination({
      ...pagination,
      count: pagination.count + 1,
    });
  }

  function UsersPaginationLast()
  {
    const last = Math.ceil( total / pagination.size );

    if (pagination.count >= last) {
      return (
        <div className="UsersPaginationLast inactive">
          &gt;&gt;
        </div>
      );
    }

    return (
      <div className="UsersPaginationLast" onClick={onClickLast}>
        &gt;&gt;
      </div>
    );

    function onClickLast()
    {
      onChangePagination({
        ...pagination,
        count: last,
      });
    }
  }
}
