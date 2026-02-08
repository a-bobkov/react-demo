import './ModalDialog.css';

export function ModalDialog({ modalDialog })
{
  return modalDialog && (
    <>
      <div className="ModalDialogOverlay" />
      <div className="ModalDialogWindow">
        <ModalDialogQuestion
          question={ modalDialog.question }
        />
        <ModalDialogAnswers
          answers={ modalDialog.answers }
          resolve={ modalDialog.resolve }
        />
      </div>
    </>
  );

  function ModalDialogQuestion({ question })
  {
    return (
      <div className="ModalDialogQuestion">
        { question }
      </div>
    );
  }

  function ModalDialogAnswers({ answers, resolve })
  {
    return (
      <div className="ModalDialogAnswers">
        { Object.entries( answers ).map(([ answer, text ]) =>
          <ModalDialogAnswer
            answer={ answer }
            label={ text }
            resolve={ resolve }
          />
        )}
      </div>
    );
  }

  function ModalDialogAnswer({ answer, label, resolve })
  {
    return (
      <span className="ModalDialogAnswer" onClick={ onClick }>
        { label }
      </span>
    );

    function onClick()
    {
      resolve( answer );
    }
  }
}
