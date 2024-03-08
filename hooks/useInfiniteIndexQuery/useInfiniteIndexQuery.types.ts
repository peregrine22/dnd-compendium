import { InfiniteData } from 'react-query';

export interface InfiniteIndexQueryResponse<NodeType> {
  [key: string]: {
    nodes: NodeType[];
    paginationInfo: {
      currentPage: number;
      nextPage: number;
      totalCount: number;
    };
  };
}

export type InfiniteIndexQueryData<NodeType> = InfiniteData<
  InfiniteIndexQueryResponse<NodeType>
>;

export interface InfiniteIndexQueryBaseNodeType {
  uuid: string;
}

export interface UpdateItemCacheSelector {
  uuid: string;
}

interface UpdateItemCacheOptions<T> {
  selector: UpdateItemCacheSelector;
  updateFunction: (item: T) => T;
}

type UpdateItemCacheRollback = () => void;

export type UpdateInfiniteIndexQueryItemCacheAction<T> = (
  options: UpdateItemCacheOptions<T>
) => UpdateItemCacheRollback | null;

export type InfiniteIndexQueryOnSuccess<NodeType> = (
  data: InfiniteIndexQueryData<NodeType>
) => void;

export interface InfiniteIndexQueryDefaultOptionsOpts<NodeType> {
  cacheTime?: number;
  staleTime?: number;
  enabled?: boolean;
  enabledPlaceholder?: boolean;
  onSuccess?: InfiniteIndexQueryOnSuccess<NodeType>;
}
