import { Route, Routes } from 'react-router-dom';
import { ListPage } from '@pages/ListPage/ListPage.tsx';
import { AdDetailPage } from '@pages/AdDetailPage/AdDetailPage.tsx';
import { StatsPage } from '@pages/StatsPage/StatsPage.tsx';

export const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<ListPage />}
      />
      <Route
        path="/list"
        element={<ListPage />}
      />
      <Route
        path="/item/:id"
        element={<AdDetailPage />}
      />
      <Route
        path="/stats"
        element={<StatsPage />}
      />
    </Routes>
  );
};
