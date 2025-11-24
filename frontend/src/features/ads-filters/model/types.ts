import type { AdStatus } from '@/entitites/ad/model/types.ts';

export interface IAdsFilter {
  statuses: AdStatus[];
  categories: string[];
  priceRange: [number, number];
  search: string;
}

export type SortType =
  | 'createdAt-desc'
  | 'createdAt-asc'
  | 'price-desc'
  | 'price-asc'
  | 'priority';
