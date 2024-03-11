export type ItemsFilters = Record<string, any>;
export type FetchItemsFilters = Record<string, any>;
export type FetchItemsLimit = number;
export type FetchItemsPage = number;
export type FetchItemsOrder = {
  by: string;
  direction: string;
  then_by?: string;
};

export type FetchItemsSortableField = string;
export type FetchItemsSort = FetchItemsSortableField[];

export type FetchItemsGqlQuery = string;
export type FetchItemGqlQuery = string;

export type FetchItemCacheKey = string;
