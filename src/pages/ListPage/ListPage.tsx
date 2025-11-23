import { useEffect, useRef, useState } from 'react';
import { AdCard } from '@/entitites/ad/ui/AdCard.tsx';
import type { InputRef } from 'antd';
import { Pagination } from 'antd';
import type {
  IAdsFilter,
  SortType
} from '@/features/ads-filters/model/types.ts';
import { AdsFilter } from '@features/ads-filters/ui/AdsFilter.tsx';
import styles from './ListPage.module.scss';
import { adsApi } from '@/entitites/ad/api/adsApi';
import type { GetAdsParams, GetAdsResponse } from '@/entitites/ad/api/types.ts';

const PAGE_SIZE = 10;

export function ListPage() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<IAdsFilter>({
    statuses: [],
    categories: [],
    priceRange: [0, 100000],
    search: ''
  });
  const [sortType, setSortType] = useState<SortType>('createdAt-desc');

  const [ads, setAds] = useState<GetAdsResponse['ads']>([]);
  const [pagination, setPagination] = useState<
    GetAdsResponse['pagination'] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAds = async () => {
    setLoading(true);
    setError(null);
    try {
      const [sortBy, sortOrder] = sortType.split('-') as [
        GetAdsParams['sortBy'],
        GetAdsParams['sortOrder']
      ];
      const params: GetAdsParams = {
        page,
        limit: PAGE_SIZE,
        status: filter.statuses.length > 0 ? filter.statuses : undefined,
        categoryId:
          filter.categories.length === 1
            ? Number(filter.categories[0])
            : undefined,
        minPrice: filter.priceRange[0],
        maxPrice: filter.priceRange[1],
        search: filter.search || undefined,
        sortBy,
        sortOrder
      };

      const response = await adsApi.getAds(params);
      setAds(response.ads);
      setPagination(response.pagination);
    } catch (err) {
      setError('Ошибка загрузки объявлений');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAds();
  }, [page, filter, sortType]);

  const searchInputRef = useRef<InputRef>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) {
        return;
      }
      if (e.key === '/') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
      priceRange: [0, 100000],
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
          minPrice={pagination ? 0 : 0}
          maxPrice={pagination ? 100000 : 100000}
          onReset={handleReset}
          searchInputRef={searchInputRef}
        />
      </div>
      <div className={styles['list-page__cards']}>
        {loading && <div>Загрузка...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && ads.length === 0 && (
          <div>Объявления не найдены</div>
        )}
        {!loading &&
          !error &&
          ads.map((ad) => (
            <AdCard
              key={ad.id}
              ad={ad}
            />
          ))}
      </div>
      <div className={styles['list-page__pagination']}>
        <Pagination
          current={page}
          pageSize={PAGE_SIZE}
          total={pagination ? pagination.totalItems : 0}
          showSizeChanger={false}
          onChange={setPage}
        />
        <div className={styles['list-page__note']}>
          Показано {ads.length} из {pagination ? pagination.totalItems : 0}{' '}
          объявлений
        </div>
      </div>
    </div>
  );
}
