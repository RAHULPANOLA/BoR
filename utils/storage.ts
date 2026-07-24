// SSR-safe localStorage helpers
export const isBrowser = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export function getLocal<T = any>(key: string, fallback: T | null = null): T | null {
  if (!isBrowser()) return fallback;
  try {
    const v = window.localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch (e) {
    console.error('getLocal failed', e);
    return fallback;
  }
}

export function setLocal<T = any>(key: string, value: T) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('setLocal failed', e);
  }
}

export function removeLocal(key: string) {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    console.error('removeLocal failed', e);
  }
}

export default { isBrowser, getLocal, setLocal, removeLocal };
