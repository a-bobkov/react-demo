import * as http2 from 'node:http2';
import search from './search/search.js';
import * as responseError from './responseError.js';

export {
  create as create,
};

function create(initialUsers)
{
  const users = {};

  let nextId = 1;

  initialUsers.forEach( createUser );

  return {
    getUser: getUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    searchUsers: searchUsers,
  };

  function getUser(userId)
  {
    const user = users[userId];

    if (!user) {
      throw newErrorUserNotFound( userId );
    }

    return user;
  }

  function createUser( userData )
  {
    const userId = nextId++;

    users[userId] = {
      id: userId,
      ...userData,
    };

    return users[userId];
  }

  function updateUser( userId, userData )
  {
    const user = users[userId];

    if (!user) {
      throw newErrorUserNotFound( userId );
    }

    Object.assign(user, userData);

    return user;
  }

  function deleteUser(userId)
  {
    if (!users[userId]) {
      throw newErrorUserNotFound( userId );
    }

    delete users[userId];
  }

  function searchUsers(options)
  {
    const { count, items } = search(users, options);

    return {
      count,
      users: items,
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
