import { IndexRequestAction } from '@/hooks/useInfiniteIndexQuery/reducers';
import { CLEAR_ITEMS_FILTERS } from '@/hooks/useInfiniteIndexQuery/useInfiniteIndexQueryConstants';

function clearItemsFiltersAction(): IndexRequestAction {
  return {
    type: CLEAR_ITEMS_FILTERS
  };
}

export default clearItemsFiltersAction;
