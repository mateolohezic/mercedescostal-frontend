import { Metadata } from "next";
import { WorkWithUsForm } from "@/components";

export const metadata: Metadata = {
    title: 'Contacto',
    description: "Mercedes Costal.",
    keywords: ['diseño', 'Mercedes Costal'],
    openGraph: {
        title: 'Contacto | Mercedes Costal',
        description: 'Mercedes Costal.',
        url: 'https://mercedescostal.com.ar/contact',
        siteName: 'Mercedes Costal',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://mercedescostal.com.ar/contact',
        creator: 'Mercedes Costal',
        title: 'Contacto | Mercedes Costal',
        description: 'Mercedes Costal.',
    },
};

export default function SellMCPage() {

    return (
        <main className="my-24 lg:my-32 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Trabaja con <b className="block font-semibold">nosotros</b>
                </h1>
                <div className="w-full max-w-2xl lg:text-xl">
                    <p>En Mercedes Costal buscamos personas apasionadas por el diseño y la decoración que quieran ser parte de nuestra red de revendedores.</p>
                    <p className="mt-8">Si te interesa comercializar nuestros murales y formar parte de una marca en expansión, completá el formulario con tus datos y contanos por qué querés sumarte. Estamos emocionados por descubrir nuevos talentos que compartan nuestra visión y ganas de llevar el arte a cada espacio.</p>
                </div>
            </section>
            <WorkWithUsForm/>
        </main>
    );
}