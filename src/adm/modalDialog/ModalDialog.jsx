import './ModalDialog.css';

export function ModalDialog({ children, modalDialog })
{
  const hasModalDialog = Boolean( modalDialog );

  return (
    <>
      <div className="ModalDialogWrapper" inert={ hasModalDialog }>
        { children }
      </div>
      <ModalDialogWindow modalDialog={ modalDialog }/>
    </>
  );
}

function ModalDialogWindow({ modalDialog })
{
  if ( !modalDialog ) return;

  const ModalDialogContent = modalDialog.content;

  return (
    <div className="ModalDialogWindow">
      <ModalDialogContent
        resolve={ modalDialog.resolve }
      />
    </div>
  );
}
