import { useEffect, useRef, useCallback } from 'react';

type UseInfiniteScrollOptions = {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
};

export const useInfiniteScroll = (
    callback: () => void,
    options?: UseInfiniteScrollOptions
) => {
    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement | null>(null);

    const setLastElement = useCallback(
        (node: HTMLDivElement | null) => {
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        callback();
                    }
                },
                {
                    root: options?.root || null,
                    rootMargin: options?.rootMargin || '0px',
                    threshold: options?.threshold || 0,
                }
            );

            if (node) {
                observer.current.observe(node);
                lastElementRef.current = node;
            }
        },
        [callback, options]
    );

    useEffect(() => {
        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, []);

    return [setLastElement];
};
