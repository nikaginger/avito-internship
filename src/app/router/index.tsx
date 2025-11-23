import { Route, Routes } from 'react-router-dom';
import { ListPage } from '@pages/ListPage/ListPage.tsx';
import { AdDetailPage } from '@pages/AdDetailPage/AdDetailPage.tsx';

export const Router = () => {
  return (
    <Routes>
      <Route
        path="/list"
        element={<ListPage />}
      />
      <Route
        path="/item/:id"
        element={<AdDetailPage />}
      />
    </Routes>
  );
};
