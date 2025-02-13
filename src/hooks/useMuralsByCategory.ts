import { useMemo } from "react";
import { collections } from "@/data/collections";
import { Mural } from "@/interfaces";

interface CategorizedMurals {
    [category: string]: Array<Mural>;
}

export const useMuralsByCategory = (category?: string) => {
    const categorizedMurals: CategorizedMurals = useMemo(() => {
        const categories: CategorizedMurals = {};

        collections.forEach(collection => {
            collection.murales.forEach(mural => {
                mural.keywords.forEach(keyword => {
                    if (!categories[keyword]) {
                        categories[keyword] = [];
                    }
                    categories[keyword].push(mural);
                });
            });
        });

        return categories;
    }, []);

    return category ? { [category]: categorizedMurals[category] || [] } : categorizedMurals;
};