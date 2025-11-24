# Модератор объявлений Avito

Веб-приложение для модерации объявлений с административной панелью.

### Технологии
- React 18
- TypeScript
- Vite
- Ant Design
- Recharts
- Axios
- React Router
- SCSS Modules

### Требования

- **Docker Desktop** (или Docker + Docker Compose)
- Альтернативно: Node.js 20+ (для запуска без Docker)

---

## Быстрый старт с Docker (рекомендуется)

### 1. Клонируйте репозиторий

```
git clone <your-repo-url>
cd <project-name>
```

### 2. Запустите проект

```
docker-compose up --build
```

### 3. Откройте в браузере

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3001](http://localhost:3001)

### Остановка

```
# Ctrl+C в терминале, затем:
docker-compose down
```

---

## Запуск без Docker

### Frontend

```
cd frontend
npm install
npm run dev
```

Откройте [http://localhost:5173](http://localhost:5173)

### Backend

```
cd backend
npm install
node server.js
```

API доступно на [http://localhost:3001](http://localhost:3001)

---

## Структура проекта

```
project-root/
├── frontend/               # React приложение
│   ├── src/
│   │   ├── app/           # Конфигурация приложения
│   │   ├── pages/         # Страницы
│   │   ├── widgets/       # Виджеты
│   │   ├── features/      # Фичи
│   │   ├── entities/      # Сущности
│   │   └── shared/        # Общие компоненты
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
├── backend/               # Express сервер
│   ├── server.js
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml     # Конфигурация Docker Compose
└── README.md
```

*Проект использует архитектуру **Feature-Sliced Design (FSD)*** дл frontend-части

---

## Основные возможности

### Страница списка объявлений (`/list`)
- Фильтрация по статусу, категории, цене
- Полнотекстовый поиск
- Сортировка (по дате, цене)
- Пагинация
- Горячая клавиша `/` для фокуса на поиске

### Страница детального просмотра (`/item/:id`)
- Галерея изображений с предпросмотром 
- Полная информация об объявлении и продавце
- История модерации
- Действия модератора (одобрить/отклонить/вернуть на доработку)
- Навигация между объявлениями
- **Горячие клавиши:**
  - `A` — одобрить объявление
  - `D` — отклонить объявление
  - `←` — предыдущее объявление
  - `→` — следующее объявление

### Страница статистики (`/stats`)
- Метрики модерации (за день/неделю/месяц)
- Графики активности по дням
- Круговая диаграмма распределения решений
- Статистика по категориям

### Дополнительные возможности
- **Темная/светлая тема** (кнопка справа снизу)
- **Адаптивный дизайн** (мобильные, планшеты, десктоп)
- **TypeScript** для типобезопасности
- Централизованная обработка ошибок (axios interceptor)
- Динамическая загрузка категорий

## Полезные команды Docker

```
# Запуск с пересборкой
docker-compose up --build

# Запуск в фоновом режиме
docker-compose up -d

# Остановка
docker-compose down

# Просмотр логов
docker-compose logs

# Логи конкретного сервиса
docker-compose logs frontend
docker-compose logs backend

# Логи в реальном времени
docker-compose logs -f

# Пересборка без кэша
docker-compose build --no-cache

# Остановка с удалением volumes
docker-compose down -v
```


## Автор
**Бренева Вероника** | brenevaveronika@gmail.com | tg: @nikaginger

Тестовое задание для стажировки в Avito

---
**Статус проекта:** Готов к запуску