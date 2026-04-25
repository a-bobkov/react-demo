import { useRunOnce } from '../../useRunOnce.js';

export function useBranchLocation( prefix )
{
  const branchLocationApi = useRunOnce( createBranchLocationApi, { prefix } );

  return { branchLocationApi };
}

function createBranchLocationApi({ prefix })
{
  return {
    isBranchRootPath: isBranchRootPath,

    isBranchListPath: isBranchListPath,
    setBranchListPath: setBranchListPath,
    goBranchList: goBranchList,

    getBranchCreatePath: getBranchCreatePath,
    isBranchCreatePath: isBranchCreatePath,

    getBranchGetPath: getBranchGetPath,
    getBranchGetId: getBranchGetId,
    isBranchGetPath: isBranchGetPath,
    setBranchGetPath: setBranchGetPath,

    goPath: goPath,
  };

  function isBranchRootPath()
  {
    return window.location.pathname === prefix;
  }

  function getBranchListPath()
  {
    return `${ prefix }/list`;
  }

  function isBranchListPath()
  {
    return window.location.pathname === getBranchListPath();
  }

  function setBranchListPath()
  {
    window.history.replaceState(null, null, getBranchListPath());
  }

  function goBranchList()
  {
    goPath( getBranchListPath() );
  }

  function getBranchCreatePath()
  {
    return `${ prefix }/new`;
  }

  function isBranchCreatePath()
  {
    return window.location.pathname === getBranchCreatePath();
  }

  function getBranchGetPath( branchId )
  {
    return `${ prefix }/edit/${ branchId }`;
  }

  function getBranchGetId()
  {
    const pathname = window.location.pathname;

    const branchEditRegexp = new RegExp(`^${ getBranchGetPath('(\\d+)') }$`);

    const [, branchId] = pathname.match( branchEditRegexp ) ?? [];

    return branchId && parseInt( branchId );
  }

  function isBranchGetPath()
  {
    return getBranchGetId() !== undefined;
  }

  function setBranchGetPath( branchId )
  {
    window.history.replaceState(null, null, getBranchGetPath( branchId ));
  }
}

function goPath( path )
{
  window.history.pushState(null, null, path );

  window.dispatchEvent( new Event('popstate'));
}
