'use client'

import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CrossIcon } from '@/icons';

interface Props{
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    className?: string;
    children: ReactNode;
}

export const Modal = ({showModal, setShowModal, children, className}:Props) => {

    useEffect(() => {
        if(showModal) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowModal(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.classList.remove('overflow-hidden');
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [showModal, setShowModal]);

    return (
        <AnimatePresence>
        {
            showModal &&
            <div className='w-full h-dvh fixed top-0 left-0 z-[99999999] overflow-y-scroll'>
                <div className={`w-full min-h-dvh px-24 pt-24 pb-24 flex justify-center items-center`}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.125 }}
                        className="w-full h-dvh bg-gradient-to-br from-black/50 to to-black fixed top-0 left-0 z-10"
                        onClick={ () => { setShowModal(false) }}
                    ></motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0, transition: { delay: 0 } }}
                        transition={{
                            opacity: { delay: 0.1875 },
                            scale: { delay: 0.1875 },
                        }}
                        className={`w-full bg-white relative z-50 ${className}`}
                    >
                        <button onClick={ () => { setShowModal(false) }} type={"button"} aria-label={'Cerrar'} className="size-12 text-black hover:text-black/75 flex justify-center items-center absolute top-6 right-6 z-[9999999999] transition-all duration-200 ease-in-out">
                            <span className="sr-only">Cerrar</span>
                            <CrossIcon className="size-8"/>
                        </button>
                        <div className="size-full overflow-hidden flex flex-col">
                            { children }
                        </div>
                    </motion.div>
                </div>
            </div>
        }
        </AnimatePresence>
    )
}
