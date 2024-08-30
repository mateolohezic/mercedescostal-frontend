import type { StaticImageData } from "next/image";

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
        <div className="mt-12 w-full px-4 grid grid-cols-6 justify-center items-center gap-24 relative">
            {
                collections.map(({ img, title, year }, i: number) => (
                    <div key={i} className="w-full flex flex-col justify-center items-center group">
                        <div className="w-full flex justify-start items-end">
                            <span className="mr-2">{i+1}.</span><h3 className="text-base opacity-0 group-hover:opacity-100">{title}, {year}</h3>
                        </div>
                        <img src={img.src} alt={title} className="w-full" />
                    </div>
                ))
            }
        </div>
    );
};