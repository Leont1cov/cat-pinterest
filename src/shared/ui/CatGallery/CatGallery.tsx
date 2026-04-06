import type { Cat } from '../../types/cat';
import styles from './CatGallery.module.css';
import type { ReactNode } from 'react';

interface CatListProps {
    cats: Cat[];
    isLoading: boolean;
    observerRef: React.RefObject<HTMLDivElement | null>;
    children: ReactNode;
}

export const CatList = ({ isLoading, observerRef, children }: CatListProps) => {
    return (
        <main className={styles.main}>
            <div className={styles.grid}>
                {children}
            </div>

            <div ref={observerRef} className={styles.loader}>
                {isLoading ? '... загружаем еще котиков ...' : 'Листай ниже'}
            </div>
        </main>
    );
};
