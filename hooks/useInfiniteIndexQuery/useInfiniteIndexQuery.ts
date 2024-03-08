import {
  FetchItemCacheKey,
  FetchItemGqlQuery,
  FetchItemsFilters,
  FetchItemsGqlQuery,
  FetchItemsLimit,
  FetchItemsSort
} from '@/types';
import { ClientError } from 'graphql-request';
import {
  InfiniteIndexQueryBaseNodeType,
  InfiniteIndexQueryData,
  InfiniteIndexQueryDefaultOptionsOpts,
  InfiniteIndexQueryResponse
} from './useInfiniteIndexQuery.types';
import {
  INITIAL_FILTERS,
  INITIAL_LIMIT,
  INITIAL_PAGE,
  INITIAL_SORT
} from './useInfiniteIndexQueryConstants';
import { useCallback, useMemo, useReducer } from 'react';
import { IndexRequestReducerType, indexRequestReducer } from './reducers';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import localforage from 'localforage';
import { fetchItems } from '@/actions/fetchItems/fetchItems';
import { flatten, isEqual, last, size } from 'lodash';
import filterItemsAction from '@/actions/filterItems/filterItems';
import { changeItemsFiltersAction } from '@/actions/changeItemsFiltersAction';
import { clearItemsFiltersAction } from '@/actions/clearItemsFiltersAction';

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
  initialSort?: FetchItemsSort;
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
  initialSort = INITIAL_SORT,
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

  const [{ currentFilters, currentLimit, currentSort }, dispatch] =
    useReducer<IndexRequestReducerType>(indexRequestReducer, {
      currentLimit: initialLimit,
      currentFilters: initialFilters,
      currentSort: initialSort
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

  const currentParams = useMemo(() => {
    return {
      filters: currentFilters,
      sort: currentSort,
      limit: currentLimit
    };
  }, [currentFilters, currentSort, currentLimit]);

  const fullCacheKey = useMemo(() => {
    return [cacheKey, currentParams];
  }, [cacheKey, currentParams]);

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
          ...currentParams
        }),
      [currentParams, query]
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
            isEqual(currentSort, initialSort) &&
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
          currentSort,
          currentLimit,
          initialFilters,
          initialSort,
          initialLimit,
          localForageCacheKey,
          options
        ]
      ),
      placeholderData: useCallback(() => {
        if (
          placeholderData?.pages?.[0] &&
          isEqual(currentFilters, initialFilters) &&
          isEqual(currentSort, initialSort) &&
          currentLimit === initialLimit
        ) {
          return placeholderData as InfiniteIndexQueryData<NodeType>;
        }
      }, [
        currentFilters,
        currentSort,
        currentLimit,
        initialFilters,
        initialSort,
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
    const pagesNodes = data?.pages?.map((page) => page?.[scope]?.nodes);
    return pagesNodes ? flatten(pagesNodes) : [];
  }, [data, scope]);

  const isLoadingTotalCount = isLoading
    ? placeholderResponseValue?.paginationInfo?.totalCount
    : null;

  const queryClient = useQueryClient();

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
    currentSort,
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
    )
    // sortItems: useCallback(
    //   (nextSort: FetchItemsSort) => dispatch(sortItemsAction(nextSort)),
    //   [dispatch]
    // ),
    // limitItems: useCallback(
    //   (nextLimit: FetchItemsLimit) => dispatch(limitItemsAction(nextLimit)),
    //   [dispatch]
    // )
  };
}

export default useInfiniteIndexQuery;
