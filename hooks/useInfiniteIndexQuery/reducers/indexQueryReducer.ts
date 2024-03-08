import omit from 'lodash/omit';

import { FetchItemsFilters, FetchItemsLimit, FetchItemsSort } from '@/types';
import {
  CHANGE_ITEMS_FILTERS,
  CLEAR_ITEMS_FILTERS,
  FILTER_ITEMS,
  INITIAL_FILTERS,
  INITIAL_LIMIT,
  INITIAL_SORT,
  LIMIT_ITEMS,
  SORT_ITEMS
} from '../useInfiniteIndexQueryConstants';

export interface IndexRequestState {
  currentFilters: FetchItemsFilters;
  currentLimit: FetchItemsLimit;
  currentSort: FetchItemsSort;
}

export const indexRequestInitialState = {
  currentFilters: INITIAL_FILTERS,
  currentLimit: INITIAL_LIMIT,
  currentSort: INITIAL_SORT
};

export type IndexRequestAction =
  | {
      type: 'CHANGE_ITEMS_FILTERS';
      changedFilters: Partial<FetchItemsFilters>;
      removeFilters: string[];
    }
  | {
      type: 'FILTER_ITEMS';
      nextFilters: FetchItemsFilters;
    }
  | { type: 'SORT_ITEMS'; nextSort: FetchItemsSort }
  | { type: 'LIMIT_ITEMS'; nextLimit: FetchItemsLimit }
  | { type: 'CLEAR_ITEMS_FILTERS' };

export type IndexRequestReducerType = (
  prevState: IndexRequestState,
  action: IndexRequestAction
) => IndexRequestState;

export function indexRequestReducer(
  state: IndexRequestState,
  action: IndexRequestAction
): IndexRequestState {
  switch (action.type) {
    case CHANGE_ITEMS_FILTERS:
      return {
        ...state,
        currentFilters: omit(
          { ...state.currentFilters, ...action.changedFilters },
          action.removeFilters
        )
      };
    case CLEAR_ITEMS_FILTERS:
      return {
        ...state,
        currentFilters: INITIAL_FILTERS
      };
    case FILTER_ITEMS:
      return {
        ...state,
        currentFilters: action.nextFilters
      };
    case LIMIT_ITEMS:
      return {
        ...state,
        currentLimit: action.nextLimit
      };
    case SORT_ITEMS:
      return {
        ...state,
        currentSort: action.nextSort
      };
    default:
      return state;
  }
}
