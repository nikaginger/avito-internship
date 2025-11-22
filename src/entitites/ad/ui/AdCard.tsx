import React from 'react';
import { Badge, Card, Tag } from 'antd';
import styles from './AdCard.module.scss';
import type { Ad } from '@/entitites/ad/model/types.ts';

interface AdCardProps {
  ad: Ad;
}

export const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  return (
    <Card
      hoverable
      className={styles.card}
      cover={
        <img
          alt={ad.title}
          src={ad.imageUrl || 'https://loremflickr.com/1280/720'}
          className={styles.image}
        />
      }
      actions={[<span key="open-action">Открыть</span>]}
    >
      <div className={styles.header}>
        <span className={styles.title}>{ad.title}</span>
        {ad.priority === 'urgent' && (
          <Badge
            color="red"
            text="Срочно"
            className={styles.badge}
          />
        )}
      </div>
      <div className={styles.price}>{ad.price.toLocaleString()} ₽</div>
      <div className={styles.meta}>
        <Tag color="blue">{ad.category}</Tag>
        <span className={styles.date}>
          {new Date(ad.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className={styles.status}>
        <Tag
          color={
            ad.status === 'approved'
              ? 'green'
              : ad.status === 'rejected'
                ? 'red'
                : 'orange'
          }
        >
          {
            {
              approved: 'Одобрено',
              rejected: 'Отклонено',
              pending: 'На модерации'
            }[ad.status]
          }
        </Tag>
      </div>
    </Card>
  );
};
