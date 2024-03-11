import size from 'lodash/size';

import { IndexRequestAction } from '@/hooks/useInfiniteIndexQuery/reducers';
import {
  SORT_ITEMS,
  INITIAL_ORDER
} from '@/hooks/useInfiniteIndexQuery/useInfiniteIndexQueryConstants';
import { FetchItemsOrder } from '@/types';

function sortItemsAction(nextOrder: FetchItemsOrder): IndexRequestAction {
  return {
    type: SORT_ITEMS,
    nextOrder: size(nextOrder) > 0 ? nextOrder : INITIAL_ORDER
  };
}

export default sortItemsAction;
