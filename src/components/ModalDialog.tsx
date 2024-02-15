'use client';

import { useState, type PropsWithChildren } from 'react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { WithClassNameProps } from '@/types';
import { cn } from '@/utils/utils';

import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components';
export function useDialogControls(startOpen = false) {
    const [open, setOpen] = useState(startOpen);
    return [open, () => setOpen(true), () => setOpen(false)] as const;
}

export type DialogControlProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
};
type DialogBoxProps = PropsWithChildren<{
    title?: string;
    hideClose?: boolean;
}> &
    WithClassNameProps &
    DialogControlProps;

const dialogBoxContainerVariants: Variants = {
    hide: { opacity: 1 },
    show: { opacity: 1, transition: { when: 'beforeChildren' } },
};

const dialogBoxVariants: Variants = {
    hide: { opacity: 1 },
    show: { opacity: 1, transition: { ease: 'easeOut' } },
};

const MotionModal = motion(Modal);
const MotionModalOverlay = motion(ModalOverlay);
export function ModalDialog({
    isOpen,
    onOpenChange,
    title,
    children,
    className,
    hideClose = false,
}: DialogBoxProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <MotionModalOverlay
                    isOpen
                    onOpenChange={onOpenChange}
                    className="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-black/50 px-2 text-xl lg:pt-24"
                    variants={dialogBoxContainerVariants}
                    initial="hide"
                    animate="show"
                    exit="hide">
                    <MotionModal
                        className={cn(
                            'relative -mt-24 flex w-full max-w-xl flex-col  items-center justify-center gap-6  rounded bg-theme font-sans text-base text-theme-invert outline-none drop-shadow',
                            className
                        )}
                        variants={dialogBoxVariants}>
                        <Dialog className="flex h-full w-full flex-col items-center gap-6 rounded p-12">
                            {title && (
                                <Heading
                                    className="py-3 text-xl font-bold lg:text-3xl"
                                    slot="title">
                                    {title}
                                </Heading>
                            )}
                            {hideClose || (
                                <button
                                    className="absolute right-0 top-0 p-4 transition-all hover:text-theme"
                                    onClick={() => onOpenChange(false)}>
                                    <FaTimes />
                                </button>
                            )}

                            <motion.div className="prose-headings:heading prose prose-stone prose-invert flex w-full flex-col gap-4">
                                {children}
                            </motion.div>
                        </Dialog>
                    </MotionModal>
                </MotionModalOverlay>
            )}
        </AnimatePresence>
    );
}
