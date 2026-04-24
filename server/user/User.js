import * as http2 from 'node:http2';
import * as responseError from '../responseError.js';
import { validateUser } from './validate/validateUser.js';
import { query } from '../query/query.js';

export {
  create as create,
};

function create( initialUsers )
{
  const users = {};

  let nextId = 1;

  initialUsers.forEach(( initialUser ) =>
  {
    const { error } = createUser( initialUser );

    if ( error ) {
      throw new Error(`Error creating initial user ${ JSON.stringify( initialUser )}`, { cause: error });
    }
  });

  return {
    getUser: getUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    queryUser: queryUser,
  };

  function getUser(userId)
  {
    const user = users[userId];

    if (!user) {
      throw newErrorUserNotFound( userId );
    }

    return {
      user,
    };
  }

  function createUser( userData )
  {
    const [ user, error ] = validateUser( userData, users );

    if (error) {
      return {
        error,
      };
    }

    const newUser = {
      id: nextId++,
      ...user,
    }

    users[newUser.id] = newUser;

    return {
      user: newUser,
    };
  }

  function updateUser( userId, userData )
  {
    const storedUser = users[userId];

    if (!storedUser) {
      throw newErrorUserNotFound( userId );
    }

    const [ user, error ] = validateUser( userData, users );

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

  function deleteUser(userId)
  {
    if (!users[userId]) {
      throw newErrorUserNotFound( userId );
    }

    delete users[userId];
  }

  function queryUser(options)
  {
    const { count, list } = query(users, options);

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
