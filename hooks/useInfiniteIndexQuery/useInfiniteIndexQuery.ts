import { useInfiniteQuery } from 'react-query';
import { useCallback, useMemo, useReducer } from 'react';
import { ClientError } from 'graphql-request';
import size from 'lodash/size';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import localforage from 'localforage';

import {
  FetchItemCacheKey,
  FetchItemGqlQuery,
  FetchItemsFilters,
  FetchItemsGqlQuery,
  FetchItemsLimit,
  FetchItemsOrder
} from '@/types';
import {
  InfiniteIndexQueryBaseNodeType,
  InfiniteIndexQueryData,
  InfiniteIndexQueryDefaultOptionsOpts,
  InfiniteIndexQueryResponse
} from './useInfiniteIndexQuery.types';

import sortItemsAction from '@/actions/sortItems/sortItems';
import filterItemsAction from '@/actions/filterItems/filterItems';

import { IndexRequestReducerType, indexRequestReducer } from './reducers';
import { fetchItems } from '@/actions/fetchItems/fetchItems';
import { changeItemsFiltersAction } from '@/actions/changeItemsFiltersAction';
import { clearItemsFiltersAction } from '@/actions/clearItemsFiltersAction';

import {
  INITIAL_FILTERS,
  INITIAL_LIMIT,
  INITIAL_ORDER,
  INITIAL_PAGE
} from './useInfiniteIndexQueryConstants';

type InfiniteIndexErrorType = Error | ClientError;

type InfiniteIndexQueryWithFetchItemOptions = {
  fetchItemCacheKey: FetchItemCacheKey;
  fetchItemQuery: FetchItemGqlQuery;
};

type InfiniteIndexQueryWithoutFetchItemOptions = {
  fetchItemCacheKey?: never;
  fetchItemQuery?: never;
};

interface InfiniteIndexQueryOptions<NodeType> {
  cacheKey: string;
  query: FetchItemsGqlQuery;
  scope: string;
  initialFilters?: FetchItemsFilters;
  initialOrder?: FetchItemsOrder;
  initialLimit?: FetchItemsLimit;
  options?: InfiniteIndexQueryDefaultOptionsOpts<NodeType>;
}

function useInfiniteIndexQuery<
  NodeType extends InfiniteIndexQueryBaseNodeType
>({
  cacheKey,
  scope,
  query,
  initialFilters = INITIAL_FILTERS,
  initialOrder = INITIAL_ORDER,
  initialLimit = INITIAL_LIMIT,
  options = {},
  fetchItemCacheKey,
  fetchItemQuery
}: InfiniteIndexQueryOptions<NodeType> &
  (
    | InfiniteIndexQueryWithFetchItemOptions
    | InfiniteIndexQueryWithoutFetchItemOptions
  )) {
  const localForageCacheKey = `${cacheKey}-infinite-index`;

  const [{ currentFilters, currentLimit, currentOrder }, dispatch] =
    useReducer<IndexRequestReducerType>(indexRequestReducer, {
      currentLimit: initialLimit,
      currentFilters: initialFilters,
      currentOrder: initialOrder
    });

  const { data: placeholderData, isFetched: placeholderDataFetched } =
    useInfiniteQuery<InfiniteIndexQueryResponse<NodeType> | null>(
      `${cacheKey}-placeholder`,
      () =>
        localforage.getItem<InfiniteIndexQueryResponse<NodeType>>(
          localForageCacheKey
        ),
      {
        enabled: options.enabledPlaceholder
      }
    );

  const currentParameters = useMemo(() => {
    return {
      filters: currentFilters,
      order: currentOrder,
      limit: currentLimit
    };
  }, [currentFilters, currentOrder, currentLimit]);

  const fullCacheKey = useMemo(() => {
    return [cacheKey, currentParameters];
  }, [cacheKey, currentParameters]);

  const {
    data,
    isFetched,
    isLoading,
    error,
    isPlaceholderData,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery<
    InfiniteIndexQueryResponse<NodeType>,
    InfiniteIndexErrorType
  >(
    fullCacheKey,
    useCallback(
      ({ pageParam = INITIAL_PAGE }) =>
        fetchItems({
          query,
          page: pageParam,
          ...currentParameters
        }),
      [currentParameters, query]
    ),
    {
      enabled: options.enabled || placeholderDataFetched,
      cacheTime: options.cacheTime,
      staleTime: options.staleTime,
      onSuccess: useCallback(
        (data) => {
          options.onSuccess?.(data);
          if (
            data?.pages[0] &&
            size(data?.pages) === 1 &&
            isEqual(currentFilters, initialFilters) &&
            isEqual(currentOrder, initialOrder) &&
            currentLimit === initialLimit
          ) {
            return localforage.setItem<InfiniteIndexQueryResponse<NodeType>>(
              localForageCacheKey,
              data.pages[0]
            );
          }
        },
        [
          currentFilters,
          currentOrder,
          currentLimit,
          initialFilters,
          initialOrder,
          initialLimit,
          localForageCacheKey,
          options
        ]
      ),
      placeholderData: useCallback(() => {
        if (
          placeholderData?.pages?.[0] &&
          isEqual(currentFilters, initialFilters) &&
          isEqual(currentOrder, initialOrder) &&
          currentLimit === initialLimit
        ) {
          return placeholderData as InfiniteIndexQueryData<NodeType>;
        }
      }, [
        currentFilters,
        currentOrder,
        currentLimit,
        initialFilters,
        initialOrder,
        initialLimit,
        placeholderData
      ]),
      getNextPageParam: useCallback(
        (lastPage) => {
          return lastPage?.[scope]?.paginationInfo?.nextPage ?? undefined;
        },
        [scope]
      )
    }
  );

  const loadMoreItems = useCallback(() => fetchNextPage(), [fetchNextPage]);

  const lastQueryResponseValue = last(data?.pages)?.[scope];
  const placeholderResponseValue = placeholderData?.pages?.[0]?.[scope];

  const items = useMemo<NodeType[]>(() => {
    const pagesNodes = data?.pages?.[0]?.[scope];
    return pagesNodes ? pagesNodes : [];
  }, [data, scope]);

  const isLoadingTotalCount = isLoading
    ? placeholderResponseValue?.paginationInfo?.totalCount
    : null;

  return {
    data,
    items,
    itemsError: error,
    itemsTotalCount:
      lastQueryResponseValue?.paginationInfo?.totalCount ||
      isLoadingTotalCount ||
      0,
    isFetched,
    isLoading,
    isFetchingNextPage,
    isPlaceholderData,
    currentFilters,
    currentOrder,
    currentPage: lastQueryResponseValue?.paginationInfo?.currentPage,
    currentLimit,
    hasNextPage,
    loadMoreItems,
    filterItems: useCallback(
      (nextFilters: FetchItemsFilters) =>
        dispatch(filterItemsAction(nextFilters)),
      [dispatch]
    ),
    changeItemsFilters: useCallback(
      (
        changedFilters: Partial<FetchItemsFilters>,
        removeFilters: string[] = []
      ) => dispatch(changeItemsFiltersAction(changedFilters, removeFilters)),
      [dispatch]
    ),
    clearItemsFilters: useCallback(
      () => dispatch(clearItemsFiltersAction()),
      [dispatch]
    ),
    sortItems: useCallback(
      (nextOrder: FetchItemsOrder) => dispatch(sortItemsAction(nextOrder)),
      [dispatch]
    )
  };
}

export default useInfiniteIndexQuery;
