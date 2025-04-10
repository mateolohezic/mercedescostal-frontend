"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { collections } from "@/data/collections";
import Image from "next/image";

interface Wall {
    width: number;
    height: number;
}

interface Props {
    preselectedMuralId: string;
}

export const QuoteForm = ({  }: Props) => {
    const { register, handleSubmit, watch } = useForm();
    const [walls, setWalls] = useState<Wall[]>([]);
    const [totalArea, setTotalArea] = useState(0);
  
    const selectedCollectionId = watch("collection");
    const selectedMuralId = watch("mural");
    const selectedCollection = collections.find(col => col.id === selectedCollectionId);
    const selectedMural = selectedCollection?.murales.find(m => m.id === selectedMuralId);
  
    const addWall = () => setWalls([...walls, { width: 0, height: 0 }]);
  
    const removeWall = (index: number) => {
      const updated = [...walls];
      updated.splice(index, 1);
      setWalls(updated);
    };
  
    const updateWall = (index: number, field: keyof Wall, value: string) => {
      const updated = [...walls];
      updated[index][field] = parseFloat(value) || 0;
      setWalls(updated);
    };
  
    useEffect(() => {
      const area = walls.reduce((sum, wall) => sum + (wall.width * wall.height), 0);
      setTotalArea(area);
    }, [walls]);
  
    const onSubmit = () => {
      const mural = collections.flatMap(c => c.murales).find(m => m.id === selectedMuralId);
      const collectionName = selectedCollection?.title || "";
      const muralName = mural?.title || "";
  
      let message = `Hola! Estoy interesado en el mural ${muralName} de la colección ${collectionName}.%0A`;
      walls.forEach((w, i) => {
        message += `Pared ${i + 1}: ${w.width}m x ${w.height}m%0A`;
      });
      message += `Área total: ${totalArea.toFixed(2)} m²`;
  
      window.open(`https://wa.me/5491160208460?text=${message}`, "_blank");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex items-start px-12">
            <div className="w-full max-w-md grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="w-full">
                    <label className="md:text-lg">Colección</label>
                    <select className="w-full h-10 px-2 bg-white rounded-none border border-black" {...register("collection")}>
                        <option value="">Selecciona una colección</option>
                        { collections.map(collection => (
                            <option key={collection.id} value={collection.id}>{collection.title}</option>
                        ))}
                    </select>
                    {/* <FormErrorMessage condition={errors?.collection} message={errors?.collection?.message} /> */}
                </div>
                <div className="w-full">
                    <label className="md:text-lg">Mural</label>
                    <select className="w-full h-10 px-2 bg-white rounded-none border border-black" {...register("mural")}>
                        <option value="">Selecciona un mural</option>
                        { selectedCollection?.murales.map(mural => (
                            <option key={mural.id} value={mural.id}>{mural.title}</option>
                        ))}
                    </select>
                    {/* <FormErrorMessage condition={errors?.mural} message={errors?.mural?.message} /> */}
                </div>
                <div className="flex flex-col gap-2 border-t pt-4">
                    <label className="text-lg font-semibold">Paredes</label>
                    {walls.map((wall, index) => (
                    <div key={index} className="flex gap-2 items-center">
                        <input type="number" placeholder="Ancho (m)" min="0" value={wall.width} onChange={e => updateWall(index, 'width', e.target.value)} className="border px-2 w-1/2" />
                        <input type="number" placeholder="Alto (m)" min="0" value={wall.height} onChange={e => updateWall(index, 'height', e.target.value)} className="border px-2 w-1/2" />
                        <button type="button" onClick={() => removeWall(index)} className="text-red-500">Eliminar</button>
                    </div>
                    ))}
                    <button type="button" onClick={addWall} className="mt-2 bg-black text-white px-4 py-1">Agregar pared</button>
                </div>

                {/* Área total */}
                <div className="pt-4">
                    <p><b>Área total:</b> {totalArea.toFixed(2)} m²</p>
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