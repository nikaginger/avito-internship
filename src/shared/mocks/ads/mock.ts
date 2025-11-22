import type { Ad } from '@/entitites/ad/model/types.ts';

export const mockAds: Ad[] = [
  {
    id: 1,
    title: 'Диван для гостиной',
    price: 15000,
    category: 'Мебель',
    createdAt: '2025-11-22T09:00:00Z',
    status: 'pending',
    priority: 'urgent',
    imageUrl: ''
  },
  {
    id: 2,
    title: 'Смартфон Samsung',
    price: 8500,
    category: 'Электроника',
    createdAt: '2025-11-21T18:45:00Z',
    status: 'approved',
    priority: 'normal',
    imageUrl: ''
  }
];
