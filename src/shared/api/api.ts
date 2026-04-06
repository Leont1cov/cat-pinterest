import type { Cat } from '../types/cat.ts';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.thecatapi.com/v1';

export const fetchCats = async (limit: number = 20, page: number = 1): Promise<Cat[]> => {
  const response = await fetch(`${BASE_URL}/images/search?limit=${limit}&page=${page}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  });

  if (!response.ok) throw new Error('Ошибка при загрузки котиков');

  return response.json();
};
