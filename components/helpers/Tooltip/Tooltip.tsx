import { ReactNode } from 'react';
import { useTooltip } from './hooks/useTooltip';

import { TooltipOptions } from './hooks/useTooltip/useTooltip';
import { TooltipContext } from './hooks/useTooltipContext/useTooltipContext';

function Tooltip({
  children,
  ...options
}: { children: ReactNode } & TooltipOptions) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTooltip(options);
  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
}

export default Tooltip;
