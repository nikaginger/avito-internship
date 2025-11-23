import { useMemo, useState } from 'react';
import { mockAds } from '@shared/mocks/ads/mock.ts';
import { AdCard } from '@/entitites/ad/ui/AdCard.tsx';
import { Pagination } from 'antd';
import type {
  IAdsFilter,
  SortType
} from '@/features/ads-filters/model/types.ts';
import { AdsFilter } from '@features/ads-filters/ui/AdsFilter.tsx';
import styles from './ListPage.module.scss';
import type { Ad } from '@/entitites/ad/model/types.ts';

const PAGE_SIZE = 10;

const getMinMaxPrice = (ads: Ad[]): [number, number] => {
  const prices = ads.map((a) => a.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return [min, max];
};

export function ListPage() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<IAdsFilter>({
    statuses: [],
    categories: [],
    priceRange: getMinMaxPrice(mockAds),
    search: ''
  });
  const [sortType, setSortType] = useState<SortType>('createdAt-desc');

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

  const totalAds = filteredAds.length;
  const pagedAds = filteredAds.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = (nextFilter: IAdsFilter) => {
    setPage(1);
    setFilter(nextFilter);
  };

  const handleSortChange = (nextSort: SortType) => {
    setPage(1);
    setSortType(nextSort);
  };

  const handleReset = () => {
    setPage(1);
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
          onFilterChange={handleFilterChange}
          sortType={sortType}
          onSortTypeChange={handleSortChange}
          minPrice={getMinMaxPrice(mockAds)[0]}
          maxPrice={getMinMaxPrice(mockAds)[1]}
          onReset={handleReset}
        />
      </div>
      <div className={styles['list-page__cards']}>
        {pagedAds.map((ad) => (
          <AdCard
            key={ad.id}
            ad={ad}
          />
        ))}
      </div>
      <div className={styles['list-page__pagination']}>
        <Pagination
          className={styles['list-page__pages']}
          current={page}
          pageSize={PAGE_SIZE}
          total={totalAds}
          showSizeChanger={false}
          onChange={setPage}
        />
        <div className={styles['list-page__note']}>
          Показано {pagedAds.length} из {totalAds} объявлений
        </div>
      </div>
    </div>
  );
}
