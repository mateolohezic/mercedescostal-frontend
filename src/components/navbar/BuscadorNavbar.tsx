'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon } from "@/icons";
import { FormErrorMessage, SubmitButtonLoading } from "@/components";

const schema = z.object({
    query: z.string().nonempty("Ingresa un término de búsqueda.").trim().max(50, "Máximo 50 caracteres."),
});

type Schema = z.infer<typeof schema>;

interface Props{
    isHome: boolean;
}

export const BuscadorNavbar = ({isHome}:Props) => {

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(schema)
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setIsLoading(true);
        try {
            router.push(`/search?query=${encodeURIComponent(data.query)}`);
        } catch (error) {
            console.error("Error en la búsqueda:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        reset();
    }, [reset, isExpanded])
    

    return (
        <div className="relative">
            <motion.button
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-fit h-7 flex justify-center items-center"
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <SearchIcon className={`size-4 ${isHome ? 'text-white/90' : 'text-black/90'}`} />
            </motion.button>
            <AnimatePresence>
                {isExpanded &&
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-10 right-0 bg-white border border-black p-4 w-72"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                            <input
                                type="text"
                                enterKeyHint="search"
                                minLength={2}
                                maxLength={99}
                                className="mb-2 w-full h-10 px-3 bg-transparent border border-black outline-none caret-black"
                                placeholder="Buscar..."
                                {...register("query", {
                                    required: "Este campo es obligatorio.",
                                    minLength: { value: 2, message: "Debe contener más de 2 caracteres." },
                                    maxLength: { value: 50, message: "Debe contener menos de 50 caracteres." }
                                })}
                            />
                            <FormErrorMessage condition={errors?.query} message={errors?.query?.message}/>
                            <SubmitButtonLoading isLoading={isLoading} text="Buscar" className="mt-2 w-full" />
                        </form>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
};