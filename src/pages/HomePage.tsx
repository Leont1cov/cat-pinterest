import { useState } from 'react';
import { useCats } from "../shared/hooks/useCats.ts";
import { useInfiniteScroll } from "../shared/hooks/useInfiniteScroll.ts";
import { Header } from "../shared/ui/Header/Header.tsx";
import { CatList } from "../shared/ui/CatGallery/CatGallery.tsx";
import { CatCard } from "../shared/ui/CatCard/CatCard.tsx";
import {useFavorites} from "../shared/hooks/useFavorites.ts";

export const HomePage = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'fav'>('all');

    const { cats, isLoading, loadMoreCats } = useCats();
    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    const observerRef = useInfiniteScroll({
        isLoading,
        onLoadMore: () => { if (activeTab === 'all') loadMoreCats(); }
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
                        isFavorite={isFavorite(cat.id)}
                        onToggleFavorite={toggleFavorite}
                    />
                ))}
            </CatList>
        </>
    );
};
