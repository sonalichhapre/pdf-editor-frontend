export const API_BASE = import.meta.env.DEV
  ? (import.meta.env.VITE_API_URL || '/api')
  : (import.meta.env.VITE_API_URL || 'https://pdf-editor-backend-1.onrender.com');

export const FREE_DAILY_LIMIT = 999999; // Effectively unlimited (all free for now)

const COUNTER_KEY = 'doc_conversion_counter';

export function trackConversion() {
  try {
    const key = 'doc_conversions_' + new Date().toDateString();
    const count = parseInt(localStorage.getItem(key) || '0', 10);
    localStorage.setItem(key, String(count + 1));
    const total = parseInt(localStorage.getItem(COUNTER_KEY) || '1000', 10);
    localStorage.setItem(COUNTER_KEY, String(total + 1));
    window.dispatchEvent(new CustomEvent('conversion-complete'));
  } catch (_) {}
}

export function getTodayConversions() {
  try {
    const key = 'doc_conversions_' + new Date().toDateString();
    return parseInt(localStorage.getItem(key) || '0', 10);
  } catch (_) {
    return 0;
  }
}

export function canConvert() {
  return getTodayConversions() < FREE_DAILY_LIMIT;
}
