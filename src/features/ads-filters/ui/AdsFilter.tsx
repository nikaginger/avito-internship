import React from 'react';
import { Button, Checkbox, Input, Select, Slider } from 'antd';
import styles from './AdsFilter.module.scss';
import type { IAdsFilter } from '@features/ads-filters/model/types.ts';
import type { AdStatus } from '@/entitites/ad/model/types.ts';

export interface AdsFilterProps {
  filter: IAdsFilter;
  setFilter: React.Dispatch<React.SetStateAction<AdsFilterProps['filter']>>;
  sortType: string;
  setSortType: (value: string) => void;
  minPrice: number;
  maxPrice: number;
  onReset: () => void;
}

const statusOptions = [
  { label: 'На модерации', value: 'pending' },
  { label: 'Одобрено', value: 'approved' },
  { label: 'Отклонено', value: 'rejected' }
];

// TODO: Заменить на реальные категории из данных
const categoryOptions = [
  { label: 'Мебель', value: 'Мебель' },
  { label: 'Электроника', value: 'Электроника' }
];

export function AdsFilter({
  filter,
  setFilter,
  sortType,
  setSortType,
  minPrice,
  maxPrice,
  onReset
}: AdsFilterProps) {
  const handleFilterChange = <K extends keyof IAdsFilter>(
    key: K,
    value: IAdsFilter[K]
  ) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className={styles['ads-filter']}>
      <div className={styles['ads-filter__group']}>
        <Input
          className={styles['ads-filter__input']}
          value={filter.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          placeholder="Поиск по названию"
        />
        <Checkbox.Group
          className={styles['ads-filter__statuses']}
          options={statusOptions}
          value={filter.statuses}
          onChange={(val) => handleFilterChange('statuses', val as AdStatus[])}
        />
        <Select
          className={styles['ads-filter__select']}
          mode="multiple"
          allowClear
          options={categoryOptions}
          value={filter.categories}
          onChange={(val) => handleFilterChange('categories', val as string[])}
          placeholder="Категория"
        />
        <div className={styles['ads-filter__slider-wrap']}>
          <span className={styles['ads-filter__slider-label']}>
            {minPrice.toLocaleString()} ₽
          </span>
          <Slider
            className={styles['ads-filter__slider']}
            range
            min={minPrice}
            max={maxPrice}
            value={filter.priceRange}
            onChange={(val) =>
              handleFilterChange('priceRange', val as [number, number])
            }
          />
          <span className={styles['ads-filter__slider-label']}>
            {maxPrice.toLocaleString()} ₽
          </span>
        </div>
        <Button
          className={styles['ads-filter__reset']}
          onClick={onReset}
        >
          Сбросить
        </Button>
      </div>
      <div className={styles['ads-filter__sort-row']}>
        <Select
          className={styles['ads-filter__sort']}
          value={sortType}
          onChange={setSortType}
          options={[
            { value: 'createdAt-desc', label: 'Сначала новые' },
            { value: 'createdAt-asc', label: 'Сначала старые' },
            { value: 'price-desc', label: 'Сначала дороже' },
            { value: 'price-asc', label: 'Сначала дешевле' },
            { value: 'priority', label: 'По приоритету' }
          ]}
          placeholder="Сортировка"
        />
      </div>
    </div>
  );
}
