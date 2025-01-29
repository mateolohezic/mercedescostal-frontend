'use client';

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    email: z.string().nonempty("Campo requerido.").email("Correo electrónico inválido.").trim().toLowerCase(),
});

type Schema = z.infer<typeof schema>;

export const FooterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm<Schema>({resolver: zodResolver(schema)});

    const onSubmit: SubmitHandler<Schema> = async ({email}) => {
        setIsLoading(true);
        try {
            console.log(email)
        } catch (error) {
            console.error("Error en el registro:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl flex justify-between items-center gap-4">
            <div className="grow flex items-center gap-2">
                <label htmlFor="email" className="md:text-lg text-center md:text-start md:px-0 mb-2 md:mb-0">
                    Suscribe to our newsletter:
                </label>
                <input
                    type="email"
                    inputMode="email"
                    enterKeyHint="done"
                    maxLength={50}
                    id="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="grow font-semibold text-black placeholder:font-semibold placeholder:uppercase placeholder:text-black"
                    {...register("email", { required: true, maxLength: 50 })}
                />
            </div>
            <button type="submit" disabled={isLoading} className="uppercase border border-transparent hover:border-b-black">
                [ Submit ]
            </button>
        </form>
    )
}
