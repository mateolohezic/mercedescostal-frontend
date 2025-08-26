import Link from "next/link";
import { WhatsAppIcon } from "@/icons";

export const WhatsApp = () => {
    return (
        <div className="fixed w-full px-4 bottom-4 pointer-events-none flex justify-end z-[100]">
            <Link href={"https://wa.me/5491160208460"} className="size-12 bg-white rounded-full flex justify-center items-center pointer-events-auto hover:scale-110 transition-200">
                <WhatsAppIcon className="size-7" />
            </Link>
        </div>
    )
}
