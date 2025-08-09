import { useMemo } from 'react';

export function useInitials(name?: string) {
  return useMemo(() => {
    if (!name) return '';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }, [name]);
}