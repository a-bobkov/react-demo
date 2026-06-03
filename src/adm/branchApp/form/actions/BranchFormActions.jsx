import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { deleteBranch } from '../deleteBranch.js';
import { Button } from '../../../components/Button/Button.jsx';
import { useModalDialogContext } from '../../../modalDialog/ModalDialogProvider.jsx';
import { useNotificationsContext } from '../../../notifications/NotificationsProvider.jsx';
import { AllowExitModalDialogContent } from './AllowExitModalDialogContent.jsx';
import { createHistoryEntry } from '../../../PopstateLink.jsx';
import { branchListPath } from '../../useBranchAppLocation.js';
import './BranchFormActions.css';

export function BranchFormActions({ branchId, isFormChanged, isFormInvalid, setHasSpinner, saveFormBranch })
{
  const apiNotifications = useNotificationsContext();

  const { lingo } = useLingo();

  return (
    <div className="BranchFormActions">
      <BranchFormActionSave
        isFormChanged={ isFormChanged }
        isFormInvalid={ isFormInvalid }
      />
      <BranchFormActionExit
        isFormChanged={ isFormChanged }
        isFormInvalid={ isFormInvalid }
      />
      <BranchFormActionDelete
        branchId={ branchId }
      />
    </div>
  );

  function BranchFormActionSave({ isFormInvalid, isFormChanged })
  {
    return (
      <Button
        className="BranchFormAction"
        label={ lingo({
          en: 'Save branch',
          de: 'Speichern\ndie Niederlassung',
        }) }
        disableReasons={ [
          isFormInvalid && lingo({
            en: 'the form is invalid',
            de: 'das Formular ungültig ist',
          }),
          !isFormChanged && lingo({
            en: 'the form is not changed',
            de: 'das Formular nicht geändert wird',
          }),
        ] }
        onClick={ saveFormBranch }
      />
    );
  }

  function BranchFormActionExit({ isFormChanged, isFormInvalid })
  {
    const modalDialogApi = useModalDialogContext();

    return (
      <Button
        className="BranchFormAction"
        label={ lingo({
          en: 'Exit',
          de: 'Verlassen\ndas Formular',
        }) }
        onClick={ onClick }
      />
    );

    async function onClick()
    {
      const isExitAllowed = !isFormChanged || await modalDialogApi.ask( IsAllowExit );

      if ( isExitAllowed ) {
        goExit();
      }
    }

    function IsAllowExit({ resolve })
    {
      return (
        <AllowExitModalDialogContent
          isFormInvalid={ isFormInvalid }
          saveFormBranch={ saveFormBranch }
          resolve={ resolve }
        />
      );
    }
  }

  function BranchFormActionDelete({ branchId })
  {
    return branchId && (
      <Button
        className="BranchFormAction"
        label={ lingo({
          en: 'Delete branch',
          de: 'Löschen\ndie Niederlassung',
        }) }
        onClick={ onClick }
      />
    );

    async function onClick()
    {
      setHasSpinner( true );

      try {
        await deleteBranch( branchId );

        apiNotifications.addInfo({
          en: `Branch ${ branchId } is successfully deleted.`,
          de: `Niederlassung ${ branchId } wurde erfolgreich gelöscht.`,
        });

        goExit();
      }
      catch ( error )
      {
        if ( error.cause?.status === 409 )
        {
          apiNotifications.addError({
            en: `Branch ${ branchId } is referenced and cannot be deleted`,
            de: `Niederlassung ${ branchId } ist referenziert und kann nicht gelöscht werden`,
          });
        }
        else
        {
          apiNotifications.addError({
            en: `Error deleting branch ${ branchId }: ${ error.message }`,
            de: `Fehler beim Löschen der Niederlassung ${ branchId }: ${ error.message }`,
          });
        }
      }

      setHasSpinner( false );
    }
  }

  function goExit()
  {
    if ( window.history.length > 1 ) {
      window.history.back();
    } else {
      createHistoryEntry( branchListPath );
    }
  }
}
