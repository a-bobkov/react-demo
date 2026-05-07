import * as http2 from 'node:http2';
import * as responseError from '../responseError.js';
import { validateBranch } from './validate/validateBranch.js';
import { query } from '../query/query.js';
import { users } from '../user/dispatchUser.js';

export {
  create as create,
};

function create( initialBranches )
{
  const storedBranches = {};

  let nextId = 1;

  initialBranches.forEach(( initialBranch ) =>
  {
    const { error } = createBranch( initialBranch );

    if ( error ) {
      throw new Error(`Error creating initial branch ${ JSON.stringify( initialBranch )}`, { cause: error });
    }
  });

  return {
    getStored: getStored,
    getBranch: getBranch,
    createBranch: createBranch,
    updateBranch: updateBranch,
    deleteBranch: deleteBranch,
    queryBranch: queryBranch,
  };

  function getStored()
  {
    return storedBranches;
  }

  function getBranch( branchId )
  {
    const branch = storedBranches[ branchId ];

    if (!branch) {
      throw newErrorBranchNotFound( branchId );
    }

    return {
      branch,
    };
  }

  function createBranch( branchData )
  {
    const [ branch, error ] = validateBranch( branchData, undefined, storedBranches );

    if (error) {
      return {
        error,
      };
    }

    const newBranch = {
      id: nextId++,
      ...branch,
    }

    storedBranches[ newBranch.id ] = newBranch;

    return {
      branch: newBranch,
    };
  }

  function updateBranch( branchId, branchData )
  {
    const storedBranch = storedBranches[ branchId ];

    if ( !storedBranch ) {
      throw newErrorBranchNotFound( branchId );
    }

    const [ branch, error ] = validateBranch( branchData, branchId, storedBranches );

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

  function deleteBranch( branchId )
  {
    if ( !storedBranches[ branchId ]) {
      throw newErrorBranchNotFound( branchId );
    }

    if ( isBranchReferencedByUser( branchId ) ) {
      throw newErrorBranchReferencedByUser();
    }

    delete storedBranches[ branchId ];
  }

  function queryBranch( options )
  {
    return query( storedBranches, options );
  }
}

function isBranchReferencedByUser( branchId )
{
  return Object.values( users.getStored() ).some( storedUser =>
    storedUser.branch.id === branchId
  )
}

function newErrorBranchNotFound( branchId )
{
  return responseError.create(
    `Branch not found by id: ${ branchId }`,
    http2.constants.HTTP_STATUS_NOT_FOUND,
  );
}

function newErrorBranchReferencedByUser()
{
  return responseError.create(
    `Branch is referenced by user`,
    http2.constants.HTTP_STATUS_CONFLICT,
  );
}
