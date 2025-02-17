"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SubmitButtonLoading, FormErrorMessage } from "@/components";
import { collections } from "@/data/collections";

const schema = z.object({
    width: z.number().positive("Debe ser mayor a 0").max(10000, "Máximo permitido: 10000").optional(),
    height: z.number().positive("Debe ser mayor a 0").max(10000, "Máximo permitido: 10000").optional(),
    area: z.number().positive("Debe ser mayor a 0").max(100000, "Máximo permitido: 100000").optional(),
    unit: z.enum(["m", "ft", "in"]),
    shape: z.enum(["rectangular", "irregular"]),
    collection: z.string().nonempty("Selecciona una colección"),
    mural: z.string().nonempty("Selecciona un mural"),
});

type Schema = z.infer<typeof schema>;

interface Props {
    preselectedMuralId: string;
}

export const QuoteForm = ({ preselectedMuralId }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRendered, setIsRendered] = useState<boolean>(false);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            unit: "m",
            shape: "rectangular",
        }
    });

    const selectedCollectionId = watch("collection");
    const selectedMuralId = watch("mural");
    const selectedCollection = collections.find(col => col.id === selectedCollectionId);
    const selectedMural = selectedCollection?.murales.find(m => m.id === selectedMuralId) ||
        collections.flatMap(col => col.murales).find(m => m.id === preselectedMuralId);

    const width = watch("width");
    const height = watch("height");
    const area = watch("area");
    const unit = watch("unit");

    useEffect(() => {
        if (width && height) {
            let calculatedArea = width * height;

            if (unit === "ft") calculatedArea *= 0.092903;
            if (unit === "in") calculatedArea *= 0.00064516;

            setValue("area", parseFloat(calculatedArea.toFixed(2)));
        }
    }, [width, height, unit, setValue]);

    const handleAreaInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const areaValue = parseFloat(event.target.value);
        if (!isNaN(areaValue)) {
            setValue("area", areaValue);
            setValue("width", undefined);
            setValue("height", undefined);
        }
    };

    useEffect(() => {
        if (preselectedMuralId) {
            const preselectedMural = collections.flatMap(col => col.murales).find(m => m.id === preselectedMuralId);
            if (preselectedMural) {
                setValue("collection", preselectedMural.collectionId);
                setIsRendered(true);
            }
        }
    }, [preselectedMuralId, setValue]);

    useEffect(() => {
        if (isRendered) {
            const preselectedMural = collections.flatMap(col => col.murales).find(m => m.id === preselectedMuralId);
            if (preselectedMural) {
                setValue("mural", preselectedMural.id);
            }
        }
    }, [preselectedMuralId, isRendered, setValue]);

    const onSubmit = async (data: Schema) => {
        setIsLoading(true);
        try {
            console.log("Datos enviados:", data);
        } catch (error) {
            console.error("Error en la cotización:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-12 lg:mt-4 w-full max-w-7xl px-4 xl:px-0">
            <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full">
                    <label className="md:text-lg">Forma del área</label>
                    <select className="w-full h-10 px-2 bg-white rounded-none border border-black" {...register("shape")}>
                        <option value="rectangular">Rectangular</option>
                        <option value="irregular">Forma inusual</option>
                    </select>
                </div>
                <div className="w-full">
                    <label className="md:text-lg">Unidad de medida</label>
                    <select className="w-full h-10 px-2 bg-white rounded-none border border-black" {...register("unit")}>
                        <option value="m">Metros</option>
                        <option value="ft">Pies</option>
                        <option value="in">Pulgadas</option>
                    </select>
                </div>
                <div className="w-full">
                    <label className="md:text-lg">Ancho del espacio</label>
                    <input type="number" step="0.01" min="0.01" max="100000" className="w-full h-10 px-2 bg-white rounded-none border border-black" {...register("width")} />
                    <FormErrorMessage condition={errors?.width} message={errors?.width?.message} />
                </div>
                <div className="w-full">
                    <label className="md:text-lg">Altura del espacio</label>
                    <input type="number" step="0.01" min="0.01" max="100000" className="w-full h-10 px-2 bg-white rounded-none border border-black" {...register("height")} />
                    <FormErrorMessage condition={errors?.height} message={errors?.height?.message} />
                </div>
                <div className="w-full">
                    <label className="md:text-lg">Área total ({unit}²)</label>
                    <input type="number" step="0.01" min="0.01" max="10000000000" className="w-full h-10 px-2 bg-white rounded-none border border-black" value={area || ""} onChange={handleAreaInput} />
                </div>
                <div className="w-full">
                    <label className="md:text-lg">Colección</label>
                    <select className="w-full h-10 px-2 bg-white rounded-none border border-black" {...register("collection")}>
                        <option value="">Selecciona una colección</option>
                        {collections.map(collection => (
                            <option key={collection.id} value={collection.id}>{collection.title}</option>
                        ))}
                    </select>
                    <FormErrorMessage condition={errors?.collection} message={errors?.collection?.message} />
                </div>
                <div className="w-full">
                    <label className="md:text-lg">Mural</label>
                    <select className="w-full h-10 px-2 bg-white rounded-none border border-black" {...register("mural")}>
                        <option value="">Selecciona un mural</option>
                        { selectedCollection?.murales.map(mural => (
                            <option key={mural.id} value={mural.id}>{mural.title}</option>
                        ))}
                    </select>
                    <FormErrorMessage condition={errors?.mural} message={errors?.mural?.message} />
                </div>
                <div className="mt-4 lg:mt-0 w-full text-xl lg:text-base flex justify-center lg:justify-end items-center lg:items-end">
                    <SubmitButtonLoading isLoading={isLoading} text="Cotizar" className="w-20" />
                </div>
            </div>
            {selectedMural && (
                <div className="mt-12 flex flex-col items-center">
                    <h2 className="mb-4 w-full md:text-sm"><b className="mr-2 font-semibold text-xl">{selectedMural.title}</b>/ Previsualización</h2>
                    <Image src={selectedMural.variants[0].montaje} alt={`${selectedMural.title} Montaje`} width={1500} height={1500} className="w-full object-contain" />
                    <Image src={selectedMural.variants[0].mural} alt={`${selectedMural.title} Mural`} width={1500} height={1500} className="w-full object-contain mt-4" />
                </div>
            )}
        </form>
    );
};