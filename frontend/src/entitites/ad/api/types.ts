import type { Ad, Pagination } from '@/entitites/ad/model/types.ts';

export interface GetAdsParams {
  page?: number;
  limit?: number;
  status?: string[];
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'createdAt' | 'price' | 'priority';
  sortOrder?: 'asc' | 'desc';
}

export interface GetAdsResponse {
  ads: Ad[];
  pagination: Pagination;
}

export interface ReasonRequestBody {
  reason:
    | 'Запрещенный товар'
    | 'Неверная категория'
    | 'Некорректное описание'
    | 'Проблемы с фото'
    | 'Подозрение на мошенничество'
    | 'Другое';
  comment?: string;
}
