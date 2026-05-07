import { useLingo } from '../../../lingo/LingoProvider.jsx';

export function validateUserBranch( userBranch )
{
  const { lingo } = useLingo();

  if ( !isUserBranchSelected( userBranch )) {
    return lingo({
      en: 'User branch should be selected',
      de: 'Niederlassung muss ausgewählt werden',
    });
  }
}

function isUserBranchSelected( userBranch )
{
  return userBranch !== undefined;
}
