import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { Router } from '@app/router';
import { ThemeSwitcher } from '@shared/ui/ThemeSwitcher.tsx';

function App() {
  return (
    <BrowserRouter>
      <Router />
      <ThemeSwitcher />
    </BrowserRouter>
  );
}

export default App;
