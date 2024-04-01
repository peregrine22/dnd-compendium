import { ButtonHTMLAttributes, forwardRef, useCallback } from 'react';

import { useDialogContext } from '../../hooks/useDialogContext';

export const DialogClose = forwardRef<
  HTMLDivElement,
  ButtonHTMLAttributes<HTMLDivElement>
>(function DialogClose(props, ref) {
  const { setOpen } = useDialogContext();

  const handleClose = useCallback<() => void>(() => {
    setOpen(false);
  }, [setOpen]);

  return <div {...props} ref={ref} onClick={handleClose} />;
});

export default DialogClose;
