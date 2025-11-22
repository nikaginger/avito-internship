import { Route, Routes } from 'react-router-dom';
import { ListPage } from '@pages/ListPage/ListPage.tsx';

export const Router = () => {
  return (
    <Routes>
      <Route
        path="/list"
        element={<ListPage />}
      />
    </Routes>
  );
};
