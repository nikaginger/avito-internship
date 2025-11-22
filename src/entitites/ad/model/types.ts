export type AdStatus = 'pending' | 'approved' | 'rejected';
export type Priority = 'normal' | 'urgent';

export interface Ad {
  id: number;
  title: string;
  price: number;
  category: string;
  createdAt: string;
  status: AdStatus;
  priority: Priority;
  imageUrl: string;
}
