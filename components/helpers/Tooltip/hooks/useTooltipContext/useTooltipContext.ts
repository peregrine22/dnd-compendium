import { createContext, useContext, useMemo, useState } from 'react';

import { useTooltip } from '../useTooltip';

type ContextType = ReturnType<typeof useTooltip> | null;

export const TooltipContext = createContext<ContextType>(null);

function useTooltipContext() {
  const context = useContext(TooltipContext);

  if (context == null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />');
  }

  return context;
}

export default useTooltipContext;
