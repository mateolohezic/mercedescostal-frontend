import { VideoIntro } from "@/components";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default function HomePage() {
  return (
    <main className="w-full grow flex flex-col items-center">
      <h1 className="sr-only">Página Principal Mercedes Costal Prints & Patterns</h1>
      <section className="w-full min-h-svh relative bg-black">
        <VideoIntro/>
      </section>
    </main>
  );
}