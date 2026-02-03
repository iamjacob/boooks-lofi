import { ThemePreference } from '@/core/models/user';

export function applyTheme(theme?: ThemePreference) {
  const root = document.documentElement;

  if (!theme || theme === 'system') {
    root.removeAttribute('data-theme');
    return;
  }

  root.setAttribute('data-theme', theme);
}
