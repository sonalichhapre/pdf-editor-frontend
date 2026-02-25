import { useState, useCallback } from 'react';
import { canConvert, trackConversion } from '../utils/api';

export function useConverter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const triggerDownload = useCallback((blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }, []);

  const onSuccess = useCallback((blob, filename) => {
    trackConversion();
    triggerDownload(blob, filename);
  }, [triggerDownload]);

  return { loading, setLoading, error, setError, canConvert, onSuccess };
}
