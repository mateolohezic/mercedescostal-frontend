"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormErrorMessage, Modal } from "@/components";
import { ImageCompare } from "@/components/visualizer/ImageCompare";
import { collections } from "@/data/collections";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const POLL_INTERVAL = 3000;
const MAX_POLL_ATTEMPTS = 60;

const schema = z.object({
    collection: z.string().nonempty("Selecciona una colección"),
    mural: z.string().nonempty("Selecciona un mural"),
    variant: z.string().optional(),
});

type Schema = z.infer<typeof schema>;

interface Props {
    preselectedMuralId?: string;
}

type GenerationStatus = "idle" | "processing" | "completed" | "error" | "limit_reached";

interface HistoryEntry {
    taskId: string;
    muralTitle: string;
    colorName: string;
    collectionTitle: string;
    createdAt: string;
}

const HISTORY_KEY = "mc_visualizer_history";
const MAX_HISTORY = 10;

function getHistory(): HistoryEntry[] {
    try {
        return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    } catch {
        return [];
    }
}

function addToHistory(entry: HistoryEntry) {
    const history = getHistory();
    history.unshift(entry);
    if (history.length > MAX_HISTORY) history.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
}

function deleteCookie(name: string) {
    document.cookie = `${name}=; path=/; max-age=0`;
}

export const VisualizerForm = ({ preselectedMuralId }: Props) => {
    const [isRendered, setIsRendered] = useState(false);
    const [userDescription, setUserDescription] = useState("");
    const [roomImage, setRoomImage] = useState<File | null>(null);
    const [roomImagePreview, setRoomImagePreview] = useState<string | null>(null);
    const [status, setStatus] = useState<GenerationStatus>("idle");
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [generationsRemaining, setGenerationsRemaining] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [selectedHistoryEntry, setSelectedHistoryEntry] = useState<HistoryEntry | null>(null);

    const [showLeadModal, setShowLeadModal] = useState(false);
    const [leadForm, setLeadForm] = useState({ nombre: "", email: "" });
    const [leadLoading, setLeadLoading] = useState(false);
    const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
    const [showCompare, setShowCompare] = useState(false);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Schema>({ resolver: zodResolver(schema), defaultValues: { collection: "", mural: "", variant: "" } });

    const selectedCollectionId = watch("collection");
    const selectedMuralId = watch("mural");
    const selectedVariantIndex = watch("variant");

    const selectedCollection = collections.find(col => col.id === selectedCollectionId);
    const selectedMural = selectedCollection?.murales.find(m => m.id === selectedMuralId) || collections.flatMap(col => col.murales).find(m => m.id === preselectedMuralId);
    const selectedVariant = selectedMural?.variants[parseInt(selectedVariantIndex || "0")] || selectedMural?.variants[0];

    const stopPolling = useCallback(() => {
        if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
        }
    }, []);

    const startPolling = useCallback((taskId: string, muralTitle?: string, colorName?: string, collectionTitle?: string) => {
        stopPolling();
        let attempts = 0;
        console.log("[Polling] Iniciando polling para task:", taskId);

        pollingRef.current = setInterval(async () => {
            attempts++;
            console.log(`[Polling] Intento ${attempts}/${MAX_POLL_ATTEMPTS} para task ${taskId}`);

            if (attempts > MAX_POLL_ATTEMPTS) {
                console.log("[Polling] Máximo de intentos alcanzado, abortando");
                stopPolling();
                deleteCookie("mc_pending_task");
                setStatus("error");
                setErrorMessage("La generación tardó demasiado. Intentá nuevamente.");
                return;
            }

            try {
                const res = await fetch(`/api/visualizer/${taskId}`);
                const data = await res.json();
                console.log(`[Polling] Respuesta:`, data.status, data.imageUrl ? "(con imagen)" : "(sin imagen)");

                if (data.status === "COMPLETED" && data.imageUrl) {
                    console.log("[Polling] Task completado! URL:", data.imageUrl);
                    stopPolling();
                    localStorage.removeItem("mc_pending_task_meta");
                    const downloadName = encodeURIComponent(`Montaje ${muralTitle || "Mural"} Coleccion ${collectionTitle || ""}`.trim());
                    setResultImage(`/api/visualizer/image/${taskId}?filename=${downloadName}`);
                    setStatus("completed");
                    const entry: HistoryEntry = {
                        taskId,
                        muralTitle: muralTitle || "Mural",
                        colorName: colorName || "",
                        collectionTitle: collectionTitle || "",
                        createdAt: new Date().toISOString(),
                    };
                    addToHistory(entry);
                    setHistory(getHistory());
                } else if (data.status === "FAILED") {
                    console.log("[Polling] Task falló");
                    stopPolling();
                    localStorage.removeItem("mc_pending_task_meta");
                    setStatus("error");
                    setErrorMessage("La generación falló. Intentá nuevamente.");
                }
            } catch (err) {
                console.warn("[Polling] Error transitorio, reintentando:", err);
            }
        }, POLL_INTERVAL);
    }, [stopPolling]);

    // Recover pending task and load history on mount
    useEffect(() => {
        setHistory(getHistory());
        const pendingTaskId = getCookie("mc_pending_task");
        if (pendingTaskId) {
            setStatus("processing");
            try {
                const meta = JSON.parse(localStorage.getItem("mc_pending_task_meta") || "{}");
                startPolling(pendingTaskId, meta.muralTitle, meta.colorName, meta.collectionTitle);
            } catch {
                startPolling(pendingTaskId);
            }
        }
    }, [startPolling]);

    // Cleanup on unmount
    useEffect(() => {
        return () => stopPolling();
    }, [stopPolling]);

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
        if (status === "completed") {
            setResultImage(null);
            setStatus("idle");
        }
    }, [selectedMuralId, setValue]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setErrorMessage(null);
        if (!file) return;
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
            setErrorMessage("El formato de imagen no es compatible. Usá una foto en JPG, PNG o WebP.");
            return;
        }
        if (file.size > MAX_FILE_SIZE) {
            setErrorMessage("La imagen es demasiado grande. Por favor, subí una foto de hasta 5MB.");
            return;
        }
        if (roomImagePreview) URL.revokeObjectURL(roomImagePreview);
        setRoomImage(file);
        setRoomImagePreview(URL.createObjectURL(file));
        setResultImage(null);
        setStatus("idle");
    };

    const clearRoomImage = () => {
        if (roomImagePreview) URL.revokeObjectURL(roomImagePreview);
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
                handleSubmit(onSubmit)();
            }
        } catch (error) {
            console.error("Error enviando lead:", error);
        } finally {
            setLeadLoading(false);
        }
    };

    const onSubmit = async () => {
        if (status === "processing") return;
        if (!roomImage) {
            setErrorMessage("Subí una foto de tu espacio para poder generar la visualización.");
            return;
        }
        const muralUrl = getMuralImageUrl();
        if (!muralUrl) {
            setErrorMessage("Seleccioná un mural para poder generar la visualización.");
            return;
        }

        stopPolling();
        setStatus("processing");
        setErrorMessage(null);
        setResultImage(null);
        setFeedback(null);
        setShowCompare(false);

        try {
            const isPattern = selectedMural?.keywords.some(k => ['patrón', 'patron', 'pattern'].includes(k.toLowerCase())) || false;
            const formData = new FormData();
            formData.append("userDescription", userDescription);
            formData.append("roomImage", roomImage);
            formData.append("muralImageUrl", muralUrl);
            formData.append("isPattern", isPattern.toString());
            formData.append("muralId", selectedMural?.id || "");
            formData.append("muralTitle", selectedMural?.title || "");
            formData.append("collectionId", selectedCollection?.id || "");
            formData.append("collectionTitle", selectedCollection?.title || "");
            formData.append("colorName", selectedVariant?.colorName || "");

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

            if (data.taskId) {
                console.log("[Visualizer] Task recibido:", data.taskId, "| Restantes:", data.generationsRemaining);
                setCurrentTaskId(data.taskId);
                setGenerationsRemaining(data.generationsRemaining);
                localStorage.setItem("mc_pending_task_meta", JSON.stringify({
                    muralTitle: selectedMural?.title || "",
                    colorName: selectedVariant?.colorName || "",
                    collectionTitle: selectedCollection?.title || "",
                }));
                startPolling(data.taskId, selectedMural?.title, selectedVariant?.colorName, selectedCollection?.title);
            } else {
                console.error("[Visualizer] Respuesta sin taskId:", data);
                setStatus("error");
                setErrorMessage("No se recibió ID de tarea");
            }

        } catch (error) {
            console.error("[Visualizer] Error:", error);
            setStatus("error");
            setErrorMessage("Algo salió mal al generar la visualización. Por favor, intentá de nuevo.");
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
                                <img src={roomImagePreview} alt="Tu espacio" className="w-full object-contain border border-black" />
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
                        <label className="md:text-lg">¿Dónde querés aplicar el mural?</label>
                        <textarea
                            value={userDescription}
                            onChange={(e) => setUserDescription(e.target.value)}
                            className="w-full h-24 p-2 bg-white border border-black resize-none"
                            placeholder="Ej: En la pared del fondo, detrás del sillón. Que cubra toda la pared de piso a techo."
                        />
                    </div>
                    <div className="w-full">
                        <label className="md:text-lg">Colección</label>
                        <select className="w-full h-10 px-2 bg-white rounded-none border border-black" {...register("collection")}>
                            <option value="">Selecciona una colección</option>
                            {[...collections].sort((a, b) => a.title.localeCompare(b.title)).map(collection => <option key={collection.id} value={collection.id}>{collection.title}</option>)}
                        </select>
                        <FormErrorMessage condition={errors?.collection} message={errors?.collection?.message} />
                    </div>
                    <div className="w-full">
                        <label className="md:text-lg">Mural</label>
                        <select className="w-full h-10 px-2 bg-white rounded-none border border-black" {...register("mural")} disabled={!selectedCollection}>
                            <option value="">Selecciona un mural</option>
                            {selectedCollection?.murales && [...selectedCollection.murales].sort((a, b) => a.title.localeCompare(b.title)).map(mural => <option key={mural.id} value={mural.id}>{mural.title}</option>)}
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
                        <button type="submit" disabled={status === "processing" || status === "limit_reached"} className="px-6 py-2 bg-black font-gillsans font-medium text-white text-lg uppercase disabled:opacity-50 disabled:cursor-not-allowed">
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
                            <p className="text-sm text-black/40">Esto puede tomar hasta 2 minutos</p>
                        </div>
                    )}
                    {status === "completed" && resultImage && (
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <h2 className="font-gillsans font-light uppercase">
                                    <span className="text-black/75">Resultado</span>{" "}
                                    <b className="font-medium">{selectedMural?.title} - {selectedVariant?.colorName}</b>
                                </h2>
                                {roomImagePreview && (
                                    <button
                                        type="button"
                                        onClick={() => setShowCompare(!showCompare)}
                                        className={`px-3 py-1.5 text-xs font-gillsans uppercase border transition-colors ${showCompare ? "bg-black text-white border-black" : "border-black/30 text-black/60 hover:border-black hover:text-black"}`}
                                    >
                                        {showCompare ? "Ver resultado" : "Comparar"}
                                    </button>
                                )}
                            </div>
                            {showCompare && roomImagePreview ? (
                                <ImageCompare
                                    beforeSrc={roomImagePreview}
                                    afterSrc={resultImage}
                                    beforeLabel="Tu espacio"
                                    afterLabel="Con mural"
                                />
                            ) : (
                                <img src={resultImage} alt="Visualización del mural" className="w-full object-contain border border-black" />
                            )}
                            <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-black/50">¿Te resultó útil?</span>
                                    <button
                                        type="button"
                                        onClick={() => { setFeedback("up"); if (currentTaskId) fetch("/api/visualizer/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ taskId: currentTaskId, feedback: "up" }) }).catch(() => {}); }}
                                        className={`p-1.5 border transition-colors ${feedback === "up" ? "bg-black text-white border-black" : "border-black/20 text-black/40 hover:border-black hover:text-black"}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setFeedback("down"); setShowFeedbackModal(true); if (currentTaskId) fetch("/api/visualizer/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ taskId: currentTaskId, feedback: "down" }) }).catch(() => {}); }}
                                        className={`p-1.5 border transition-colors ${feedback === "down" ? "bg-black text-white border-black" : "border-black/20 text-black/40 hover:border-black hover:text-black"}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z" />
                                        </svg>
                                    </button>
                                    {feedback === "up" && <span className="text-xs text-black/40">¡Gracias!</span>}
                                </div>
                                <a
                                    href={resultImage}
                                    download={`Montaje ${selectedMural?.title || "Mural"} Coleccion ${selectedCollection?.title || ""}.jpg`.trim()}
                                    className="px-4 py-2 border border-black font-gillsans text-sm uppercase hover:bg-black hover:text-white transition-colors"
                                >
                                    Descargar imagen
                                </a>
                            </div>
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
            <div className="w-full mt-12 p-6 bg-black/[0.03] border border-black/10">
                <h4 className="font-gillsans font-medium text-sm uppercase tracking-wider mb-1">Información importante sobre las visualizaciones</h4>
                <ul className="list-disc list-inside space-y-0.5 text-sm text-black/60 leading-relaxed">
                    <li>Las imágenes son generadas por <b className="text-black/70">inteligencia artificial</b> y tienen carácter <b className="text-black/70">orientativo</b>. No representan el resultado final exacto de la instalación.</li>
                    <li>El espacio original puede presentar <b className="text-black/70">alteraciones en la iluminación, los colores y las proporciones</b> respecto a la foto subida.</li>
                    <li>El diseño del mural en la visualización puede incluir <b className="text-black/70">variaciones o detalles</b> que no necesariamente se reproducirán en el producto real.</li>
                    <li>Los colores pueden variar según la <b className="text-black/70">calibración de tu pantalla</b> y las condiciones de luz del ambiente donde se instale.</li>
                    <li>Al confirmar tu pedido, recibirás un <b className="text-black/70">preview fiel y a escala real</b> del mural para tu revisión y aprobación antes de la producción.</li>
                    <li>Esta visualización <b className="text-black/70">no constituye un compromiso de compra</b> ni garantiza disponibilidad del producto.</li>
                </ul>
            </div>
            {history.length > 0 && (
                <div className="w-full mt-16">
                    <div className="flex flex-col lg:flex-row items-start gap-6">
                        <div className="w-full lg:w-1/2">
                            <h3 className="font-gillsans font-light text-lg uppercase mb-4">
                                <span className="text-black/75">Historial de</span>{" "}
                                <b className="font-medium">visualizaciones</b>
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                                {history.map((entry) => (
                                    <button
                                        key={entry.taskId}
                                        type="button"
                                        onClick={() => setSelectedHistoryEntry(entry)}
                                        className={`group flex flex-col gap-1 text-left ${selectedHistoryEntry?.taskId === entry.taskId ? "opacity-50" : ""}`}
                                    >
                                        <img
                                            src={`/api/visualizer/image/${entry.taskId}`}
                                            alt={`${entry.muralTitle} - ${entry.colorName}`}
                                            className="w-full aspect-video object-cover border border-black/20 group-hover:border-black transition-colors"
                                        />
                                        <span className="text-xs text-black/60 truncate">{entry.muralTitle}{entry.colorName ? ` - ${entry.colorName}` : ""}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        {selectedHistoryEntry && (
                            <div className="w-full lg:w-1/2 flex flex-col gap-2">
                                <h3 className="font-gillsans font-light text-lg uppercase mb-4">
                                    <span className="text-black/75">Resultado</span>{" "}
                                    <b className="font-medium">{selectedHistoryEntry.muralTitle}{selectedHistoryEntry.colorName ? ` - ${selectedHistoryEntry.colorName}` : ""}</b>
                                </h3>
                                <img
                                    src={`/api/visualizer/image/${selectedHistoryEntry.taskId}`}
                                    alt={`${selectedHistoryEntry.muralTitle} - ${selectedHistoryEntry.colorName}`}
                                    className="w-full object-contain"
                                />
                                <a
                                    href={`/api/visualizer/image/${selectedHistoryEntry.taskId}?filename=${encodeURIComponent(`Montaje ${selectedHistoryEntry.muralTitle} ${selectedHistoryEntry.collectionTitle || ""}`.trim())}`}
                                    download={`Montaje ${selectedHistoryEntry.muralTitle} Coleccion ${selectedHistoryEntry.collectionTitle || ""}.jpg`.trim()}
                                    className="mt-2 self-end px-4 py-2 border border-black font-gillsans text-sm uppercase hover:bg-black hover:text-white transition-colors"
                                >
                                    Descargar imagen
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
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
            <Modal showModal={showFeedbackModal} setShowModal={setShowFeedbackModal} className="max-w-md p-8">
                <h3 className="font-gillsans font-medium text-xl mb-2">Lamentamos que el resultado no haya sido el esperado</h3>
                <p className="text-black/70 mb-4">Sabemos que la visualización con inteligencia artificial no siempre es perfecta a la primera. Cada espacio y cada mural son únicos, y a veces se necesita más de un intento para lograr el resultado ideal.</p>
                <p className="text-black/70 mb-6">Te regalamos <b>3 visualizaciones adicionales</b> para que puedas seguir probando con otra foto, otro ángulo, o una descripción más detallada del espacio.</p>
                <button
                    type="button"
                    onClick={async () => {
                        try {
                            const res = await fetch("/api/visualizer/bonus", { method: "POST" });
                            const data = await res.json();
                            if (data.success) {
                                setGenerationsRemaining(data.generationsRemaining);
                            }
                        } catch {}
                        setShowFeedbackModal(false);
                    }}
                    className="w-full px-4 py-2 bg-black text-white font-gillsans font-medium text-lg uppercase"
                >
                    Obtener 3 visualizaciones más
                </button>
            </Modal>
        </>
    );
};
