import * as http2 from 'node:http2';
import * as responseError from '../responseError.js';
import { validateBranch } from './validate/validateBranch.js';
import { query } from '../query/query.js';

export {
  create as create,
};

function create( initialBranches )
{
  const branches = {};

  let nextId = 1;

  initialBranches.forEach(( initialBranch ) =>
  {
    const { error } = createBranch( initialBranch );

    if ( error ) {
      throw new Error(`Error creating initial branch ${ JSON.stringify( initialBranch )}`, { cause: error });
    }
  });

  return {
    getBranch: getBranch,
    createBranch: createBranch,
    updateBranch: updateBranch,
    deleteBranch: deleteBranch,
    queryBranch: queryBranch,
  };

  function getBranch( branchId )
  {
    const branch = branches[ branchId ];

    if (!branch) {
      throw newErrorBranchNotFound( branchId );
    }

    return {
      branch,
    };
  }

  function createBranch( branchData )
  {
    const [ branch, error ] = validateBranch( branchData, branches );

    if (error) {
      return {
        error,
      };
    }

    const newBranch = {
      id: nextId++,
      ...branch,
    }

    branches[ newBranch.id ] = newBranch;

    return {
      branch: newBranch,
    };
  }

  function updateBranch( branchId, branchData )
  {
    const storedBranch = branches[ branchId ];

    if ( !storedBranch ) {
      throw newErrorBranchNotFound( branchId );
    }

    const [ branch, error ] = validateBranch( branchData, branches );

    if ( error ) {
      return {
        error,
      };
    }

    Object.assign( storedBranch, branch );

    return {
      branch: storedBranch,
    };
  }

  function deleteBranch( branch )
  {
    if (!branches[ branch ]) {
      throw newErrorBranchNotFound( branch );
    }

    delete branches[ branch ];
  }

  function queryBranch( options )
  {
    return query( branches, options );
  }
}

function newErrorBranchNotFound( branchId )
{
  return responseError.create(
    `Branch not found by id: ${ branchId }`,
    http2.constants.HTTP_STATUS_NOT_FOUND,
  );
}
