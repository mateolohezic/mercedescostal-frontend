"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormErrorMessage } from "@/components";
import { collections } from "@/data/collections";

const schema = z.object({
    name: z.string().min(2, "Nombre requerido"),
    email: z.string().email("Correo electrónico inválido"),
    phone: z.string().min(6, "Teléfono inválido"),
    collection: z.string().nonempty("Selecciona una colección"),
    mural: z.string().nonempty("Selecciona un diseño"),
    sheets: z.number({ invalid_type_error: "Selecciona cantidad de hojas" }).min(2).max(6),
    model: z.enum(["recto", "curvo"], { required_error: "Selecciona un modelo" }),
});

type Schema = z.infer<typeof schema>;

interface Props {
    preselectedMuralId?: string;
}

export const ArtScreenQuoteForm = ({ preselectedMuralId = "" }: Props) => {
    const [isRendered, setIsRendered] = useState<boolean>(false);
    
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Schema>({ 
        resolver: zodResolver(schema), 
        defaultValues: { 
            sheets: 2,
            model: undefined,
        }
    });

    const selectedCollectionId = watch("collection");
    const selectedMuralId = watch("mural");
    const sheets = watch("sheets");
    const model = watch("model");
    
    const selectedCollection = collections.find(col => col.id === selectedCollectionId);
    const selectedMural = selectedCollection?.murales.find(m => m.id === selectedMuralId) ||
        collections.flatMap(col => col.murales).find(m => m.id === preselectedMuralId);

    useEffect(() => {
        if (preselectedMuralId) {
            const mural = collections.flatMap(col => col.murales).find(m => m.id === preselectedMuralId);
            if (mural) {
                setValue("collection", mural.collectionId);
                setIsRendered(true);
            }
        }
    }, [preselectedMuralId, setValue]);

    useEffect(() => {
        if (isRendered && preselectedMuralId) {
            const mural = collections.flatMap(col => col.murales).find(m => m.id === preselectedMuralId);
            if (mural) {
                setValue("mural", mural.id);
            }
        }
    }, [preselectedMuralId, setValue, isRendered]);

    const onSubmit = (data: Schema) => {
        const { name, email, phone, collection, mural, sheets, model } = data;

        const collectionName = collections.find(c => c.id === collection)?.title || "";
        const muralName = collections.flatMap(c => c.murales).find(m => m.id === mural)?.title || "";
        const modelName = model === "recto" ? "Recto" : "Curvo";

        let message = `Hola! Soy ${name} y me gustaría cotizar un Art Screen.%0A%0A`;
        message += `*Diseño:* ${muralName} (${collectionName})%0A`;
        message += `*Cantidad de hojas:* ${sheets} hojas%0A`;
        message += `*Modelo:* ${modelName}%0A`;
        message += `*Dimensiones totales:* ${sheets * 50}cm x 183cm%0A%0A`;
        message += `Email: ${email}%0A`;
        message += `Teléfono: ${phone}`;

        const whatsappNumber = "5491160208460";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
        window.open(whatsappUrl, "_blank");
    };

    // Calcular dimensiones para preview
    const totalWidth = (sheets || 2) * 50;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 lg:px-12 flex flex-col lg:flex-row items-start gap-12 lg:gap-0">
            <div className="w-full max-w-md grid grid-cols-1 gap-4">
                {/* Datos personales */}
                <div className="w-full">
                    <label htmlFor="name" className="md:text-lg">Nombre</label>
                    <input
                        type="text"
                        enterKeyHint="next"
                        minLength={2}
                        maxLength={50}
                        id="name"
                        autoComplete="given-name"
                        autoCapitalize="words"
                        className="w-full h-10 px-2 bg-white rounded-none border border-black"
                        {...register("name")}
                    />
                    <FormErrorMessage condition={errors?.name} message={errors?.name?.message} />
                </div>
                
                <div className="w-full">
                    <label htmlFor="email" className="md:text-lg">Correo electrónico</label>
                    <input
                        type="text"
                        id="email"
                        minLength={2}
                        maxLength={50}
                        enterKeyHint="next"
                        autoComplete="email"
                        inputMode="email"
                        className="w-full h-10 px-2 bg-white rounded-none border border-black"
                        {...register("email")}
                    />
                    <FormErrorMessage condition={errors?.email} message={errors?.email?.message} />
                </div>
                
                <div className="w-full">
                    <label htmlFor="phone" className="md:text-lg">Teléfono</label>
                    <input
                        id="phone"
                        type="text"
                        minLength={8}
                        maxLength={20}
                        enterKeyHint="next"
                        autoComplete="tel"
                        inputMode="tel"
                        className="w-full h-10 px-2 bg-white rounded-none border border-black"
                        {...register("phone")}
                    />
                    <FormErrorMessage condition={errors?.phone} message={errors?.phone?.message} />
                </div>

                {/* Selección de diseño */}
                <div className="w-full">
                    <label className="md:text-lg">Colección</label>
                    <select 
                        className="w-full h-10 px-2 bg-white rounded-none border border-black" 
                        {...register("collection")}
                    >
                        <option value="">Selecciona una colección</option>
                        {collections.map(collection => (
                            <option key={collection.id} value={collection.id}>{collection.title}</option>
                        ))}
                    </select>
                    <FormErrorMessage condition={errors?.collection} message={errors?.collection?.message} />
                </div>
                
                <div className="w-full">
                    <label className="md:text-lg">Diseño del mural</label>
                    <select 
                        className="w-full h-10 px-2 bg-white rounded-none border border-black" 
                        {...register("mural")}
                    >
                        <option value="">Selecciona un diseño</option>
                        {selectedCollection?.murales.map(mural => (
                            <option key={mural.id} value={mural.id}>{mural.title}</option>
                        ))}
                    </select>
                    <FormErrorMessage condition={errors?.mural} message={errors?.mural?.message} />
                </div>

                {/* Configuración del biombo */}
                <div className="w-full">
                    <label className="md:text-lg">Cantidad de hojas</label>
                    <select 
                        className="w-full h-10 px-2 bg-white rounded-none border border-black" 
                        {...register("sheets", { valueAsNumber: true })}
                    >
                        <option value={2}>2 hojas (100cm de ancho)</option>
                        <option value={3}>3 hojas (150cm de ancho)</option>
                        <option value={4}>4 hojas (200cm de ancho)</option>
                        <option value={5}>5 hojas (250cm de ancho)</option>
                        <option value={6}>6 hojas (300cm de ancho)</option>
                    </select>
                    <p className="mt-1 text-xs text-black/60">Cada hoja mide 50cm × 183cm de alto</p>
                    <FormErrorMessage condition={errors?.sheets} message={errors?.sheets?.message} />
                </div>

                <div className="w-full">
                    <label className="md:text-lg">Modelo</label>
                    <div className="mt-2 flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="recto"
                                className="w-4 h-4 accent-black"
                                {...register("model")}
                            />
                            <span>Recto</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="curvo"
                                className="w-4 h-4 accent-black"
                                {...register("model")}
                            />
                            <span>Curvo</span>
                        </label>
                    </div>
                    <FormErrorMessage condition={errors?.model} message={errors?.model?.message} />
                </div>

                {/* Submit */}
                <div className="mt-4 lg:mt-0 w-full text-xl lg:text-base flex justify-center lg:justify-end items-center lg:items-end">
                    <button type="submit" className="mt-4 px-4 py-2 bg-black font-gillsans font-medium text-white text-lg uppercase">
                        Cotizar Art Screen
                    </button>
                </div>
            </div>

            {/* Preview */}
            {selectedMural && (
                <div className="lg:pl-12 flex flex-col items-center gap-1">
                    <h2 className="w-full text-start font-gillsans font-light uppercase">
                        <span className="text-black/75">Previsualización</span>{" "}
                        <b className="font-medium">{selectedMural.title}</b>
                    </h2>
                    <Image 
                        src={selectedMural.variants[0].mural} 
                        alt={`${selectedMural.title} Art Screen`} 
                        width={1500} 
                        height={1500} 
                        className="w-full object-contain" 
                    />
                    <div className="mt-2 w-full text-sm text-black/60 font-gillsans">
                        <p>Configuración: {sheets || 2} hojas {model ? `• Modelo ${model}` : ""}</p>
                        <p>Dimensiones: {totalWidth}cm × 183cm</p>
                    </div>
                </div>
            )}
        </form>
    );
};