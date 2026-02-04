"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from 'next-intl';
import { FormErrorMessage } from "@/components";
import { collections } from "@/data/collections";

interface Props {
    preselectedMuralId?: string;
}

export const ArtScreenQuoteForm = ({ preselectedMuralId = "" }: Props) => {
    const t = useTranslations('forms.artScreenQuote');
    const tv = useTranslations('forms.validation');

    const schema = z.object({
        name: z.string().min(2, tv('nameMin')),
        email: z.string().email(tv('emailInvalid')),
        phone: z.string().min(6, tv('phoneMin')),
        collection: z.string().nonempty(tv('collectionRequired')),
        mural: z.string().nonempty(tv('muralRequired')),
        sheets: z.number({ invalid_type_error: t('selectSheets') }).min(2).max(6),
        model: z.enum(["recto", "curvo"], { required_error: t('selectModel') }),
    });

    type Schema = z.infer<typeof schema>;

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
        const modelName = model === "recto" ? t('modelStraight') : t('modelCurved');

        let message = `${t('whatsappGreeting', { name })}%0A%0A`;
        message += `*${t('whatsappDesign', { mural: muralName, collection: collectionName })}*%0A`;
        message += `*${t('whatsappSheets', { sheets: String(sheets) })}*%0A`;
        message += `*${t('whatsappModel', { model: modelName })}*%0A`;
        message += `*${t('whatsappDimensions', { width: String(sheets * 50) })}*%0A%0A`;
        message += `${t('whatsappEmail', { email })}%0A`;
        message += `${t('whatsappPhone', { phone })}`;

        const whatsappNumber = "5491160208460";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
        window.open(whatsappUrl, "_blank");
    };

    const totalWidth = (sheets || 2) * 50;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 lg:px-12 flex flex-col lg:flex-row items-start gap-12 lg:gap-0">
            <h1 className="sr-only">{t('srTitle')}</h1>
            <div className="w-full max-w-md grid grid-cols-1 gap-4">
                <div className="w-full">
                    <label htmlFor="name" className="md:text-lg">{t('name')}</label>
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
                    <label htmlFor="email" className="md:text-lg">{t('email')}</label>
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
                    <label htmlFor="phone" className="md:text-lg">{t('phone')}</label>
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
                <div className="w-full">
                    <label className="md:text-lg">{t('collection')}</label>
                    <select
                        className="w-full h-10 px-2 bg-white rounded-none border border-black"
                        {...register("collection")}
                    >
                        <option value="">{t('selectCollection')}</option>
                        {collections.map(collection => (
                            <option key={collection.id} value={collection.id}>{collection.title}</option>
                        ))}
                    </select>
                    <FormErrorMessage condition={errors?.collection} message={errors?.collection?.message} />
                </div>
                <div className="w-full">
                    <label className="md:text-lg">{t('muralDesign')}</label>
                    <select
                        className="w-full h-10 px-2 bg-white rounded-none border border-black"
                        {...register("mural")}
                    >
                        <option value="">{t('selectDesign')}</option>
                        {selectedCollection?.murales.map(mural => (
                            <option key={mural.id} value={mural.id}>{mural.title}</option>
                        ))}
                    </select>
                    <FormErrorMessage condition={errors?.mural} message={errors?.mural?.message} />
                </div>
                <div className="w-full">
                    <label className="md:text-lg">{t('sheets')}</label>
                    <select
                        className="w-full h-10 px-2 bg-white rounded-none border border-black"
                        {...register("sheets", { valueAsNumber: true })}
                    >
                        <option value={2}>{t('sheetsOption', { count: '2', width: '100' })}</option>
                        <option value={3}>{t('sheetsOption', { count: '3', width: '150' })}</option>
                        <option value={4}>{t('sheetsOption', { count: '4', width: '200' })}</option>
                        <option value={5}>{t('sheetsOption', { count: '5', width: '250' })}</option>
                        <option value={6}>{t('sheetsOption', { count: '6', width: '300' })}</option>
                    </select>
                    <p className="mt-1 text-xs text-black/60">{t('sheetsHelper')}</p>
                    <FormErrorMessage condition={errors?.sheets} message={errors?.sheets?.message} />
                </div>
                <div className="w-full">
                    <label className="md:text-lg">{t('model')}</label>
                    <div className="mt-2 flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="recto"
                                className="w-4 h-4 accent-black"
                                {...register("model")}
                            />
                            <span>{t('modelStraight')}</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="curvo"
                                className="w-4 h-4 accent-black"
                                {...register("model")}
                            />
                            <span>{t('modelCurved')}</span>
                        </label>
                    </div>
                    <FormErrorMessage condition={errors?.model} message={errors?.model?.message} />
                </div>
                <div className="mt-4 lg:mt-0 w-full text-xl lg:text-base flex justify-center lg:justify-end items-center lg:items-end">
                    <button type="submit" className="mt-4 px-4 py-2 bg-black font-gillsans font-medium text-white text-lg uppercase">
                        {t('submit')}
                    </button>
                </div>
            </div>
            {selectedMural && (
                <div className="lg:pl-12 flex flex-col items-center gap-1">
                    <h2 className="w-full text-start font-gillsans font-light uppercase">
                        <span className="text-black/75">{t('preview')}</span>{" "}
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
                        <p>{t('previewConfig', { sheets: String(sheets || 2) })} {model ? `• ${t('previewModel', { model: model === 'recto' ? t('modelStraight') : t('modelCurved') })}` : ""}</p>
                        <p>{t('previewDimensions', { width: String(totalWidth) })}</p>
                    </div>
                </div>
            )}
        </form>
    );
};
