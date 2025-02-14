import { useMemo } from "react";
import { collections } from "@/data/collections";
import { Mural } from "@/interfaces";

export const useSearchMurals = (query?: string): Array<Mural> => {
    const murals: Mural[] = useMemo(() => 
        collections.flatMap(collection => collection.murales), []
    );

    const results = useMemo(() => {
        if (!query || query.trim().length < 2) return [];
        const searchWords = query.toLowerCase().trim().split(/\s+/);
        const filteredResults = murals.filter(mural =>
            searchWords.every(word =>
                mural.title.toLowerCase().includes(word) ||
                mural.collectionTitle.toLowerCase().includes(word) ||
                mural.keywords.some(keyword => keyword.toLowerCase().includes(word))
            )
        );
        return filteredResults;
    }, [query, murals]);

    return results;
};