import { NavbarHome, PortadaHome } from "@/components";

export default function HomePage() {
  return (
    <main className="grow w-full flex flex-col justify-start items-center bg-base">
      <h1 className="sr-only">Mercedes Costal</h1>
      <section className="w-full min-h-svh relative">
        <NavbarHome/>
        <PortadaHome/>
      </section>
    </main>
  );
}