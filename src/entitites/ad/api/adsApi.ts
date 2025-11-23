import { http } from '@shared/api/config';
import type { GetAdsParams, GetAdsResponse } from '@/entitites/ad/api/types.ts';
import type { Ad } from '@/entitites/ad/model/types.ts';

export const adsApi = {
  async getAds(params: GetAdsParams): Promise<GetAdsResponse> {
    return await http.get('/ads', { params }).then((res) => res.data);
  },
  async getAdById(id: number): Promise<Ad> {
    return await http.get(`/ads/${id}`).then((res) => res.data);
  },
  async approveAd(id: number): Promise<{ message: string; ad: Ad }> {
    return await http.post(`/ads/${id}/approve`).then((res) => res.data);
  },
  async rejectAd(
    id: number,
    payload: { reason: string; comment?: string }
  ): Promise<{ message: string; ad: Ad }> {
    return await http
      .post(`/ads/${id}/reject`, payload)
      .then((res) => res.data);
  },
  async requestAdChanges(
    id: number,
    payload: { reason: string; comment?: string }
  ): Promise<{ message: string; ad: Ad }> {
    return await http
      .post(`/ads/${id}/request-changes`, payload)
      .then((res) => res.data);
  }
};
