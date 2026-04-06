import './App.css'
import {useCats} from "./shared/hooks/useCats.ts";
import {useEffect, useRef} from "react";

function App() {
    const { cats, isLoading, loadMoreCats } = useCats()
    const observerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isLoading) loadMoreCats();
        }, {threshold: 0.1})

        if (observerRef.current) observer.observe(observerRef.current)

        return () => observer.disconnect()
    }, [isLoading, loadMoreCats])

    return (
        <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Котики</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(225px, 1fr))',
                gap: '20px'
            }}>
                {cats.map((cat, index) => (
                    <div key={`${cat.id}-${index}`} style={{ background: '#eee', height: '225px' }}>
                        <img
                            src={cat.url}
                            alt="cat"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                ))}
            </div>

            <div ref={observerRef} style={{ padding: '40px', textAlign: 'center' }}>
                {isLoading ? 'Подгружаем котиков...' : 'Листай ниже'}
            </div>
        </main>
    )
}

export default App
