import { useMemo } from "react";
import { collections } from "@/data/collections";
import { Mural } from "@/interfaces";
import { useLocale } from "next-intl";

export const useSearchMurals = (query?: string): Array<Mural> => {
    const locale = useLocale();

    const murals: Mural[] = useMemo(() =>
        collections.flatMap(collection => collection.murales), []
    );

    const results = useMemo(() => {
        if (!query || query.trim().length < 2) return [];
        const normalize = (text: string) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        const searchWords = normalize(query).trim().split(/\s+/);
        const filteredResults = murals.filter(mural => {
            // Choose keywords based on locale
            const keywords = locale === 'es' ? mural.keywords : (mural.keywordsEn || mural.keywords);

            return searchWords.every(word =>
                normalize(mural.title).includes(word) ||
                normalize(mural.collectionTitle).includes(word) ||
                keywords.some(keyword => normalize(keyword).includes(word))
            );
        });

        return filteredResults;
    }, [query, murals, locale]);

    return results;
};