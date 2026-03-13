import { useState, useEffect } from 'react';

export function useLiveUserCount(start = 1000) {
  const [count, setCount] = useState(start);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return count;
}
