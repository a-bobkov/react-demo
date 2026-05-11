import * as http2 from 'node:http2';
import * as responseError from '../responseError.js';
import { validateUser } from './validate/validateUser.js';
import { query } from '../query/query.js';
import { branches } from '../branch/dispatchBranch.js';
import { salutations } from '../salutation/dispatchSalutation.js';

export {
  create as create,
};

function create( initialUsers )
{
  const storedUsers = {};

  let nextId = 1;

  initialUsers.forEach(( initialUser ) =>
  {
    const { error } = createUser( initialUser );

    if ( error ) {
      throw new Error(`Error creating initial user ${ JSON.stringify( initialUser )}`, { cause: error });
    }
  });

  return {
    getStored: getStored,
    getUser: getUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    queryUser: queryUser,
  };

  function getStored()
  {
    return storedUsers;
  }

  function getUser( userId )
  {
    const user = storedUsers[ userId ];

    if (!user) {
      throw newErrorUserNotFound( userId );
    }

    return {
      user,
    };
  }

  function createUser( userData )
  {
    const [ user, error ] = validateUser(
      userData,
      undefined,
      storedUsers,
      branches.getStored(),
      salutations.getStored(),
    );

    if ( error ) {
      return {
        error,
      };
    }

    const newUser = {
      id: nextId++,
      ...user,
    }

    storedUsers[ newUser.id ] = newUser;

    return {
      user: newUser,
    };
  }

  function updateUser( userId, userData )
  {
    const storedUser = storedUsers[ userId ];

    if (!storedUser) {
      throw newErrorUserNotFound( userId );
    }

    const [ user, error ] = validateUser(
      userData,
      userId,
      storedUsers,
      branches.getStored(),
      salutations.getStored(),
    );

    if (error) {
      return {
        error,
      };
    }

    Object.assign( storedUser, user );

    return {
      user: storedUser,
    };
  }

  function deleteUser( userId )
  {
    if ( !storedUsers[ userId ]) {
      throw newErrorUserNotFound( userId );
    }

    delete storedUsers[ userId ];
  }

  function queryUser( options )
  {
    const { count, list } = query( storedUsers, options );

    return {
      count,
      list,
    };
  }
}

function newErrorUserNotFound( userId )
{
  return responseError.create(
    `User not found by id: ${ userId }`,
    http2.constants.HTTP_STATUS_NOT_FOUND,
  );
}
