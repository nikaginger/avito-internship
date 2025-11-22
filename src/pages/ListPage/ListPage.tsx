import { mockAds } from '@shared/mocks/ads/mock.ts';
import { AdCard } from '@/entitites/ad/ui/AdCard.tsx';
import styles from './ListPage.module.scss';

export function ListPage() {
  return (
    <div className={styles['list-page']}>
      <h1 className={styles['list-page__title']}>Список объявлений</h1>
      <div className={styles['list-page__cards']}>
        {mockAds.map((ad) => (
          <AdCard
            key={ad.id}
            ad={ad}
          />
        ))}
      </div>
    </div>
  );
}
