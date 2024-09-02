'use client'

import type { StaticImageData } from "next/image";
import { GridCardCollectionStudio } from "./GridCardCollectionStudio";

interface Collection {
    img: StaticImageData;
    title: string;
    year: string;
}

interface Props {
    collections: Array<Collection>
}

export const GridCollectionStudio = ({ collections }: Props) => {

    return (
        <div className="mt-12 w-full grow px-8 grid grid-cols-4 justify-start items-start gap-x-24 gap-y-2 overflow-hidden relative">
            {
                collections.map((collection:Collection, i: number) => (
                    <GridCardCollectionStudio collection={collection} i={i} key={i}/>
                ))
            }
        </div>
    );
};