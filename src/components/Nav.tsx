import { FaArrowsRotate, FaBacon, FaNetworkWired } from 'react-icons/fa6';
import { DarkModeToggle } from './DarkModeToggle';
import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'hooks/useMediaQuery';

export function Nav() {
    return (
        <nav className="dark:bg-pattern-dark bg-pattern top-0 flex w-full flex-row justify-between p-4 text-xl">
            <div className="font-title group flex flex-row items-center justify-center   gap-[0.75ch] pr-2 text-base font-bold transition-all sm:text-xl">
                Stackaword
            </div>
            <div className="flex flex-row items-center justify-center gap-4 text-xl ">
                <DarkModeToggle className="h-6" />
            </div>
        </nav>
    );
}
