import { Metadata } from "next";
import Link from "next/link";

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

export default function WorkWithUsPage() {

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0">
                <div className="w-full flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                    <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                        Trabaja con <b className="block font-semibold">nosotros</b>
                    </h1>
                    <div className="w-full max-w-2xl lg:text-xl">
                        <p>En Mercedes Costal, estamos siempre en búsqueda de talentos apasionados y dedicados que deseen impulsar su carrera en un ambiente dinámico y enriquecedor.</p>
                        <p className="mt-8">Si estás interesado en ser parte de nuestro equipo, envianos tu CV a <b className="font-semibold">info@mercedescostal.com.ar</b>. Nos interesa conocer tus habilidades, tu experiencia y cómo podés contribuir a nuestro crecimiento continuo.</p>
                    </div>
                </div>
                <p className="mt-8 text-center lg:text-start">
                    <Link href="/meet-the-makers" className='border-b border-b-black lg:text-xl hover:opacity-75 transition-150'>Conocé al equipo.</Link>
                </p>
            </section>
        </main>
    );
}