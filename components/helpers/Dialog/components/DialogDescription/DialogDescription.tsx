import { forwardRef, HTMLProps, useId, useLayoutEffect } from 'react';

import { useDialogContext } from '../../hooks/useDialogContext';

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  HTMLProps<HTMLParagraphElement>
>(function DialogDescription({ children, ...props }, ref) {
  const { setDescriptionId } = useDialogContext();
  const id = useId();

  // Only sets `aria-describedby` on the Dialog root element
  // if this component is mounted inside it.
  useLayoutEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  return (
    <div {...props} ref={ref} id={id}>
      {children}
    </div>
  );
});
export default DialogDescription;
