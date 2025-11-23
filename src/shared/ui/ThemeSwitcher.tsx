import { FloatButton } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { useThemeContext } from '@shared/contexts/useThemeContext.ts';

export function ThemeSwitcher() {
  const { themeMode, toggleTheme } = useThemeContext();

  return (
    <FloatButton
      icon={themeMode === 'dark' ? <BulbFilled /> : <BulbOutlined />}
      onClick={toggleTheme}
      tooltip={themeMode === 'dark' ? 'Светлая тема' : 'Темная тема'}
    />
  );
}
