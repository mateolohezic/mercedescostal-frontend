'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon } from "@/icons";
import { FormErrorMessage } from "@/components";

const schema = z.object({
    query: z.string().nonempty("Ingresa un término de búsqueda.").trim().max(50, "Máximo 50 caracteres."),
});

type Schema = z.infer<typeof schema>;

interface Props{
    isHome?: boolean;
    insideCollapse?: boolean;
    setIsExpandedCollapse?: Dispatch<SetStateAction<boolean>>;
}

export const BuscadorNavbar = ({isHome, insideCollapse, setIsExpandedCollapse}:Props) => {

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(schema)
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<Schema> = async (data) => {
        try {
            router.push(`/search?query=${encodeURIComponent(data.query)}`);
            setIsExpandedCollapse && setIsExpandedCollapse(false);
        } catch (error) {
            console.error("Error en la búsqueda:", error);
        } finally {
            setIsExpanded(false);
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
                    <motion.form
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="absolute top-10 right-0 bg-white border border-black w-72"
                    >
                        <div className="w-full relative">
                            <input
                                type="text"
                                enterKeyHint="search"
                                minLength={2}
                                maxLength={50}
                                className="w-full h-10 ps-3 pe-11 bg-transparent border-none outline-none caret-black"
                                placeholder="Buscar..."
                                {...register("query", {
                                    required: "Este campo es obligatorio.",
                                    minLength: { value: 2, message: "Debe contener más de 2 caracteres." },
                                    maxLength: { value: 50, message: "Debe contener menos de 50 caracteres." }
                                })}
                                />
                            <button type="submit" className="w-11 h-10 flex justify-center items-center absolute top-0 right-0">
                                <SearchIcon className="size-5" />
                            </button>
                        </div>
                    </motion.form>
                }
            </AnimatePresence>
        </div>
    );
};