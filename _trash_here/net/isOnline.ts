// core/net/isOnline.ts
export function isOnline(): boolean {
  if (typeof navigator === 'undefined') return false;
  return navigator.onLine;
}
