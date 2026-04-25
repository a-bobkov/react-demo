import { useLingo } from '../../../lingo/LingoProvider.jsx';

export function validateBranchName( branchName )
{
  const { lingo } = useLingo();

  if (!isBranchNameFilled( branchName )) {
    return lingo({
      en: 'Branch name should not be empty',
      de: 'Der Name der Niederlassung darf nicht leer sein',
    });
  }
}

function isBranchNameFilled( branchName )
{
  return branchName.trim() !== '';
}
