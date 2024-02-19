'use client';
import { FaArrowsRotate, FaBacon, FaNetworkWired } from 'react-icons/fa6';
import { DarkModeToggle } from './DarkModeToggle';
import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { DialogTrigger } from 'react-aria-components';
import { HowToPlay } from './HowToPlay';
import { useGameStore } from '@/features/game/stores';

export function Nav() {
    const playedBefore = useGameStore((state) => state.playedBefore);
    return (
        <nav className="dark:bg-pattern-dark bg-pattern top-0 flex w-full flex-row justify-between p-4 text-xl">
            <div className="font-title group flex flex-row items-center justify-center pr-2 text-base  font-black transition-all sm:text-xl">
                Sem<span className="text-primary-400">Up</span>
                <span className="ml-2 rounded  bg-primary-400 px-1 text-sm">
                    beta
                </span>
            </div>
            <div className="flex flex-row items-center justify-center gap-4 text-xl ">
                <DarkModeToggle className="h-6" />
                {playedBefore || <HowToPlay />}
            </div>
        </nav>
    );
}
