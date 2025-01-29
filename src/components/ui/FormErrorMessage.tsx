'use client'

import { motion, AnimatePresence } from "framer-motion";
import { FieldError } from "react-hook-form";

interface Props{
    condition: FieldError | boolean | undefined;
    message?: string;
    className?: string
}

export const FormErrorMessage = ({condition, message="Campo requerido.", className}:Props) => {
    return (
        <AnimatePresence>
            {
                condition && (
                    <motion.p
                        initial={{x:50, opacity: 0, height: 0}}
                        animate={{x:0, opacity:1, height: 16}}
                        exit={{x:50, opacity: 0, height: 0, margin: 0}}
                        className={`w-full text-invalid text-sm ${className}`}
                    >
                        {message}
                    </motion.p>
                )
            }
        </AnimatePresence>
    )
}