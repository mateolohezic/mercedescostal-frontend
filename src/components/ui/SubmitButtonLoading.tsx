'use client'

import { SpinnerIcon } from '@/icons';

interface Props{
    isLoading: boolean;
    text: string;
    className?: string;
    form?: string;
}

export const SubmitButtonLoading = ({isLoading, text, form, className}:Props) => {
    return (
        <button
            type="submit"
            form={form}
            disabled={isLoading}
            className={`uppercase border border-transparent hover:border-b-black disabled:hover:border-b-transparent ${className}`}
        >
            {
                isLoading ?
                    <SpinnerIcon className="animate-spin size-6"/>
                :
                    text
            }
        </button>
    )
}