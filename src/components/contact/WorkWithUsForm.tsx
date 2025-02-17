'use client';

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitButtonLoading, FormErrorMessage } from "@/components";

const schema = z.object({
    fullName: z.string().nonempty("Campo requerido.").min(2, "Debe contener más de 2 caracteres.").max(50, "Debe contener hasta 50 caracteres."),
    email: z.string().nonempty("Campo requerido.").email("Debe ser un correo válido."),
    phone: z.string().min(7, "Campo requerido.").max(20, "Debe contener hasta 20 caracteres.").optional(),
    interestArea: z.string().nonempty("Campo requerido."),
    aboutme: z.string().nonempty("Campo requerido.").min(20, "Debe contener al menos 20 caracteres.").max(2000, "Debe contener hasta 2000 caracteres.")
});

type Schema = z.infer<typeof schema>;

export const WorkWithUsForm = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Schema>({ resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setIsLoading(true);
        try {
            console.log("Datos enviados:", data);
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-full max-w-7xl px-4 xl:px-0">
            <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full">
                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="fullName" className="md:text-lg">Nombre completo</label>
                        <div className="relative w-full">
                            <div className="absolute inset-0 pointer-events-none px-2 py-1 flex items-center">
                                { watch("fullName") && <span className="bg-yellow-300 h-fit">{watch("fullName")}</span> }
                            </div>
                            <input
                                type="text"
                                enterKeyHint="next"
                                minLength={2}
                                maxLength={50}
                                id="fullName"
                                autoComplete="name"
                                autoCapitalize="words"
                                className="w-full h-10 px-3 bg-transparent border border-black text-transparent outline-none caret-black"
                                {...register("fullName", {
                                    required: "Este campo es obligatorio.",
                                    minLength: { value: 2, message: "Debe contener más de 2 caracteres." },
                                    maxLength: { value: 50, message: "Debe contener menos de 50 caracteres." }
                                })}
                            />
                        </div>
                    </div>
                    <FormErrorMessage condition={errors?.fullName} message={errors?.fullName?.message} className="mt-2"/>
                </div>
                <div className="w-full">
                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="email" className="md:text-lg">Correo electrónico</label>
                        <div className="relative w-full">
                            <div className="absolute inset-0 pointer-events-none px-2 py-1 flex items-center">
                                { watch("email") && <span className="bg-yellow-300 h-fit">{watch("email")}</span> }
                            </div>
                            <input
                                type="text"
                                enterKeyHint="next"
                                inputMode="email"
                                minLength={2}
                                maxLength={50}
                                id="email"
                                autoComplete="name"
                                autoCapitalize="off"
                                className="w-full h-10 px-3 bg-transparent border border-black text-transparent outline-none caret-black"
                                {...register("email", {
                                    required: "Este campo es obligatorio.",
                                    minLength: { value: 2, message: "Debe contener más de 2 caracteres." },
                                    maxLength: { value: 50, message: "Debe contener menos de 50 caracteres." }
                                })}
                            />
                        </div>
                    </div>
                    <FormErrorMessage condition={errors?.email} message={errors?.email?.message} className="mt-2"/>
                </div>
                <div className="w-full">
                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="phone" className="md:text-lg">Número de teléfono</label>
                        <div className="relative w-full">
                            <div className="absolute inset-0 pointer-events-none px-2 py-1 flex items-center">
                                { watch("phone") && <span className="bg-yellow-300 h-fit">{watch("phone")}</span> }
                            </div>
                            <input
                                type="text"
                                enterKeyHint="next"
                                inputMode="tel"
                                minLength={2}
                                maxLength={50}
                                id="phone"
                                autoComplete="name"
                                autoCapitalize="true"
                                className="w-full h-10 px-3 bg-transparent border border-black text-transparent outline-none caret-black"
                                {...register("phone", {
                                    required: "Este campo es obligatorio.",
                                    minLength: { value: 2, message: "Debe contener más de 2 caracteres." },
                                    maxLength: { value: 50, message: "Debe contener menos de 50 caracteres." }
                                })}
                            />
                        </div>
                    </div>
                    <FormErrorMessage condition={errors?.phone} message={errors?.phone?.message} className="mt-2"/>
                </div>
                <div className="w-full">
                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="interestArea" className="md:text-lg">Área de interés</label>
                        <div className="relative w-full">
                            <div className="absolute inset-0 pointer-events-none px-2 py-1 flex items-center">
                                { watch("interestArea") && <span className="bg-yellow-300 h-fit">{watch("interestArea")}</span> }
                            </div>
                            <input
                                type="text"
                                enterKeyHint="next"
                                minLength={2}
                                maxLength={50}
                                id="interestArea"
                                autoComplete="name"
                                autoCapitalize="true"
                                className="w-full h-10 px-3 bg-transparent border border-black text-transparent outline-none caret-black"
                                {...register("interestArea", {
                                    required: "Este campo es obligatorio.",
                                    minLength: { value: 2, message: "Debe contener más de 2 caracteres." },
                                    maxLength: { value: 50, message: "Debe contener menos de 50 caracteres." }
                                })}
                            />
                        </div>
                    </div>
                    <FormErrorMessage condition={errors?.interestArea} message={errors?.interestArea?.message} className="mt-2"/>
                </div>
            </div>
            <div className="mt-4 w-full">
                <div className='w-full flex flex-col gap-1'>
                    <label htmlFor="aboutme" className="md:text-lg">Sobre mí</label>
                    <div className="relative w-full">
                        <div className="absolute inset-0 pointer-events-none p-2 flex items-start whitespace-pre-wrap break-words">
                            {watch("aboutme") && <span className="bg-yellow-300">{watch("aboutme")}</span>}
                        </div>
                        <textarea
                            maxLength={2600}
                            id="aboutme"
                            autoComplete="off"
                            autoCapitalize="true"
                            placeholder="Cuéntanos un poco sobre ti..."
                            disabled={isLoading}
                            className="w-full h-72 md:h-52 p-2 bg-transparent border border-black text-transparent outline-none caret-black resize-none placeholder:text-neutral-400 disabled:text-white/75 transition-200"
                            {...register("aboutme", {
                                required: "Este campo es obligatorio.",
                                maxLength: { value: 2600, message: "Debe contener menos de 2600 caracteres." }
                            })}
                        />
                    </div>
                </div>
                <FormErrorMessage condition={errors?.aboutme} message={errors?.aboutme?.message} className="mt-2"/>
            </div>
            <div className="mt-4 w-full flex justify-end">
                <SubmitButtonLoading isLoading={isLoading} text="[ Submit ]" className="w-20"/>
            </div>
        </form>
    )
}