import { useMemo } from "react";
import { collections } from "@/data/collections";

export const useMuralsCategories = () => {
    return useMemo(() => {
        const categories = new Set<string>();
        collections.forEach(collection => {
            collection.murales.forEach(mural => {
                mural.keywords.forEach(keyword => {
                    categories.add(keyword);
                });
            });
        });
        return Array.from(categories);
    }, []);
};