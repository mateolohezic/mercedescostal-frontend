import { VideoIntro } from "@/components";

export default function HomePage() {
  return (
    <main className="w-full grow flex flex-col justify-start items-center">
      <h1 className="sr-only">Página Principal Mercedes Costal Prints & Patterns</h1>
      <section className="w-full min-h-svh relative">
        <VideoIntro/>
      </section>
    </main>
  );
}