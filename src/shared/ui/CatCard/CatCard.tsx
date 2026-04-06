import type { Cat } from '../../types/cat';
import { HeartIcon } from './HeartIcon'; // Путь проверь сам
import styles from './CatCard.module.css';

interface CatCardProps {
    cat: Cat;
    isFavorite: boolean;
    onToggleFavorite: (cat: Cat) => void;
}

export const CatCard = ({ cat, isFavorite, onToggleFavorite }: CatCardProps) => {
    return (
        <div className={styles.card}>
            <img src={cat.url} alt="Котик" className={styles.image} />

            <div className={styles.overlay}>
                <button
                    className={styles.heartButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(cat);
                    }}
                >
                    <HeartIcon isFavorite={isFavorite} />
                </button>
            </div>
        </div>
    );
};
