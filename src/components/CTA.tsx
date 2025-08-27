import Link from "next/link"

export const CTA = () => {
    return (
        <section className="mt-24 px-4 w-full font-gillsans flex flex-col items-center gap-4">
            <h2 className="sr-only">Cotizar ahora tu mural</h2>
            <Link href={`/quote`} className="px-4 py-2 bg-black font-gillsans font-medium text-white text-lg uppercase">Cotizar ahora</Link>
        </section>
    )
}
