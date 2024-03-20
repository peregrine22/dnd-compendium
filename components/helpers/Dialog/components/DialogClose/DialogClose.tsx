import { ButtonHTMLAttributes, forwardRef } from 'react';

import { useDialogContext } from '../../hooks/useDialogContext';

export const DialogClose = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function DialogClose(props, ref) {
  const { setOpen } = useDialogContext();
  return (
    <button type="button" {...props} ref={ref} onClick={() => setOpen(false)} />
  );
});

export default DialogClose;
