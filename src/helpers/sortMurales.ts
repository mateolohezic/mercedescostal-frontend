import { Mural } from "@/interfaces";

export function sortMurales(murales: Mural[]): Mural[] {
    return [...murales]
        .sort((a, b) => a.title.localeCompare(b.title))
        .sort((a, b) => {
            const isPatternA = a.keywords.some(k => ['patrón', 'patron', 'pattern'].includes(k.toLowerCase()));
            const isPatternB = b.keywords.some(k => ['patrón', 'patron', 'pattern'].includes(k.toLowerCase()));
            return Number(isPatternA) - Number(isPatternB);
        });
}