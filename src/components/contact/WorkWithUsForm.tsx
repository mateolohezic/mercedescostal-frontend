'use client';

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitButtonLoading, FormErrorMessage } from "@/components";

const schema = z.object({
    fullName: z.string().min(2, "Debe contener más de 2 caracteres.").max(50, "Debe contener hasta 50 caracteres.").nonempty("Campo requerido."),
    phonenumber: z.string().min(7, "Debe contener al menos 7 caracteres.").max(20, "Debe contener hasta 20 caracteres.").nonempty("Campo requerido."),
    email: z.string().email("Debe ser un correo válido.").nonempty("Campo requerido."),
    country: z.string().nonempty("Campo requerido."),
    region: z.string().nonempty("Campo requerido."),
    instagram: z.string().min(2, "Debe contener más de 2 caracteres.").max(200, "Debe contener hasta 200 caracteres.").nonempty("Campo requerido."),
    address: z.string().min(5, "Debe contener al menos 5 caracteres.").max(100, "Debe contener hasta 100 caracteres.").optional(),
    addressNumber: z.string().min(1, "Campo requerido.").max(25, "Debe contener hasta 25 caracteres.").optional(),
    message: z.string().min(20, "Debe contener al menos 20 caracteres.").max(2000, "Debe contener hasta 2000 caracteres.").optional(),
});

type Schema = z.infer<typeof schema>;

export const WorkWithUsForm = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Schema>({ resolver: zodResolver(schema) });
    const [location, setLocation] = useState({ country: "", region: "" });

    const handleCountryChange = (val: string) => {
        setLocation({ ...location, country: val });
        setValue("country", val);
    };

    const handleRegionChange = (val: string) => {
        setLocation({ ...location, region: val });
        setValue("region", val);
    };

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
        <form onSubmit={handleSubmit(onSubmit)} className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0">
            <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full">
                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="fullName" className="md:text-lg">Nombre completo <span className="text-invalid text-xs relative right-1.5 bottom-1.5">*</span></label>
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
                                {...register("fullName")}
                            />
                        </div>
                    </div>
                    <FormErrorMessage condition={errors?.fullName} message={errors?.fullName?.message} className="mt-2"/>
                </div>
                <div className="w-full">
                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="email" className="md:text-lg">Correo electrónico <span className="text-invalid text-xs relative right-1.5 bottom-1.5">*</span></label>
                        <div className="relative w-full">
                            <div className="absolute inset-0 pointer-events-none px-2 py-1 flex items-center">
                                { watch("email") && <span className="bg-yellow-300 h-fit">{watch("email")}</span> }
                            </div>
                            <input
                                type="text"
                                enterKeyHint="next"
                                inputMode="email"
                                minLength={2}
                                maxLength={100}
                                id="email"
                                autoComplete="email"
                                autoCapitalize="off"
                                className="w-full h-10 px-3 bg-transparent border border-black text-transparent outline-none caret-black"
                                {...register("email")}
                            />
                        </div>
                    </div>
                    <FormErrorMessage condition={errors?.email} message={errors?.email?.message} className="mt-2"/>
                </div>
                <div className="w-full">
                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="phonenumber" className="md:text-lg">Número de teléfono <span className="text-invalid text-xs relative right-1.5 bottom-1.5">*</span></label>
                        <div className="relative w-full">
                            <div className="absolute inset-0 pointer-events-none px-2 py-1 flex items-center">
                                { watch("phonenumber") && <span className="bg-yellow-300 h-fit">{watch("phonenumber")}</span> }
                            </div>
                            <input
                                type="text"
                                enterKeyHint="next"
                                inputMode="tel"
                                minLength={7}
                                maxLength={20}
                                id="phonenumber"
                                autoComplete="name"
                                autoCapitalize="true"
                                className="w-full h-10 px-3 bg-transparent border border-black text-transparent outline-none caret-black"
                                {...register("phonenumber")}
                            />
                        </div>
                    </div>
                    <FormErrorMessage condition={errors?.phonenumber} message={errors?.phonenumber?.message} className="mt-2"/>
                </div>
                <div className="w-full">
                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="instagram" className="md:text-lg">Instagram <span className="text-invalid text-xs relative right-1.5 bottom-1.5">*</span></label>
                        <div className="relative w-full">
                            <div className="absolute inset-0 pointer-events-none px-2 py-1 flex items-center">
                                { watch("instagram") && <span className="bg-yellow-300 h-fit">{watch("instagram")}</span> }
                            </div>
                            <input
                                type="text"
                                enterKeyHint="next"
                                inputMode="tel"
                                minLength={2}
                                maxLength={200}
                                id="instagram"
                                autoComplete="off"
                                autoCapitalize="off"
                                className="w-full h-10 px-3 bg-transparent border border-black text-transparent outline-none caret-black"
                                {...register("instagram")}
                            />
                        </div>
                    </div>
                    <FormErrorMessage condition={errors?.instagram} message={errors?.instagram?.message} className="mt-2"/>
                </div>
                <div className="w-full">
                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="name" className="md:text-lg">País <span className="text-invalid text-xs relative right-1.5 bottom-1.5">*</span></label>
                        <CountryDropdown
                            value={location.country}
                            onChange={handleCountryChange}
                            name="country"
                            id="country"
                            defaultOptionLabel="Seleccionar"
                            disabled={isLoading}
                            className="w-full h-10 px-3 bg-transparent border border-black outline-none focus-visible:outline-none disabled:text-black/75 appearance-none transition-150"
                        />
                    </div>
                    <FormErrorMessage condition={errors?.country} message="Campo requerido." className="mt-2"/>
                </div>
                <div className="w-full">
                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="name" className="md:text-lg">Región/Provincia <span className="text-invalid text-xs relative right-1.5 bottom-1.5">*</span></label>
                        <RegionDropdown
                            country={location.country}
                            value={location.region}
                            onChange={handleRegionChange}
                            name="region"
                            id="region"
                            disableWhenEmpty={true}
                            defaultOptionLabel="Seleccionar"
                            disabled={isLoading}
                            className="w-full h-10 px-3 bg-transparent border border-black outline-none focus-visible:outline-none disabled:text-black/75 appearance-none transition-150"
                        />
                    </div>
                    <FormErrorMessage condition={errors?.region} message="Campo requerido." className="mt-2"/>
                </div>
                <div className="w-full">
                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="address" className="md:text-lg">Calle</label>
                        <div className="relative w-full">
                            <div className="absolute inset-0 pointer-events-none px-2 py-1 flex items-center">
                                { watch("address") && <span className="bg-yellow-300 h-fit">{watch("address")}</span> }
                            </div>
                            <input
                                type="text"
                                enterKeyHint="next"
                                minLength={5}
                                maxLength={100}
                                id="address"
                                autoComplete="name"
                                autoCapitalize="true"
                                className="w-full h-10 px-3 bg-transparent border border-black text-transparent outline-none caret-black"
                                {...register("address")}
                            />
                        </div>
                    </div>
                    <FormErrorMessage condition={errors?.address} message={errors?.address?.message} className="mt-2"/>
                </div>
                <div className="w-full">
                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="addressNumber" className="md:text-lg">Altura</label>
                        <div className="relative w-full">
                            <div className="absolute inset-0 pointer-events-none px-2 py-1 flex items-center">
                                { watch("addressNumber") && <span className="bg-yellow-300 h-fit">{watch("addressNumber")}</span> }
                            </div>
                            <input
                                type="text"
                                enterKeyHint="next"
                                minLength={1}
                                maxLength={25}
                                id="addressNumber"
                                className="w-full h-10 px-3 bg-transparent border border-black text-transparent outline-none caret-black"
                                {...register("addressNumber")}
                            />
                        </div>
                    </div>
                    <FormErrorMessage condition={errors?.addressNumber} message={errors?.addressNumber?.message} className="mt-2"/>
                </div>
            </div>
            <div className="mt-4 w-full">
                <div className='w-full flex flex-col gap-1'>
                    <label htmlFor="message" className="md:text-lg">Mensaje</label>
                    <textarea
                        minLength={20}
                        maxLength={2000}
                        id="message"
                        autoComplete="off"
                        autoCapitalize="true"
                        disabled={isLoading}
                        className="w-full h-72 md:h-52 p-2 bg-transparent border border-black outline-none resize-none"
                        {...register("message")}
                    />
                </div>
                <FormErrorMessage condition={errors?.message} message={errors?.message?.message} className="mt-2"/>
            </div>
            <div className="mt-4 w-full flex justify-end">
                <SubmitButtonLoading isLoading={isLoading} text="[ Enviar ]" className="w-24"/>
            </div>
        </form>
    )
}