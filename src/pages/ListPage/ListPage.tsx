import { useMemo, useState } from 'react';
import { mockAds } from '@shared/mocks/ads/mock.ts';
import { AdCard } from '@/entitites/ad/ui/AdCard.tsx';
import type { IAdsFilter } from '@/features/ads-filters/model/types.ts';
import { AdsFilter } from '@features/ads-filters/ui/AdsFilter.tsx';
import styles from './ListPage.module.scss';
import type { Ad } from '@/entitites/ad/model/types.ts';

const getMinMaxPrice = (ads: Ad[]): [number, number] => {
  const prices = ads.map((a) => a.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return [min, max];
};

export function ListPage() {
  const [filter, setFilter] = useState<IAdsFilter>({
    statuses: [],
    categories: [],
    priceRange: getMinMaxPrice(mockAds),
    search: ''
  });
  const [sortType, setSortType] = useState('createdAt-desc');

  const filteredAds = useMemo(() => {
    return mockAds
      .filter(
        (ad) =>
          (filter.statuses.length === 0 ||
            filter.statuses.includes(ad.status)) &&
          (filter.categories.length === 0 ||
            filter.categories.includes(ad.category)) &&
          ad.price >= filter.priceRange[0] &&
          ad.price <= filter.priceRange[1] &&
          ad.title.toLowerCase().includes(filter.search.toLowerCase())
      )
      .sort((a, b) => {
        if (sortType === 'createdAt-desc')
          return b.createdAt.localeCompare(a.createdAt);
        if (sortType === 'createdAt-asc')
          return a.createdAt.localeCompare(b.createdAt);
        if (sortType === 'price-desc') return b.price - a.price;
        if (sortType === 'price-asc') return a.price - b.price;
        if (sortType === 'priority')
          return (
            (b.priority === 'urgent' ? 1 : 0) -
            (a.priority === 'urgent' ? 1 : 0)
          );
        return 0;
      });
  }, [filter, sortType]);

  const handleReset = () => {
    setFilter({
      statuses: [],
      categories: [],
      priceRange: getMinMaxPrice(mockAds),
      search: ''
    });
    setSortType('createdAt-desc');
  };

  return (
    <div className={styles['list-page']}>
      <h1 className={styles['list-page__title']}>Список объявлений</h1>
      <div className={styles['list-page__filter']}>
        <AdsFilter
          filter={filter}
          setFilter={setFilter}
          sortType={sortType}
          setSortType={setSortType}
          minPrice={getMinMaxPrice(mockAds)[0]}
          maxPrice={getMinMaxPrice(mockAds)[1]}
          onReset={handleReset}
        />
      </div>
      <div className={styles['list-page__cards']}>
        {filteredAds.map((ad) => (
          <AdCard
            key={ad.id}
            ad={ad}
          />
        ))}
      </div>
    </div>
  );
}
