import { IndexRequestAction } from '@/hooks/useInfiniteIndexQuery/reducers';
import { CHANGE_ITEMS_FILTERS } from '@/hooks/useInfiniteIndexQuery/useInfiniteIndexQueryConstants';
import { FetchItemsFilters } from '@/types';

function changeItemsFiltersAction(
  changedFilters: Partial<FetchItemsFilters>,
  removeFilters: string[]
): IndexRequestAction {
  return {
    type: CHANGE_ITEMS_FILTERS,
    changedFilters,
    removeFilters
  };
}

export default changeItemsFiltersAction;
