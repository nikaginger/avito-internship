import type { InputRef } from 'antd';
import { Button, Checkbox, Input, Select, Slider } from 'antd';
import styles from './AdsFilter.module.scss';
import type {
  IAdsFilter,
  SortType
} from '@features/ads-filters/model/types.ts';
import type { AdStatus } from '@/entitites/ad/model/types.ts';
import type { RefObject } from 'react';

export interface AdsFilterProps {
  filter: IAdsFilter;
  onFilterChange: (nextFilter: IAdsFilter) => void;
  sortType: SortType;
  onSortTypeChange: (nextSort: SortType) => void;
  minPrice: number;
  maxPrice: number;
  onReset: () => void;
  searchInputRef?: RefObject<InputRef | null>;
}

const statusOptions = [
  { label: 'На модерации', value: 'pending' },
  { label: 'Одобрено', value: 'approved' },
  { label: 'Отклонено', value: 'rejected' }
];

const categoryOptions = [
  { label: 'Электроника', value: 'Электроника' },
  { label: 'Мода', value: 'Мода' },
  { label: 'Детское', value: 'Детское' },
  { label: 'Работа', value: 'Работа' },
  { label: 'Транспорт', value: 'Транспорт' },
  { label: 'Услуги', value: 'Услуги' },
  { label: 'Недвижимость', value: 'Недвижимость' }
];

export function AdsFilter({
  filter,
  onFilterChange,
  sortType,
  onSortTypeChange,
  minPrice,
  maxPrice,
  onReset,
  searchInputRef
}: AdsFilterProps) {
  const handleFilterChange = <K extends keyof IAdsFilter>(
    key: K,
    value: IAdsFilter[K]
  ) => {
    onFilterChange({
      ...filter,
      [key]: value
    });
  };

  return (
    <div className={styles['ads-filter']}>
      <div className={styles['ads-filter__group']}>
        <Input
          ref={searchInputRef}
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
          onChange={onSortTypeChange}
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
