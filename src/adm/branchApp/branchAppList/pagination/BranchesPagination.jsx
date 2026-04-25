import './BranchesPagination.css';

export function BranchesPagination( { total, pagination, isBlocked, onChangePagination })
{
  console.log(`BranchesPagination: "${ JSON.stringify( pagination )}"`);

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
      <div className="BranchesPaginationCurrentPage inactive">
        {page}
      </div>
    );
  }

  function NonCurrentPage({ page })
  {
    return (
      <div className="BranchesPaginationNonCurrentPage" onClick={onClickPage}>
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

  function BranchesPaginationFirst()
  {
    if (pagination.count === 1) {
      return (
        <div className="BranchesPaginationFirst inactive">
          &lt;&lt;
        </div>
      );
    }

    return (
      <div className="BranchesPaginationFirst" onClick={onClickFirst}>
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

  function BranchesPaginationPrev()
  {
    if (pagination.count === 1) {
      return (
        <div className="BranchesPaginationPrev inactive">
          &lt;
        </div>
      );
    }

    return (
      <div className="BranchesPaginationPrev" onClick={onClickPrev}>
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

  function BranchesPaginationNext()
  {
    const last = Math.ceil( total / pagination.size );

    if (pagination.count >= last) {
      return (
        <div className="BranchesPaginationNext inactive">
          &gt;
        </div>
      );
    }

    return (
      <div className="BranchesPaginationNext" onClick={onClickNext}>
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

  function BranchesPaginationLast()
  {
    const last = Math.ceil( total / pagination.size );

    if (pagination.count >= last) {
      return (
        <div className="BranchesPaginationLast inactive">
          &gt;&gt;
        </div>
      );
    }

    return (
      <div className="BranchesPaginationLast" onClick={onClickLast}>
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
