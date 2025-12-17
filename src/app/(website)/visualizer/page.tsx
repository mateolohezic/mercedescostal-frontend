import { VisualizerForm } from "@/components";

export default function VisualizerPage() {
    return (
        <main className="w-full min-h-screen py-12">
            <div className="w-full max-w-7xl px-4 xl:px-0 mx-auto">
                <div className="px-4 lg:px-12 mb-8">
                    <h1 className="font-truetypewritter text-3xl lg:text-4xl uppercase">Visualizador de Murales</h1>
                    <p className="mt-2 text-black/70">Sube una foto de tu espacio y visualiza cómo quedaría con nuestros murales</p>
                </div>
                <VisualizerForm />
            </div>
        </main>
    );
}