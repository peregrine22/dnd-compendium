import { ReactNode } from 'react';

import { useDialog, DialogOptions } from '../../hooks/useDialog';

import { DialogContext } from '../../hooks/useDialogContext/useDialogContext';

function Dialog({
  children,
  ...options
}: { children: ReactNode } & DialogOptions) {
  const dialog = useDialog(options);

  return (
    <DialogContext.Provider value={dialog}> {children}</DialogContext.Provider>
  );
}

export default Dialog;
