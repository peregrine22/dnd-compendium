import { ReactNode, forwardRef, isValidElement, cloneElement } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import { useDialogContext } from '../../hooks/useDialogContext';

interface DialogTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

const DialogTrigger = forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & DialogTriggerProps
>(function DialogTrigger({ children, asChild = false, ...props }, propRef) {
  const context = useDialogContext();

  const childRef = (children as any).ref;

  const ref = useMergeRefs([context.refs.setReference, propRef, childRef]);

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-state': context.open ? 'open' : 'closed'
      })
    );
  }

  return (
    <button
      ref={ref}
      data-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  );
});

export default DialogTrigger;
