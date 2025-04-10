"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormErrorMessage } from "@/components";
import { collections } from "@/data/collections";

const schema = z.object({
    width: z.string().optional().refine(val => !val || (!isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 10000), { message: "Debe ser mayor a 0 y menor o igual a 10000" }),
    height: z.string().optional().refine(val => !val || (!isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 10000), { message: "Debe ser mayor a 0 y menor o igual a 10000" }),
    area: z.string().optional().refine(val => !val || (!isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 100000), { message: "Debe ser mayor a 0 y menor o igual a 100000" }),
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
            const widthNum = parseFloat(width);
            const heightNum = parseFloat(height);
            if (!isNaN(widthNum) && !isNaN(heightNum)) {
                let calculatedArea = widthNum * heightNum;
                setValue("area", calculatedArea.toFixed(2));
            }
        }
    }, [width, height, unit, setValue]);
    
    const handleAreaInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const areaValue = parseFloat(event.target.value);
        if (!isNaN(areaValue)) {
            setValue("area", areaValue.toString());
            setValue("width", "");
            setValue("height", "");
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
        const { mural, collection, area, width, height, unit, shape } = data;
    
        const collectionName = collections.find(c => c.id === collection)?.title || "";
        const muralName = collections.flatMap(c => c.murales).find(m => m.id === mural)?.title || "";
    
        let message = `Hola! Estoy interesado en el mural ${muralName} de la colección ${collectionName}.%0A`;

        if (area) message += `Área a cubrir: ${area} ${unit}%0A`;
        if (width && height) {
            message += `Largo: ${width} ${unit}%0A`;
            message += `Ancho: ${height} ${unit}%0A`;
        }
        
        message += `Forma del área: ${shape === "rectangular" ? "Rectangular" : "Inusual"}`;
        const phone = "5491160208460";
        const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex items-start px-12">
            <div className="w-full max-w-md grid grid-cols-1 md:grid-cols-1 gap-4">
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
                    <label className="md:text-lg">Ancho del espacio ({unit})</label>
                    <input type="number" step="0.01" min="0.01" max="100000" className="w-full h-10 px-2 bg-white rounded-none border border-black" {...register("width")} />
                    <FormErrorMessage condition={errors?.width} message={errors?.width?.message} />
                </div>
                <div className="w-full">
                    <label className="md:text-lg">Altura del espacio ({unit})</label>
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
                        { collections.map(collection => (
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
                    <button type="submit" className="mt-4 px-4 py-2 bg-black font-gillsans font-medium text-white text-lg uppercase">
                        Cotizar
                    </button>
                </div>
            </div>
            { selectedMural && (
                <div className="pl-12 flex flex-col items-center gap-1S">
                    <h2 className="w-full text-start font-gillsans font-light uppercase">
                        <span className="text-black/75">Previsualización</span>{" "}
                        <b className="font-medium">{selectedMural.title}</b>
                    </h2>
                    <Image src={selectedMural.variants[0].mural} alt={`${selectedMural.title} Mural`} width={1500} height={1500} className="w-full object-contain" />
                </div>
            )}
        </form>
    );
};