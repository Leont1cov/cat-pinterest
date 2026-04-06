import type { Cat } from '../../types/cat';
import styles from './CatGallery.module.css';
import type { ReactNode } from 'react';

interface CatListProps {
  cats: Cat[];
  isLoading: boolean;
  observerRef: React.RefObject<HTMLDivElement | null>;
  children: ReactNode;
  activeTab: 'all' | 'fav';
}

export const CatList = ({ cats, isLoading, observerRef, children, activeTab }: CatListProps) => {
  if (activeTab === 'fav' && cats.length === 0) {
    return (
      <main className={styles.main}>
        <div className={styles.loader}>Здесь пока ничего нет</div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.grid}>{children}</div>

      {activeTab === 'all' && (
        <div ref={observerRef} className={styles.loader}>
          {isLoading ? '... загружаем еще котиков ...' : 'Листай ниже'}
        </div>
      )}
    </main>
  );
};
