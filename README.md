# Cat Pinterest (Test Task)

## Ссылки

- Демо: скоро
- Репозиторий: https://github.com/Leont1cov/cat-pinterest

## Стек технологий

- React 18
- TypeScript
- Vite
- CSS Modules

## Инструкция по запуску

1. Клонировать репозиторий:
   ```bash
   git clone [url-репозитория]
   ```
2. Установить зависимости:
    ```bash
    npm install
   ```
   или
   ```bash
   yarn
   ```
3. Запустить режим разработки:
   ```bash
   npm run dev
   ```
   или
   ```bash
   yarn dev
   ```
4. Сборка проекта:
   ```bash
   npm run build
   ```
   или
   ```bash
   yarn build
   ```

## Реализованный функционал
- Бесконечная прокрутка (Intersection Observer API)
- Система «Избранного» с сохранением в LocalStorage
- Адаптивная верстка (мобильная и десктопная версии)
- Декомпозиция логики в кастомные хуки:
useCats
useFavorites
useInfiniteScroll