import { OnlineAdapter } from '@/core/net/onlineAdapter';

export const webOnlineAdapter: OnlineAdapter = {
  isOnline() {
    if (typeof navigator === 'undefined') return false;
    return navigator.onLine;
  },

  subscribe(onChange) {
    const online = () => onChange(true);
    const offline = () => onChange(false);

    window.addEventListener('online', online);
    window.addEventListener('offline', offline);

    return () => {
      window.removeEventListener('online', online);
      window.removeEventListener('offline', offline);
    };
  },
};
