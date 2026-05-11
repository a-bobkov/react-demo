import { validateSalutation } from './validate/validateSalutation.js';
import { query } from '../query/query.js';

export {
  create as create,
};

function create( initialSalutations )
{
  const storedSalutations = {};

  let nextId = 1;

  initialSalutations.forEach(( initialSalutation ) =>
  {
    const { error } = createSalutation( initialSalutation );

    if ( error ) {
      throw new Error(`Error creating initial salutation ${ JSON.stringify( initialSalutation )}`, { cause: error });
    }
  });

  return {
    getStored: getStored,
    querySalutation: querySalutation,
  };

  function getStored()
  {
    return storedSalutations;
  }

  function createSalutation( salutationData )
  {
    const [ salutation, error ] = validateSalutation( salutationData, undefined, storedSalutations );

    if (error) {
      return {
        error,
      };
    }

    const newSalutation = {
      id: nextId++,
      ...salutation,
    }

    storedSalutations[ newSalutation.id ] = newSalutation;

    return {
      salutation: newSalutation,
    };
  }

  function querySalutation()
  {
    return query( storedSalutations );
  }
}
