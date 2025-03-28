import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface CardProps {
    href: string;
    title: string;
    image: StaticImageData|string;
}

export const Card = ({ href, title, image }: CardProps) => {
    return (
        <Link 
            href={href} 
            className="w-full flex flex-col justify-center items-center gap-4 transition-transform group"
        >
            <div className="w-full grow flex justify-center items-center group-hover:scale-110 transition-150">
                <Image 
                    src={image} 
                    alt={title} 
                    width={128} 
                    height={128} 
                    className="w-32 aspect-square object-contain"
                />
            </div>
            <h3 className="font-gillsans text-xl tracking-[0.5rem] uppercase text-center">
                {title}
            </h3>
        </Link>
    );
};