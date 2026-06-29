import './ModalDialog.css';

export function ModalDialog({ children, modalDialog })
{
  const hasModalDialog = Boolean( modalDialog );

  return (
    <>
      <modal-dialog-wrapper inert={ hasModalDialog }>
        { children }
      </modal-dialog-wrapper>
      <ModalDialogWindow modalDialog={ modalDialog }/>
    </>
  );
}

function ModalDialogWindow({ modalDialog })
{
  if ( !modalDialog ) return;

  const ModalDialogContent = modalDialog.content;

  return (
    <modal-dialog-screen>
      <modal-dialog-window>
        <ModalDialogContent
          resolve={ modalDialog.resolve }
        />
      </modal-dialog-window>
    </modal-dialog-screen>
  );
}
