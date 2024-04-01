import { Dispatch, SetStateAction, createContext, useContext } from 'react';

import { useDialog } from '../useDialog';

type ContextType =
  | (ReturnType<typeof useDialog> & {
      setLabelId: Dispatch<SetStateAction<string | undefined>>;
      setDescriptionId: Dispatch<SetStateAction<string | undefined>>;
    })
  | null;

export const DialogContext = createContext<ContextType>(null);

function useDialogContext() {
  const context = useContext(DialogContext);

  if (context == null) {
    throw new Error('Dialog components must be wrapped in <Dialog />');
  }

  return context;
}

export default useDialogContext;
