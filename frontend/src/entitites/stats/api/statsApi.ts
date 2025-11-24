import { http } from '@shared/api/config';
import type {
  StatsSummary,
  ActivityData,
  DecisionsData,
  CategoriesData
} from '../model/types';

export const statsApi = {
  async getSummary(): Promise<StatsSummary> {
    return await http.get('/stats/summary').then((res) => res.data);
  },
  async getActivityChart(): Promise<ActivityData[]> {
    return await http.get('/stats/chart/activity').then((res) => res.data);
  },
  async getDecisionsChart(): Promise<DecisionsData> {
    return await http.get('/stats/chart/decisions').then((res) => res.data);
  },
  async getCategoriesChart(): Promise<CategoriesData> {
    return await http.get('/stats/chart/categories').then((res) => res.data);
  }
};
