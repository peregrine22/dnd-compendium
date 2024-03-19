import { HTMLProps, cloneElement, forwardRef, isValidElement } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import { useTooltipContext } from '../../hooks/useTooltipContext';

const TooltipTrigger = forwardRef<
  HTMLElement,
  HTMLProps<HTMLElement> & { asChild?: boolean }
>(function TooltipTrigger({ children, asChild = false, ...props }, propRef) {
  const context = useTooltipContext();

  const childrenRef = (children as any).ref;

  const ref = useMergeRefs([context.refs.setReference, childrenRef, propRef]);

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

export default TooltipTrigger;
