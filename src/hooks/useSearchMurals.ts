import { useMemo } from "react";
import Fuse from "fuse.js";
import { collections } from "@/data/collections";
import { Mural } from "@/interfaces";

export const useSearchMurals = (query?: string): Array<Mural> => {
    const murals: Mural[] = useMemo(() => collections.flatMap(collection => collection.murales), []);

    const fuse = useMemo(() => new Fuse(murals, {
        keys: ["title", "collection", "keywords"],
        threshold: 0.3,
        ignoreLocation: true,
    }), [murals]);

    const results = useMemo(() => {
        if (!query || query.trim().length < 3) return [];
        return fuse.search(query).map(result => result.item);
    }, [query, fuse]);

    return results;
};