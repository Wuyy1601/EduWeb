// src/hooks/useFeaturedCards.js
import { useEffect, useState } from 'react';
import featuredCards from '@data/featuredCards';

export function useFeaturedCards() {
    const [data, setData] = useState([]);

    useEffect(() => {
        setTimeout(() => setData(featuredCards), 500);
    }, []);

    return data;
}
