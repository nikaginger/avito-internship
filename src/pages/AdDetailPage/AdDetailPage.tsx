import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  Descriptions,
  Image,
  Input,
  Modal,
  Radio,
  Space,
  Spin,
  Timeline
} from 'antd';
import {
  ArrowLeftOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import { adsApi } from '@/entitites/ad/api/adsApi';
import type { Ad } from '@/entitites/ad/model/types';
import styles from './AdDetailPage.module.scss';

const REJECTION_REASONS = [
  'Запрещенный товар',
  'Неверная категория',
  'Некорректное описание',
  'Проблемы с фото',
  'Подозрение на мошенничество',
  'Другое'
];

export function AdDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isRequestChangesModalOpen, setIsRequestChangesModalOpen] =
    useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchAd = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await adsApi.getAdById(Number(id));
        setAd(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Ошибка при загрузке объявления';
        setError(`Ошибка: ${message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (isRejectModalOpen || isRequestChangesModalOpen) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'a':
          e.preventDefault();
          handleApprove();
          break;
        case 'd':
          e.preventDefault();
          setIsRejectModalOpen(true);
          break;
        case 'arrowright':
          e.preventDefault();
          handleNext();
          break;
        case 'arrowleft':
          e.preventDefault();
          handlePrevious();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [ad, isRejectModalOpen, isRequestChangesModalOpen]);

  const handleApprove = async () => {
    if (!ad) return;
    try {
      await adsApi.approveAd(ad.id);
      alert('Объявление одобрено');
      navigate('/list');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Ошибка при одобрении';
      alert(`Ошибка: ${message}`);
    }
  };

  const handleReject = async () => {
    if (!ad || !selectedReason) return;
    try {
      await adsApi.rejectAd(ad.id, { reason: selectedReason, comment });
      alert('Объявление отклонено');
      setIsRejectModalOpen(false);
      navigate('/list');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Ошибка при отклонении';
      alert(`Ошибка: ${message}`);
    }
  };

  const handleRequestChanges = async () => {
    if (!ad || !selectedReason) return;
    try {
      await adsApi.requestAdChanges(ad.id, { reason: selectedReason, comment });
      alert('Запрос на изменения отправлен');
      setIsRequestChangesModalOpen(false);
      navigate('/list');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Ошибка при запросе изменений';
      alert(`Ошибка: ${message}`);
    }
  };

  const handlePrevious = () => {
    if (!ad) return;
    const prevId = ad.id - 1;
    if (prevId > 0) {
      navigate(`/item/${prevId}`);
    }
  };

  const handleNext = () => {
    if (!ad) return;
    const nextId = ad.id + 1;
    navigate(`/item/${nextId}`);
  };

  if (loading) {
    return (
      <div className={styles['ad-detail__loading']}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        description={error}
        type="error"
        showIcon
      />
    );
  }

  if (!ad) {
    return (
      <Alert
        description="Объявление не найдено"
        type="warning"
        showIcon
      />
    );
  }

  return (
    <div className={styles['ad-detail']}>
      <h1 className={styles['ad-detail__title']}>{ad.title}</h1>

      <div className={styles['ad-detail__content']}>
        <div className={styles['ad-detail__top-row']}>
          <Card
            title="Изображения"
            className={styles['ad-detail__gallery-card']}
          >
            <Image.PreviewGroup>
              <Space
                size={16}
                wrap
              >
                {ad.images && ad.images.length > 0 ? (
                  ad.images.map((img, index) => (
                    <Image
                      key={index}
                      width={200}
                      height={200}
                      src={img}
                      alt={`Изображение ${index + 1}`}
                      className={styles['ad-detail__image']}
                    />
                  ))
                ) : (
                  <Image
                    width={200}
                    height={200}
                    src="https://loremflickr.com/1280/720"
                    alt="Заглушка"
                    className={styles['ad-detail__image']}
                  />
                )}
              </Space>
            </Image.PreviewGroup>
          </Card>

          {ad.moderationHistory && ad.moderationHistory.length > 0 && (
            <Card
              title="История модерации"
              className={styles['ad-detail__history-card']}
            >
              <Timeline
                items={ad.moderationHistory.map((item) => ({
                  color: item.action === 'approved' ? 'green' : 'red',
                  content: (
                    <>
                      <p>
                        <strong>{item.moderatorName}</strong> - {item.action}
                      </p>
                      <p>{new Date(item.timestamp).toLocaleString()}</p>
                      {item.reason && <p>Причина: {item.reason}</p>}
                      {item.comment && <p>Комментарий: {item.comment}</p>}
                    </>
                  )
                }))}
              />
            </Card>
          )}
        </div>

        <Card className={styles['ad-detail__card']}>
          <Descriptions
            column={1}
            bordered
          >
            <Descriptions.Item label="Цена">
              {ad.price.toLocaleString()} ₽
            </Descriptions.Item>
            <Descriptions.Item label="Категория">
              {ad.category}
            </Descriptions.Item>
            <Descriptions.Item label="Статус">{ad.status}</Descriptions.Item>
            <Descriptions.Item label="Приоритет">
              {ad.priority}
            </Descriptions.Item>
            <Descriptions.Item label="Создано">
              {new Date(ad.createdAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Обновлено">
              {new Date(ad.updatedAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>

          <div className={styles['ad-detail__section']}>
            <h3>Описание</h3>
            <p>{ad.description}</p>
          </div>

          {ad.characteristics && Object.keys(ad.characteristics).length > 0 && (
            <div className={styles['ad-detail__section']}>
              <h3>Характеристики</h3>
              <Descriptions
                column={1}
                bordered
              >
                {Object.entries(ad.characteristics).map(([key, value]) => (
                  <Descriptions.Item
                    key={key}
                    label={key}
                  >
                    {value}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </div>
          )}
        </Card>

        <Card
          title="Информация о продавце"
          className={styles['ad-detail__card']}
        >
          <Descriptions column={1}>
            <Descriptions.Item label="Имя">{ad.seller.name}</Descriptions.Item>
            <Descriptions.Item label="Рейтинг">
              {ad.seller.rating}
            </Descriptions.Item>
            <Descriptions.Item label="Всего объявлений">
              {ad.seller.totalAds}
            </Descriptions.Item>
            <Descriptions.Item label="Дата регистрации">
              {new Date(ad.seller.registeredAt).toLocaleDateString()}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card
          title="Действия модератора"
          className={styles['ad-detail__card']}
        >
          <Space wrap>
            <Button
              type="primary"
              size="large"
              onClick={handleApprove}
            >
              Одобрить
            </Button>
            <Button
              danger
              size="large"
              onClick={() => setIsRejectModalOpen(true)}
            >
              Отклонить
            </Button>
            <Button
              size="large"
              className={styles['ad-detail__button-warning']}
              onClick={() => setIsRequestChangesModalOpen(true)}
            >
              Вернуть на доработку
            </Button>
          </Space>
        </Card>

        <div className={styles['ad-detail__actions']}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/list')}
          >
            Назад к списку
          </Button>
          <div className={styles['ad-detail__navigation']}>
            <Button
              icon={<LeftOutlined />}
              onClick={handlePrevious}
              disabled={ad.id <= 1}
            >
              Предыдущее
            </Button>
            <Button
              icon={<RightOutlined />}
              onClick={handleNext}
            >
              Следующее
            </Button>
          </div>
        </div>
      </div>
      <Modal
        title="Отклонить объявление"
        open={isRejectModalOpen}
        onOk={handleReject}
        onCancel={() => setIsRejectModalOpen(false)}
        okText="Отклонить"
        cancelText="Отмена"
        okButtonProps={{ danger: true, disabled: !selectedReason }}
      >
        <Radio.Group
          onChange={(e) => setSelectedReason(e.target.value)}
          value={selectedReason}
          className={styles['ad-detail__radio-group']}
        >
          {REJECTION_REASONS.map((reason) => (
            <Radio
              key={reason}
              value={reason}
            >
              {reason}
            </Radio>
          ))}
        </Radio.Group>
        <Input.TextArea
          placeholder="Дополнительный комментарий"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className={styles['ad-detail__textarea']}
        />
      </Modal>

      <Modal
        title="Запросить изменения"
        open={isRequestChangesModalOpen}
        onOk={handleRequestChanges}
        onCancel={() => setIsRequestChangesModalOpen(false)}
        okText="Отправить"
        cancelText="Отмена"
        okButtonProps={{ disabled: !selectedReason }}
      >
        <Radio.Group
          onChange={(e) => setSelectedReason(e.target.value)}
          value={selectedReason}
          className={styles['ad-detail__radio-group']}
        >
          {REJECTION_REASONS.map((reason) => (
            <Radio
              key={reason}
              value={reason}
            >
              {reason}
            </Radio>
          ))}
        </Radio.Group>
        <Input.TextArea
          placeholder="Дополнительный комментарий"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className={styles['ad-detail__textarea']}
        />
      </Modal>
    </div>
  );
}
