"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from 'next-intl';
import { FormErrorMessage } from "@/components";
import { collections } from "@/data/collections";
import { CrossIcon } from "@/icons";

interface Props {
    preselectedMuralId: string;
}

export const QuoteForm = ({ preselectedMuralId }: Props) => {
    const t = useTranslations('forms.quote');
    const tv = useTranslations('forms.validation');

    const spaceSchema = z.object({
        largo: z.number({ invalid_type_error: tv('invalidNumber') }).min(0.01, tv('widthRequired')),
        alto: z.number({ invalid_type_error: tv('invalidNumber') }).min(0.01, tv('heightRequired')),
    });

    const schema = z.object({
        name: z.string().min(2, tv('nameMin')),
        email: z.string().email(tv('emailInvalid')),
        phone: z.string().min(6, tv('phoneMin')),
        collection: z.string().nonempty(tv('collectionRequired')),
        mural: z.string().nonempty(tv('muralRequired')),
        spaces: z.array(spaceSchema).min(1, tv('spacesMin')),
    });

    type Schema = z.infer<typeof schema>;

    const [isRendered, setIsRendered] = useState<boolean>(false);
    const { register, control, handleSubmit, watch, setValue, formState: { errors }, } = useForm<Schema>({ resolver: zodResolver(schema), defaultValues: { spaces: [{ largo: 0, alto: 0 }]}});

    const { fields, append, remove } = useFieldArray({ control, name: "spaces" });

    const selectedCollectionId = watch("collection");
    const selectedMuralId = watch("mural");
    const selectedCollection = collections.find(col => col.id === selectedCollectionId);
    const selectedMural = selectedCollection?.murales.find(m => m.id === selectedMuralId) ||
        collections.flatMap(col => col.murales).find(m => m.id === preselectedMuralId);

      useEffect(() => {
        const mural = collections.flatMap(col => col.murales).find(m => m.id === preselectedMuralId);
        if (mural) {
            setValue("collection", mural.collectionId);
            setIsRendered(true);
        }
    }, [preselectedMuralId, setValue]);

    useEffect(() => {
        if (isRendered) {
        const mural = collections.flatMap(col => col.murales).find(m => m.id === preselectedMuralId);
        if (mural) {
            setValue("mural", mural.id);
        }
        }
    }, [preselectedMuralId, setValue, isRendered]);

    const onSubmit = (data: Schema) => {
        const { name, email, phone, collection, mural, spaces } = data;

        const collectionName = collections.find(c => c.id === collection)?.title || "";
        const muralName = collections.flatMap(c => c.murales).find(m => m.id === mural)?.title || "";

        let message = t('whatsappGreeting', { name, mural: muralName, collection: collectionName }) + '%0A%0A';
        message += t('whatsappEmail', { email }) + '%0A';
        message += t('whatsappPhone', { phone }) + '%0A%0A';

        message += t('whatsappWalls') + '%0A';
        spaces.forEach((space, i) => {
            message += `• ${t('whatsappWall', { number: i + 1, width: space.largo, height: space.alto })}%0A`;
        });

        const whatsappNumber = "5491160208460";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 lg:px-12 flex flex-col lg:flex-row items-start gap-12 lg:gap-0">
            <div className="w-full max-w-md grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="w-full">
                    <label htmlFor="name" className="md:text-lg">{t('name')}</label>
                    <input
                        type='text'
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
                        type='text'
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
                        type='text'
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
                    <select className="w-full h-10 px-2 bg-white rounded-none border border-black" {...register("collection")}>
                        <option value="">{t('selectCollection')}</option>
                        { collections.map(collection => (
                            <option key={collection.id} value={collection.id}>{collection.title}</option>
                        ))}
                    </select>
                    <FormErrorMessage condition={errors?.collection} message={errors?.collection?.message} />
                </div>
                <div className="w-full">
                    <label className="md:text-lg">{t('mural')}</label>
                    <select className="w-full h-10 px-2 bg-white rounded-none border border-black" {...register("mural")}>
                        <option value="">{t('selectMural')}</option>
                        { selectedCollection?.murales.map(mural => (
                            <option key={mural.id} value={mural.id}>{mural.title}</option>
                        ))}
                    </select>
                    <FormErrorMessage condition={errors?.mural} message={errors?.mural?.message} />
                </div>
                <div className="w-full">
                    <p className="md:text-lg">{t('spaces')}</p>
                    <div className="mt-2 text-xs w-full flex gap-2">
                        <div className="grow">{t('width')}</div>
                        <div className="grow">{t('height')}</div>
                        <div className="w-4"></div>
                    </div>
                    <div className="w-[calc(100%+1rem)] max-h-48 pr-4 flex flex-col gap-2 overflow-y-auto">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 items-center">
                                <label className="sr-only" htmlFor={`spaces.${index}.largo`}>Largo</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Largo"
                                    className="w-full h-10 px-2 border border-black bg-white"
                                    {...register(`spaces.${index}.largo`, { valueAsNumber: true })}
                                />
                                <label className="sr-only" htmlFor={`spaces.${index}.alto`}>Alto</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Alto"
                                    className="w-full h-10 px-2 border border-black bg-white"
                                    {...register(`spaces.${index}.alto`, { valueAsNumber: true })}
                                />
                                <button type="button" disabled={fields.length <= 1} onClick={() => remove(index)} className="size-4 shrink-0">
                                    <CrossIcon className={`size-4 ${ fields.length <= 1 && "opacity-50" }`}/>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 flex justify-center lg:justify-start">
                        <button type="button" onClick={() => append({ largo: 0, alto: 0 })} className="text-sm text-black border border-black px-4 py-1">{t('addWall')}</button>
                    </div>
                </div>
                <div className="mt-4 lg:mt-0 w-full text-xl lg:text-base flex justify-center lg:justify-end items-center lg:items-end">
                    <button type="submit" className="mt-4 px-4 py-2 bg-black font-gillsans font-medium text-white text-lg uppercase">
                        {t('submit')}
                    </button>
                </div>
            </div>
            { selectedMural && (
                <div className="lg:pl-12 flex flex-col items-center gap-1">
                    <h2 className="w-full text-start font-gillsans font-light uppercase">
                        <span className="text-black/75">{t('preview')}</span>{" "}
                        <b className="font-medium">{selectedMural.title}</b>
                    </h2>
                    <Image src={selectedMural.variants[0].mural} alt={`${selectedMural.title} Mural`} width={1500} height={1500} className="w-full object-contain" />
                </div>
            )}
        </form>
    );
};