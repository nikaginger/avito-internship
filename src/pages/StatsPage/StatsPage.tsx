import { useEffect, useState } from 'react';
import { Alert, Card, Col, Row, Spin, Statistic } from 'antd';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { statsApi } from '@/entitites/stats/api/statsApi.ts';
import type {
  ActivityData,
  CategoriesData,
  DecisionsData,
  StatsSummary
} from '@/entitites/stats/model/types.ts';
import styles from './StatsPage.module.scss';

const COLORS = ['#52c41a', '#ff4d4f', '#faad14'];

export function StatsPage() {
  const [summary, setSummary] = useState<StatsSummary | null>(null);
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [decisionsData, setDecisionsData] = useState<DecisionsData | null>(
    null
  );
  const [categoriesData, setCategoriesData] = useState<CategoriesData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const [summaryRes, activityRes, decisionsRes, categoriesRes] =
          await Promise.all([
            statsApi.getSummary(),
            statsApi.getActivityChart(),
            statsApi.getDecisionsChart(),
            statsApi.getCategoriesChart()
          ]);

        setSummary(summaryRes);
        setActivityData(activityRes);
        setDecisionsData(decisionsRes);
        setCategoriesData(categoriesRes);
      } catch (err) {
        console.error('Ошибка загрузки статистики:', err);
        setError('Ошибка загрузки статистики');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className={styles['stats-page__loading']}>
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

  if (!summary || !decisionsData || !categoriesData) {
    return (
      <Alert
        description="Данные не найдены"
        type="warning"
        showIcon
      />
    );
  }

  const pieData = [
    { name: 'Одобрено', value: decisionsData.approved },
    { name: 'Отклонено', value: decisionsData.rejected },
    { name: 'На доработку', value: decisionsData.requestChanges }
  ];

  const categoriesChartData = Object.entries(categoriesData).map(
    ([name, value]) => ({
      name,
      value
    })
  );

  return (
    <div className={styles['stats-page']}>
      <h1 className={styles['stats-page__title']}>Статистика модератора</h1>
      <Row
        gutter={[16, 16]}
        className={styles['stats-page__metrics']}
      >
        <Col
          xs={24}
          sm={12}
          lg={6}
        >
          <Card>
            <Statistic
              title="Проверено сегодня"
              value={summary.totalReviewedToday}
              suffix="шт."
            />
          </Card>
        </Col>
        <Col
          xs={24}
          sm={12}
          lg={6}
        >
          <Card>
            <Statistic
              title="Проверено за неделю"
              value={summary.totalReviewedThisWeek}
              suffix="шт."
            />
          </Card>
        </Col>
        <Col
          xs={24}
          sm={12}
          lg={6}
        >
          <Card>
            <Statistic
              title="Проверено за месяц"
              value={summary.totalReviewedThisMonth}
              suffix="шт."
            />
          </Card>
        </Col>
        <Col
          xs={24}
          sm={12}
          lg={6}
        >
          <Card>
            <Statistic
              title="Среднее время проверки"
              value={summary.averageReviewTime}
              suffix="сек."
            />
          </Card>
        </Col>
      </Row>

      <Row
        gutter={[16, 16]}
        className={styles['stats-page__percentages']}
      >
        <Col
          xs={24}
          sm={8}
        >
          <Card>
            <Statistic
              title="Одобрено"
              value={summary.approvedPercentage}
              precision={1}
              suffix="%"
              className={styles['stats-page__statistic-approved']}
            />
          </Card>
        </Col>
        <Col
          xs={24}
          sm={8}
        >
          <Card>
            <Statistic
              title="Отклонено"
              value={summary.rejectedPercentage}
              precision={1}
              suffix="%"
              className={styles['stats-page__statistic-rejected']}
            />
          </Card>
        </Col>
        <Col
          xs={24}
          sm={8}
        >
          <Card>
            <Statistic
              title="На доработку"
              value={summary.requestChangesPercentage}
              precision={1}
              suffix="%"
              className={styles['stats-page__statistic-warning']}
            />
          </Card>
        </Col>
      </Row>
      <Row
        gutter={[16, 16]}
        className={styles['stats-page__charts']}
      >
        <Col
          xs={24}
          lg={12}
        >
          <Card title="Активность по дням">
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="approved"
                  fill="#52c41a"
                  name="Одобрено"
                />
                <Bar
                  dataKey="rejected"
                  fill="#ff4d4f"
                  name="Отклонено"
                />
                <Bar
                  dataKey="requestChanges"
                  fill="#faad14"
                  name="На доработку"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col
          xs={24}
          lg={12}
        >
          <Card title="Распределение решений">
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24}>
          <Card title="Проверено по категориям">
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart data={categoriesChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#1890ff"
                  name="Количество"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
