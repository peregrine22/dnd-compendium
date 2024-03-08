import { IndexRequestAction } from '@/hooks/useInfiniteIndexQuery/reducers';
import { FILTER_ITEMS } from '@/hooks/useInfiniteIndexQuery/useInfiniteIndexQueryConstants';
import { FetchItemsFilters } from '@/types';

function filterItemsAction(nextFilters: FetchItemsFilters): IndexRequestAction {
  return {
    type: FILTER_ITEMS,
    nextFilters
  };
}

export default filterItemsAction;
