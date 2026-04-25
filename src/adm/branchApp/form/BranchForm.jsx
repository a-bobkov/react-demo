import { useState } from 'react';
import { clsx } from 'clsx';
import { validateBranch } from './validate/validateBranch.js';
import { BranchFormFields } from './BranchFormFields.jsx';
import { BranchFormActions } from './actions/BranchFormActions.jsx';
import { FetchCommonError } from '../FetchCommonError.jsx';
import { useLingo } from '../../lingo/LingoProvider.jsx';
import './BranchForm.css';

export function BranchForm( { branchOptions: { dbBranch, submitBranch, submitErrors = {}, fetchCommonError }, onClickSaveBranch })
{
  const [ hasSpinner, setHasSpinner ] = useState( false );

  const [ formBranch, setFormBranch ] = useState( submitBranch );
  const formErrors = validateBranch( formBranch );

  const isFieldChangedDb = compareBranches( formBranch, dbBranch );
  const isFormChangedDb = hasChangedField( isFieldChangedDb );

  const isFieldChangedSubmit = compareBranches( formBranch, submitBranch );
  const saveErrors = getActiveSubmitErrors( submitErrors, isFieldChangedSubmit );

  const isFormInvalid = Object.keys( saveErrors ).length || Object.keys( formErrors ).length;

  return (
    <div className="BranchForm" inert={ hasSpinner }>
      <BranchFormTitle
        branchId={ dbBranch.id }
        isFormChanged={ isFormChangedDb }
      />
      <FetchCommonError
        error={ fetchCommonError }
      />
      <BranchFormFields
        formBranch={ formBranch }
        formErrors={ formErrors }
        saveErrors={ saveErrors }
        isFieldChangedDb={ isFieldChangedDb }
        setFormBranch={ setFormBranch }
      />
      <BranchFormActions
        branchId={ dbBranch.id }
        isFormChanged={ isFormChangedDb }
        isFormInvalid={ isFormInvalid }
        setHasSpinner={ setHasSpinner }
        saveFormBranch={ saveFormBranch }
      />
    </div>
  );

  async function saveFormBranch()
  {
    setHasSpinner( true );

    const result = await onClickSaveBranch( formBranch, dbBranch );

    setHasSpinner( false );

    return result;
  }
}

function BranchFormTitle({ branchId, isFormChanged })
{
  return (
    <div className={ clsx('BranchFormTitle', isFormChanged && 'isFormChanged') }>
      { getBranchFormTitle( branchId )}
    </div>
  );
}

function getBranchFormTitle( branchId )
{
  const { lingo } = useLingo();

  return branchId
    ? lingo({
      en: `Edit branch: ${ branchId }`,
      de: `Niederlassung bearbeiten: ${ branchId }`,
    })
    : lingo({
      en: 'New branch',
      de: 'Neue Niederlassung',
    })
}

function compareBranches( formBranch, dbBranch )
{
  return Object.keys( formBranch ).reduce(( result, key ) =>
    Object.assign( result, {
      [key]: formBranch[ key ] !== dbBranch[ key ]
    }),
    {}
  );
}

function hasChangedField( isFieldChanged )
{
  return Object.values( isFieldChanged ).some( isChanged => isChanged );
}

function getActiveSubmitErrors( submitErrors, isFieldChanged )
{
  return Object.fromEntries(
    Object.entries( submitErrors ).filter(
      ([ field ]) => !isFieldChanged[ field ]
    )
  );
}