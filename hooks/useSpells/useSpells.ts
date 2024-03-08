import { FetchItemsFilters, FetchItemsLimit, FetchItemsSort } from '@/types';
import { useInfiniteIndexQuery } from '../useInfiniteIndexQuery';
import { InfiniteIndexQueryBaseNodeType } from '../useInfiniteIndexQuery/useInfiniteIndexQuery.types';

interface SpellsOptions {
  cacheKey?: string;
  query: string;
  initialFilters?: FetchItemsFilters;
  initialSort?: FetchItemsSort;
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
  initialSort,
  options = {}
}: SpellsOptions) {
  const { data } = useInfiniteIndexQuery<SpellType>({
    cacheKey,
    query,
    initialFilters,
    initialLimit,
    initialSort,
    options,
    scope
  });

  return {
    spellsData: data
  };
}

export default useSpells;
