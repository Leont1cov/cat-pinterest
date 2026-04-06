import styles from './Header.module.css';

interface HeaderProps {
    activeTab: 'all' | 'fav';
    onTabChange: (tab: 'all' | 'fav') => void;
}

export const Header = ({ activeTab, onTabChange }: HeaderProps) => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <button
                        className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
                        onClick={() => onTabChange('all')}
                    >
                        Все котики
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'fav' ? styles.active : ''}`}
                        onClick={() => onTabChange('fav')}
                    >
                        Любимые котики
                    </button>
                </nav>
            </div>
        </header>
    );
};
