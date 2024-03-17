import { GRAPHQL_API_URI } from '@/app/config';
import {
  FetchItemsFilters,
  FetchItemsGqlQuery,
  FetchItemsLimit,
  FetchItemsPage,
  FetchItemsSort
} from '@/types';
import generateUuid from '@/utils/generateUuid';
import getQueryName from '@/utils/getQueryName';
import { request } from 'graphql-request';

interface FetchItemsProps {
  query: FetchItemsGqlQuery;
  filters: FetchItemsFilters;
  order: {};
  page: FetchItemsPage;
  limit: FetchItemsLimit;
}

export function fetchItems({
  query,
  filters,
  order,
  page,
  limit
}: FetchItemsProps): Promise<any> {
  const { name } = getQueryName(query);

  const requestId = generateUuid();

  return request(
    `${GRAPHQL_API_URI}?queryName=${name}&requestId=${requestId}`,
    query,
    {
      order,
      limit,
      ...filters
    },
    { requestId }
  );
}
