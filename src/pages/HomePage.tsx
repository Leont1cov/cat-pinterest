import { useState, useEffect } from 'react';
import { useCats } from "../shared/hooks/useCats.ts";
import { useInfiniteScroll } from "../shared/hooks/useInfiniteScroll.ts";
import { Header } from "../shared/ui/Header/Header.tsx";
import { CatList } from "../shared/ui/CatGallery/CatGallery.tsx";
import { CatCard } from "../shared/ui/CatCard/CatCard.tsx";
import type { Cat } from "../shared/types/cat.ts";

export const HomePage = () => {
    const { cats, isLoading, loadMoreCats } = useCats();
    const [activeTab, setActiveTab] = useState<'all' | 'fav'>('all');

    const [favorites, setFavorites] = useState<Cat[]>(() => {
        const saved = localStorage.getItem('favorite_cats');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorite_cats', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (cat: Cat) => {
        setFavorites((prev) => {
            const isFav = prev.some(f => f.id === cat.id);
            if (isFav) return prev.filter(f => f.id !== cat.id);
            return [...prev, cat];
        });
    };

    const observerRef = useInfiniteScroll({
        isLoading,
        onLoadMore: () => {
            if (activeTab === 'all') loadMoreCats();
        }
    });

    const displayedCats = activeTab === 'all' ? cats : favorites;

    return (
        <>
            <Header activeTab={activeTab} onTabChange={setActiveTab}/>
            <CatList
                cats={displayedCats}
                isLoading={activeTab === 'all' && isLoading}
                activeTab={activeTab}
                observerRef={observerRef}
            >
                {displayedCats.map((cat, index) => (
                    <CatCard
                        key={`${cat.id}-${index}`}
                        cat={cat}
                        isFavorite={favorites.some(f => f.id === cat.id)}
                        onToggleFavorite={toggleFavorite}
                    />
                ))}
            </CatList>
        </>
    );
};
