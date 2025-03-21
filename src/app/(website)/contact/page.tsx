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

export default function ContactPage() {

    return (
        <main className="my-24 lg:my-40 w-full flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h1 className="w-fit font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Trabaja con <b className="block font-semibold">nosotros</b>
                </h1>
                <div className="w-full max-w-lg">
                    <p>En Mercedes Costal, estamos siempre en búsqueda de talentos apasionados y dedicados que deseen impulsar su carrera en un ambiente dinámico y enriquecedor.</p>
                    <p>Si estás interesado en ser parte de nuestro equipo, por favor completa el formulario de contacto con tus datos y adjunta tu CV. Nos interesa saber más sobre tus habilidades, experiencia y cómo puedes contribuir a nuestro éxito continuo.</p>
                </div>
            </section>
            <WorkWithUsForm/>
        </main>
    );
}