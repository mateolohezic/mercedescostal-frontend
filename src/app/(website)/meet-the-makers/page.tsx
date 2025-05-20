import { Metadata } from "next";
import Image from "next/image";
import { MeetTheMakersVideo } from "@/components";
import portada from "@/assets/meet-the-makers/portada.webp";
import meet_the_makers_1 from "@/assets/meet-the-makers/meet_the_makers_1.webp";
import meet_the_makers_2 from "@/assets/meet-the-makers/meet_the_makers_2.webp";
import meet_the_makers_3 from "@/assets/meet-the-makers/meet_the_makers_3.webp";
import meet_the_makers_4 from "@/assets/meet-the-makers/meet_the_makers_4.webp";
import meet_the_makers_5 from "@/assets/meet-the-makers/meet_the_makers_5.webp";

export const metadata: Metadata = {
    title: 'Meet The Makers',
    description: "Meet The Makers Mercedes Costal.",
    keywords: ['diseño', 'Mercedes Costal'],
    openGraph: {
        title: 'Meet The Makers | Mercedes Costal',
        description: 'Mercedes Costal.',
        url: 'https://mercedescostal.com.ar/mc-universe/meet-the-makers',
        siteName: 'Mercedes Costal',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://mercedescostal.com.ar/mc-universe/meet-the-makers',
        creator: 'Mercedes Costal',
        title: 'Meet The Makers | Mercedes Costal',
        description: 'Mercedes Costal.',
    },
};

export default function MeetTheMakersPage() {
    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col gap-8">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Meet the <b className="font-semibold">Makers</b>
                </h1>
            </section>
            <section className="w-full px-4 xl:px-12 flex flex-col gap-8">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Meet the makers
                </h1>
                <Image src={portada} priority alt="Portada Meet the makers Mercedes Costal" className="w-full aspect-video object-cover"/>
            </section>
                    {/* <p className="w-full text-center text-2xl">&ldquo;Creemos en el diseño<span className="block"></span> como un estilo de vida,<span className="block"></span> más que como una moda o<span className="block"></span> un objeto aislado.&rdquo;</p> */}
            <section className="mt-24 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col items-center gap-24">
                <Image src={meet_the_makers_1} alt="Meet the Makers Mercedes Costal" className="w-full max-w-md object-contain grayscale"/>
                <p className="w-full max-w-4xl text-center lg:text-xl">En MERCEDES COSTAL logramos conectar a las personas con el mundo del diseño, el arte y la historia a través de la creación, producción y venta de wallpapers para generar una experiencia inmersiva en el observador.</p>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-xl flex flex-col justify-center items-center px-4 xl:px-0">
                <MeetTheMakersVideo/>
            </section>
            <section className="my-24 lg:my-64 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-start gap-8 lg:gap-4">
                <div className="grow max-w-2xl lg:text-xl flex flex-col justify-center items-center gap-8">
                    <p>&ldquo;Es un Estudio creativo conformado por un equipo de 15 personas entre ilustradores, arquitectos y diseñadores.</p>
                    <p>El equipo crea las ilustraciones con diferentes técnicas manuales y digitales que posteriormente son estampadas sobre sustrato papel para producir los wallpapers que se comercializan a través de medios digitales y puntos de venta en Argentina, Chile y Uruguay, y ventas a nivel global.</p>
                    <p>Trabajamos conjuntamente desde las diferentes áreas del diseño, para lograr, a través de nuestros empapelados y murales, un equilibrio entre el arte y el interiorismo, generando con ellos, espacios, donde los colores, las texturas, y las formas se transforman en los protagonistas de los ambientes.&rdquo;</p>
                </div>
                <Image src={meet_the_makers_2} alt="Meet the Makers Mercedes Costal" className="w-full max-w-md object-cover"/>
            </section>
            <section className="w-full max-w-5xl 2xl:max-w-7xl grid grid-cols-2 gap-4 px-4 xl:px-0">
                <Image src={meet_the_makers_3} alt="Meet the Makers Mercedes Costal" className="w-full h-auto object-contain col-span-2"/>
                <Image src={meet_the_makers_4} alt="Meet the Makers Mercedes Costal" className="w-full object-contain"/>
                <Image src={meet_the_makers_5} alt="Meet the Makers Mercedes Costal" className="w-full object-contain"/>
            </section>
        </main>
    );
}