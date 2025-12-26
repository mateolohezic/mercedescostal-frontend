"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormErrorMessage, Modal } from "@/components";
import { collections } from "@/data/collections";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const schema = z.object({
    collection: z.string().nonempty("Selecciona una colección"),
    mural: z.string().nonempty("Selecciona un mural"),
    variant: z.string().optional(),
});

type Schema = z.infer<typeof schema>;

interface Props {
    preselectedMuralId?: string;
}

type GenerationStatus = "idle" | "uploading" | "processing" | "completed" | "error" | "limit_reached";

export const VisualizerForm = ({ preselectedMuralId }: Props) => {
    const [isRendered, setIsRendered] = useState(false);
    const [roomImage, setRoomImage] = useState<File | null>(null);
    const [roomImagePreview, setRoomImagePreview] = useState<string | null>(null);
    const [status, setStatus] = useState<GenerationStatus>("idle");
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [completedTaskId, setCompletedTaskId] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [generationsRemaining, setGenerationsRemaining] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [showLeadModal, setShowLeadModal] = useState(false);
    const [leadForm, setLeadForm] = useState({ nombre: "", email: "" });
    const [leadLoading, setLeadLoading] = useState(false);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Schema>({ resolver: zodResolver(schema), defaultValues: { collection: "", mural: "", variant: "" } });

    const selectedCollectionId = watch("collection");
    const selectedMuralId = watch("mural");
    const selectedVariantIndex = watch("variant");

    const selectedCollection = collections.find(col => col.id === selectedCollectionId);
    const selectedMural = selectedCollection?.murales.find(m => m.id === selectedMuralId) || collections.flatMap(col => col.murales).find(m => m.id === preselectedMuralId);
    const selectedVariant = selectedMural?.variants[parseInt(selectedVariantIndex || "0")] || selectedMural?.variants[0];

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
                setValue("variant", "0");
            }
        }
    }, [preselectedMuralId, setValue, isRendered]);

    useEffect(() => {
        if (isRendered) {
            setValue("mural", "");
            setValue("variant", "");
        }
    }, [selectedCollectionId, setValue, isRendered]);

    useEffect(() => {
        if (selectedMuralId) setValue("variant", "0");
    }, [selectedMuralId, setValue]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setErrorMessage(null);
        if (!file) return;
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
            setErrorMessage("Solo se permiten imágenes JPG, PNG o WebP");
            return;
        }
        if (file.size > MAX_FILE_SIZE) {
            setErrorMessage("La imagen no puede superar los 5MB");
            return;
        }
        setRoomImage(file);
        setRoomImagePreview(URL.createObjectURL(file));
        setResultImage(null);
        setStatus("idle");
    };

    const clearRoomImage = () => {
        setRoomImage(null);
        setRoomImagePreview(null);
        setResultImage(null);
        setStatus("idle");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const getMuralImageUrl = (): string | null => {
        if (!selectedVariant) return null;
        const muralSrc = selectedVariant.mural;
        if (typeof muralSrc === "object" && "src" in muralSrc) return `${window.location.origin}${muralSrc.src}`;
        if (typeof muralSrc === "string") {
            if (muralSrc.startsWith("http")) return muralSrc;
            return `${window.location.origin}${muralSrc}`;
        }
        
        return null;
    };

    const pollTaskStatus = async (taskId: string) => {
        const maxAttempts = 60;
        let attempts = 0;
        const poll = async () => {
            attempts++;
            try {
                const response = await fetch(`/api/visualizer/${taskId}`);
                const data = await response.json();
                if (data.status === "COMPLETED" && data.imageUrl) {
                    setResultImage(data.imageUrl);
                    setCompletedTaskId(data.taskId);
                    setStatus("completed");
                    return;
                }
                if (data.status === "FAILED") {
                    setStatus("error");
                    setErrorMessage("Error al generar la visualización. Intenta de nuevo.");
                    return;
                }
                if (attempts >= maxAttempts) {
                    setStatus("error");
                    setErrorMessage("La generación está tardando demasiado. Intenta de nuevo.");
                    return;
                }
                setTimeout(poll, 2000);
            } catch {
                setStatus("error");
                setErrorMessage("Error de conexión. Intenta de nuevo.");
            }
        };
        poll();
    };

    const submitLead = async () => {
        if (!leadForm.nombre || !leadForm.email) return;
        setLeadLoading(true);
        try {
            const response = await fetch("/api/visualizer/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(leadForm),
            });
            if (response.ok) {
                setShowLeadModal(false);
                setGenerationsRemaining(3);
                setLeadForm({ nombre: "", email: "" });
                onSubmit();
            }
        } catch (error) {
            console.error("Error enviando lead:", error);
        } finally {
            setLeadLoading(false);
        }
    };

    const onSubmit = async () => {
        if (!roomImage) {
            setErrorMessage("Sube una foto de tu espacio");
            return;
        }
        const muralUrl = getMuralImageUrl();
        if (!muralUrl) {
            setErrorMessage("Selecciona un mural");
            return;
        }
        setStatus("uploading");
        setErrorMessage(null);
        try {
            const isPattern = selectedMural?.keywords.some(k => ['patrón', 'patron', 'pattern'].includes(k.toLowerCase())) || false;
            const formData = new FormData();
            formData.append("roomImage", roomImage);
            formData.append("muralImageUrl", muralUrl);
            formData.append("isPattern", isPattern.toString());
            const response = await fetch("/api/visualizer", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) {
                if (data.error === "LEAD_REQUIRED") {
                    setStatus("idle");
                    setShowLeadModal(true);
                    return;
                }
                if (data.error === "LIMIT_REACHED") {
                    setStatus("limit_reached");
                    return;
                }
                throw new Error(data.error || "Error al procesar la imagen");
            }
            setGenerationsRemaining(data.generationsRemaining);
            setStatus("processing");
            pollTaskStatus(data.taskId);
        } catch (error) {
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Error al procesar la imagen");
        }
    };

    const openWhatsApp = () => {
        const message = `Hola! Me gustaría seguir usando el visualizador de murales de Mercedes Costal.`;
        const whatsappNumber = "5491160208460";
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col lg:flex-row items-start gap-12 lg:gap-0">
                <div className="w-full max-w-xl grid grid-cols-1 gap-4">
                    <div className="w-full">
                        <label className="md:text-lg">Tu espacio</label>
                        <p className="text-sm text-black/60 mb-2">Sube una foto de la habitación donde quieres visualizar el mural</p>
                        {!roomImagePreview ? (
                            <div onClick={() => fileInputRef.current?.click()} className="w-full aspect-video border-2 border-dashed border-black/30 flex flex-col items-center justify-center cursor-pointer hover:border-black/50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black/40 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm text-black/60">Click para subir imagen</span>
                                <span className="text-xs text-black/40 mt-1">JPG, PNG o WebP · Máx 5MB</span>
                            </div>
                        ) : (
                            <div className="relative w-full">
                                <img src={roomImagePreview} alt="Tu espacio" className="w-full aspect-video object-cover border border-black" />    
                                <button type="button" onClick={clearRoomImage} className="absolute top-2 right-2 bg-black/70 text-white p-1 hover:bg-black transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>
                    <div className="w-full">
                        <label className="md:text-lg">Colección</label>
                        <select className="w-full h-10 px-2 bg-white rounded-none border border-black" {...register("collection")}>
                            <option value="">Selecciona una colección</option>
                            {collections.map(collection => <option key={collection.id} value={collection.id}>{collection.title}</option>)}
                        </select>
                        <FormErrorMessage condition={errors?.collection} message={errors?.collection?.message} />
                    </div>
                    <div className="w-full">
                        <label className="md:text-lg">Mural</label>
                        <select className="w-full h-10 px-2 bg-white rounded-none border border-black" {...register("mural")} disabled={!selectedCollection}>
                            <option value="">Selecciona un mural</option>
                            {selectedCollection?.murales.map(mural => <option key={mural.id} value={mural.id}>{mural.title}</option>)}
                        </select>
                        <FormErrorMessage condition={errors?.mural} message={errors?.mural?.message} />
                    </div>
                    {selectedMural && selectedMural.variants.length > 1 && (
                        <div className="w-full">
                            <label className="md:text-lg">Color</label>
                            <select className="w-full h-10 px-2 bg-white rounded-none border border-black" {...register("variant")}>
                                {selectedMural.variants.map((variant, index) => <option key={index} value={index.toString()}>{variant.colorName}</option>)}
                            </select>
                        </div>
                    )}
                    {errorMessage && <div className="w-full p-3 bg-red-50 border border-red-200 text-red-700 text-sm">{errorMessage}</div>}
                    {generationsRemaining !== null && status !== "limit_reached" && <p className="text-sm text-black/60">Visualizaciones restantes: <strong>{generationsRemaining}</strong></p>}
                    <div className="mt-4 lg:mt-0 w-full flex justify-center lg:justify-end">
                        <button type="submit" disabled={status === "uploading" || status === "processing" || status === "limit_reached"} className="px-6 py-2 bg-black font-gillsans font-medium text-white text-lg uppercase disabled:opacity-50 disabled:cursor-not-allowed">
                            {status === "uploading" && "Subiendo..."}
                            {status === "processing" && "Generando..."}
                            {(status === "idle" || status === "completed" || status === "error") && "Visualizar"}
                            {status === "limit_reached" && "Límite alcanzado"}
                        </button>
                    </div>
                </div>
                <div className="w-full lg:pl-12 flex flex-col gap-6">
                    {status === "limit_reached" && (
                        <div className="w-full p-6 bg-black/5 border border-black/20 text-center">
                            <h3 className="font-gillsans font-medium text-lg mb-2">Has alcanzado el límite de visualizaciones</h3>
                            <p className="text-black/70 mb-4">Para seguir generando montajes, contacta con un vendedor</p>
                            <button type="button" onClick={openWhatsApp} className="px-6 py-2 bg-black font-gillsans font-medium text-white text-lg uppercase">
                                Contactar
                            </button>
                        </div>
                    )}
                    {status === "processing" && (
                        <div className="w-full h-64 border border-black/20 flex flex-col items-center justify-center gap-4">
                            <div className="w-10 h-10 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                            <p className="text-black/60">Generando visualización...</p>
                            <p className="text-sm text-black/40">Esto puede tomar hasta 30 segundos</p>
                        </div>
                    )}
                    {status === "completed" && resultImage && (
                        <div className="flex flex-col gap-2">
                            <h2 className="font-gillsans font-light uppercase">
                                <span className="text-black/75">Resultado</span>{" "}
                                <b className="font-medium">{selectedMural?.title} - {selectedVariant?.colorName}</b>
                            </h2>
                            <img src={resultImage} alt="Visualización del mural" className="w-full object-contain border border-black" />
                            <a href={`/api/visualizer/image/${completedTaskId}`} download={`visualizacion-${selectedMural?.title || "mural"}.jpg`} className="mt-2 self-end px-4 py-2 border border-black font-gillsans text-sm uppercase hover:bg-black hover:text-white transition-colors">
                                Descargar imagen
                            </a>
                        </div>
                    )}
                    {selectedMural && selectedVariant && status !== "completed" && status !== "processing" && status !== "limit_reached" && (
                        <div className="flex flex-col gap-2">
                            <h2 className="font-gillsans font-light uppercase">
                                <span className="text-black/75">Mural seleccionado</span>{" "}
                                <b className="font-medium">{selectedMural.title}</b>
                            </h2>
                            {typeof selectedVariant.mural === "object" && "src" in selectedVariant.mural ? (
                                <Image 
                                    src={selectedVariant.mural} 
                                    alt={`${selectedMural.title} - ${selectedVariant.colorName}`} 
                                    width={800} 
                                    height={800} 
                                    className="w-full object-contain" 
                                />
                            ) : (
                                <img 
                                    src={selectedVariant.mural as string} 
                                    alt={`${selectedMural.title} - ${selectedVariant.colorName}`} 
                                    className="w-full object-contain" 
                                />
                            )}
                        </div>
                    )}
                </div>
            </form>
            <Modal showModal={showLeadModal} setShowModal={setShowLeadModal} className="max-w-md p-8">
                <h3 className="font-gillsans font-medium text-xl mb-2">¡Te quedaste sin visualizaciones!</h3>
                <p className="text-black/70 mb-6">Dejanos tus datos para desbloquear 3 visualizaciones más.</p>
                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="lead-nombre" className="md:text-lg">Nombre</label>
                        <input
                            id="lead-nombre"
                            type="text"
                            value={leadForm.nombre}
                            onChange={(e) => setLeadForm(prev => ({ ...prev, nombre: e.target.value }))}
                            className="w-full h-10 px-2 bg-white border border-black"
                            placeholder="Tu nombre"
                        />
                    </div>
                    <div>
                        <label htmlFor="lead-email" className="md:text-lg">Correo electrónico</label>
                        <input
                            id="lead-email"
                            type="email"
                            value={leadForm.email}
                            onChange={(e) => setLeadForm(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full h-10 px-2 bg-white border border-black"
                            placeholder="tu@email.com"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={submitLead}
                        disabled={leadLoading || !leadForm.nombre || !leadForm.email}
                        className="mt-2 w-full px-4 py-2 bg-black text-white font-gillsans font-medium text-lg uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {leadLoading ? "Enviando..." : "Continuar"}
                    </button>
                </div>
            </Modal>
        </>
    );
};