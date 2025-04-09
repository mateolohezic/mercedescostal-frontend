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
    isHome?: boolean;
    insideCollapse?: boolean;
}

export const BuscadorNavbar = ({isHome, insideCollapse}:Props) => {

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

    if (insideCollapse) {
        return (
            <motion.form
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ delay: 0.5 }}
                onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-2"
            >
                <label className="sr-only">Buscar</label>
                <div className="relative w-full">
                    <input
                        type="text"
                        enterKeyHint="search"
                        minLength={2}
                        maxLength={50}
                        className="w-full h-10 px-3 pr-10 bg-white border border-black rounded-none outline-none"
                        placeholder="Escribe tu búsqueda..."
                        {...register("query", {
                            required: "Este campo es obligatorio.",
                            minLength: { value: 2, message: "Debe contener más de 2 caracteres." },
                            maxLength: { value: 50, message: "Debe contener menos de 50 caracteres." }
                        })}
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                        aria-label="Buscar"
                    >
                        <SearchIcon className="size-5" />
                    </button>
                </div>
                <FormErrorMessage condition={errors?.query} message={errors?.query?.message} />
            </motion.form>
        );
    }

    return (
        <div className="relative">
            <motion.button
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-fit h-6 flex justify-center items-end"
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <SearchIcon className={`text-sm ${isHome ? 'text-white/90' : 'text-black/90'}`} />
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
                                maxLength={50}
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