import { FetchItemsFilters, FetchItemsLimit, FetchItemsOrder } from '@/types';
import { useInfiniteIndexQuery } from '../useInfiniteIndexQuery';
import { InfiniteIndexQueryBaseNodeType } from '../useInfiniteIndexQuery/useInfiniteIndexQuery.types';

interface SpellsOptions {
  cacheKey?: string;
  query: string;
  initialFilters?: FetchItemsFilters;
  initialOrder?: FetchItemsOrder;
  initialLimit?: FetchItemsLimit;
  options?: {
    cacheTime?: number;
    enabled?: boolean;
    enabledPlaceholder?: boolean;
  };
}

const scope = 'spells';

function useSpells<SpellType extends InfiniteIndexQueryBaseNodeType>({
  cacheKey,
  query,
  initialFilters,
  initialLimit,
  initialOrder = null,
  options = {}
}: SpellsOptions) {
  const { items } = useInfiniteIndexQuery<SpellType>({
    cacheKey,
    query,
    initialFilters,
    initialLimit,
    initialOrder,
    options,
    scope
  });

  return {
    spellsData: items
  };
}

export default useSpells;
