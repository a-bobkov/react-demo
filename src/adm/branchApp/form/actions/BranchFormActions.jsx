import { useLingo } from '../../../lingo/LingoProvider.jsx';
import { deleteBranch } from '../deleteBranch.js';
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
    const disableReasons = [
      isFormInvalid && lingo({
        en: 'the form is invalid',
        de: 'das Formular ungültig ist',
      }),
      !isFormChanged && lingo({
        en: 'the form is not changed',
        de: 'das Formular nicht geändert wird',
      }),
    ].filter( Boolean );

    const title = disableReasons.length > 0
      ? lingo({
        en: 'Disabled because\n' + disableReasons.join(';\n') + '.',
        de: 'Deaktiviert, da\n' + disableReasons.join(';\n') + '.',
      })
      : undefined;

    return (
      <button className="BranchFormAction"
        type="button"
        disabled={ disableReasons.length > 0 }
        title={ title }
        onClick={ saveFormBranch }
      >
        { lingo({
          en: 'Save branch',
          de: 'Speichern\ndie Niederlassung',
        })}
      </button>
    );
  }

  function BranchFormActionExit({ isFormChanged, isFormInvalid })
  {
    const modalDialogApi = useModalDialogContext();

    return (
      <button className="BranchFormAction"
        type="button"
        onClick={ onClick }
      >
        { lingo({
          en: 'Exit',
          de: 'Verlassen\ndas Formular',
        })}
      </button>
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
      <button className="BranchFormAction"
        onClick={ onClick }
      >
        { lingo({
          en: 'Delete branch',
          de: 'Löschen\ndie Niederlassung',
        })}
      </button>
    );

    async function onClick()
    {
      setHasSpinner( true );

      try {
        await deleteBranch( branchId, lingo );

        apiNotifications.addInfo( lingo({
          en: `Branch ${ branchId } is successfully deleted.`,
          de: `Niederlassung ${ branchId } wurde erfolgreich gelöscht.`,
        }));

        goExit();
      }
      catch (error) {
        apiNotifications.addError( lingo({
          en: `Error: ${ error.message }`,
          de: `Fehler: ${ error.message }`,
        }));
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
