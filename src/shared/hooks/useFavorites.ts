import { useState, useEffect } from 'react';
import type { Cat } from '../types/cat';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Cat[]>(() => {
    const saved = localStorage.getItem('favorite_cats');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorite_cats', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (cat: Cat) => {
    setFavorites((prev) => {
      const isFav = prev.some((f) => f.id === cat.id);
      return isFav ? prev.filter((f) => f.id !== cat.id) : [...prev, cat];
    });
  };

  const isFavorite = (catId: string) => favorites.some((f) => f.id === catId);

  return { favorites, toggleFavorite, isFavorite };
};
