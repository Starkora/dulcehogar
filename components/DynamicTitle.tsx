'use client';

import { useEffect } from 'react';

export function DynamicTitle() {
  useEffect(() => {
    const originalTitle = document.title;
    const awayMessage = '🎂 ¡No te vayas! - Dulce Hogar';

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = awayMessage;
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
}
