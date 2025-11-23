import type { Seller } from '@/entitites/seller/model/types.ts';

export type AdStatus = 'pending' | 'approved' | 'rejected';
export type AdPriority = 'normal' | 'urgent';

export interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  status: AdStatus;
  priority: AdPriority;
  createdAt: string; // ISO
  updatedAt: string; // ISO дата-время
  images: string[];
  seller: Seller;
  characteristics: Record<string, string>;
  moderationHistory: ModerationHistory[];
}

export interface ModerationHistory {
  id: number;
  moderatorId: number;
  moderatorName: string;
  action: 'approved' | 'rejected' | 'requestChanges';
  reason?: string | null;
  comment: string;
  timestamp: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
