import { useCallback, useEffect, useState } from 'react';
import type { Cat } from '../types/cat.ts';
import { fetchCats } from '../api/api.ts';

export const useCats = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMoreCats = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const newCats = await fetchCats(15, page);

      setCats((prev) => {
        const uniqueNewCats = newCats.filter(
          (newCat) => !prev.some((existingCat) => existingCat.id === newCat.id),
        );
        return [...prev, ...uniqueNewCats];
      });

      setPage((prev) => prev + 1);
    } catch (error) {
      setError('Ошибка при загрузки котиков');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, page]);

  useEffect(() => {
    loadMoreCats();
  }, []);

  return { cats, isLoading, error, loadMoreCats };
};
