import type { StaticImageData } from "next/image";
import { ListCardCollectionStudio } from './ListCardCollectionStudio';

interface Collection {
    img: StaticImageData;
    title: string;
    year: string;
}

interface Props {
    collections: Array<Collection>
}

export const ListCollectionStudio = ({ collections }: Props) => {

    return (
        <div className="mt-12 w-full px-4 flex flex-col justify-center items-center gap-1 relative">
            {collections.map((collection, i) => (
                <ListCardCollectionStudio collection={collection} i={i} key={i}/>
            ))}
            {collections.map((collection, i) => (
                <ListCardCollectionStudio collection={collection} i={i} key={i}/>
            ))}
            {collections.map((collection, i) => (
                <ListCardCollectionStudio collection={collection} i={i} key={i}/>
            ))}
            {collections.map((collection, i) => (
                <ListCardCollectionStudio collection={collection} i={i} key={i}/>
            ))}
            {collections.map((collection, i) => (
                <ListCardCollectionStudio collection={collection} i={i} key={i}/>
            ))}
            {collections.map((collection, i) => (
                <ListCardCollectionStudio collection={collection} i={i} key={i}/>
            ))}
        </div>
    );
};
