import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps {
  isLoading: boolean;
  onLoadMore: () => void;
}

export const useInfiniteScroll = ({ isLoading, onLoadMore }: UseInfiniteScrollProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 },
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isLoading, onLoadMore]);

  return observerRef;
};
