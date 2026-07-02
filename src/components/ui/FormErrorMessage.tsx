'use client'

import { motion, AnimatePresence } from "framer-motion";
import { FieldError } from "react-hook-form";
import { useTranslations } from 'next-intl';

interface Props {
    condition: FieldError | boolean | undefined;
    message?: string;
    className?: string;
}

// Si el `message` viene con formato "purchase.errors.X" (o similar con punto),
// asumimos que es una key i18n y la resolvemos. Esto permite a los schemas Zod
// guardar keys en lugar de strings hardcoded en español.
function useResolvedMessage(message?: string): string | undefined {
    // Hooks deben llamarse siempre — devolvemos un translator que maneja todas las namespaces.
    const tPurchase = useTranslations('purchase');
    if (!message) return undefined;

    // Detectamos namespaces conocidos al inicio del string.
    if (message.startsWith('errors.')) {
        try {
            return tPurchase(message);
        } catch {
            return message;
        }
    }
    return message;
}

export const FormErrorMessage = ({ condition, message, className }: Props) => {
    const resolved = useResolvedMessage(message);
    return (
        <AnimatePresence>
            {condition && (
                <motion.p
                    initial={{ x: 50, opacity: 0, height: 0 }}
                    animate={{ x: 0, opacity: 1, height: 16 }}
                    exit={{ x: 50, opacity: 0, height: 0, margin: 0 }}
                    className={`w-full text-invalid text-sm ${className}`}
                >
                    {resolved || message}
                </motion.p>
            )}
        </AnimatePresence>
    );
};
