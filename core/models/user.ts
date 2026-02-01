import { ID } from '@/core/ids/id';


export type ThemePreference =
  | 'system'
  | 'light'
  | 'dark'
  | 'bw'; // black & white default (Scandi 👌)

export interface User {
  id: ID;

  handle: string;
  displayName?: string;
  avatarUrl?: string;
  pinHash?: string;


  /** Preferences */
  theme?: ThemePreference;
  mode: 'private' | 'social';

  /** UI language */
  uiLanguage?: string; // 'en', 'da', 'sv'

  /** Reading language(s) */
  readingLanguages?: string[]; // ['en', 'da']

  defaultShelfId: ID;
    isSynced:boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}

//document.documentElement.dataset.theme = user.theme;

