import { useLingo } from '../../../lingo/LingoProvider.jsx';

export function validateBranchName( branchName )
{
  const { lingo } = useLingo();

  if ( !isBranchNameFilledString( branchName ))
  {
    return lingo({
      en: 'Branch name should be non-empty string',
      de: 'Der Name der Niederlassung muss nicht-leerer String sein',
    });
  }
}

function isBranchNameFilledString( branchName )
{
  return branchName !== undefined
    && branchName.constructor === String
    && branchName.trim() !== '';
}
