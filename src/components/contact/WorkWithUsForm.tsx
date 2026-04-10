'use client';

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from '@emailjs/browser';
import { useTranslations } from 'next-intl';
import { SubmitButtonLoading, FormErrorMessage } from "@/components";

export const WorkWithUsForm = () => {
    const t = useTranslations('forms.workWithUs');
    const tv = useTranslations('forms.validation');

    const schema = z.object({
        fullName: z.string().min(2, tv('fullNameMin')).max(50, tv('fullNameMax')).nonempty(tv('required')),
        phonenumber: z.string().min(7, tv('phoneMin')).max(20, tv('phoneMax')).nonempty(tv('required')),
        email: z.string().email(tv('emailInvalid')).nonempty(tv('required')),
        country: z.string().nonempty(tv('required')),
        region: z.string().nonempty(tv('required')),
        instagram: z.string().min(2, tv('instagramMin')).max(200, tv('instagramMax')).nonempty(tv('required')),
        address: z.string().min(5, tv('addressMin')).max(100, tv('addressMax')).optional(),
        addressNumber: z.string().min(1, tv('required')).max(25, tv('addressNumberMax')).optional(),
        message: z.string().min(20, tv('messageMin')).max(2000, tv('messageMax')).optional(),
    });

    type Schema = z.infer<typeof schema>;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSended, setIsSended] = useState<boolean>(false);
    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<Schema>({ resolver: zodResolver(schema) });
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
            const templateParams = {
                from_name: data.fullName,
                phone: data.phonenumber,
                from_email: data.email,
                instagram: data.instagram,
                country: data.country,
                region: data.region,
                address: data.address,
                addressNumber: data.addressNumber,
                message: data.message,
            };
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );
            reset();
            setIsSended(true);
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
                        <label htmlFor="fullName" className="md:text-lg">{t('fullName')} <span className="text-invalid text-xs relative right-1.5 bottom-1.5">*</span></label>
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
                        <label htmlFor="email" className="md:text-lg">{t('email')} <span className="text-invalid text-xs relative right-1.5 bottom-1.5">*</span></label>
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
                        <label htmlFor="phonenumber" className="md:text-lg">{t('phone')} <span className="text-invalid text-xs relative right-1.5 bottom-1.5">*</span></label>
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
                        <label htmlFor="instagram" className="md:text-lg">{t('instagram')} <span className="text-invalid text-xs relative right-1.5 bottom-1.5">*</span></label>
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
                        <label htmlFor="name" className="md:text-lg">{t('country')} <span className="text-invalid text-xs relative right-1.5 bottom-1.5">*</span></label>
                        <CountryDropdown
                            value={location.country}
                            onChange={handleCountryChange}
                            name="country"
                            id="country"
                            defaultOptionLabel={t('selectCountry')}
                            disabled={isLoading}
                            className="w-full h-10 px-3 bg-transparent border border-black outline-none focus-visible:outline-none disabled:text-black/75 appearance-none transition-150"
                        />
                    </div>
                    <FormErrorMessage condition={errors?.country} message={tv('required')} className="mt-2"/>
                </div>
                <div className="w-full">
                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="name" className="md:text-lg">{t('region')} <span className="text-invalid text-xs relative right-1.5 bottom-1.5">*</span></label>
                        <RegionDropdown
                            country={location.country}
                            value={location.region}
                            onChange={handleRegionChange}
                            name="region"
                            id="region"
                            disableWhenEmpty={true}
                            defaultOptionLabel={t('selectRegion')}
                            disabled={isLoading}
                            className="w-full h-10 px-3 bg-transparent border border-black outline-none focus-visible:outline-none disabled:text-black/75 appearance-none transition-150"
                        />
                    </div>
                    <FormErrorMessage condition={errors?.region} message={tv('required')} className="mt-2"/>
                </div>
                <div className="w-full">
                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="address" className="md:text-lg">{t('street')}</label>
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
                        <label htmlFor="addressNumber" className="md:text-lg">{t('number')}</label>
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
                    <label htmlFor="message" className="md:text-lg">{t('message')}</label>
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
            <div className="mt-4 w-full flex flex-col lg:flex-row lg:justify-between items-center gap-8">
                {isSended ? <p className="bg-yellow-300 text-center lg:text-start">{t('success')}</p> : <p></p>}
                <SubmitButtonLoading isLoading={isLoading} text={t('submit')} className="w-24"/>
            </div>
        </form>
    )
}