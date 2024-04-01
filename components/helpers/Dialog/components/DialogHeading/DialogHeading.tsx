import { HTMLProps, forwardRef, useId, useLayoutEffect } from 'react';

import { useDialogContext } from '../../hooks/useDialogContext';

export const DialogHeading = forwardRef<
  HTMLHeadingElement,
  HTMLProps<HTMLHeadingElement>
>(function DialogHeading({ children, ...props }, ref) {
  const { setLabelId } = useDialogContext();
  const id = useId();

  // Only sets `aria-labelledby` on the Dialog root element
  // if this component is mounted inside it.
  useLayoutEffect(() => {
    setLabelId(id);
    return () => setLabelId(undefined);
  }, [id, setLabelId]);

  return (
    <div {...props} ref={ref} id={id}>
      {children}
    </div>
  );
});

export default DialogHeading;
