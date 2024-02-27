'use client';

import { Button } from 'react-aria-components';
import { DialogControlProps, ModalDialog } from './ModalDialog';
import { useEffect, useState } from 'react';
import { MAX_LIVES } from '@/features/game/consts';
import { useGameStore } from '@/features/game/stores';
import { WithChildrenProps } from '@/types';
function Bold({ children }: WithChildrenProps) {
    return (
        <span className="rounded-full bg-primary-400 px-2 py-1 font-semibold text-light">
            {children}
        </span>
    );
}
export function HowToPlay() {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <Button
                onPress={() => setDialogOpen(true)}
                className="aspect-square h-full rounded bg-primary-400 font-bold">
                ?
            </Button>
            <ModalDialog
                title="How to Play"
                isOpen={dialogOpen}
                onOpenChange={(value) => {
                    setDialogOpen(value);
                }}>
                Link each word to the next e.g.:
                <h4 className="mx-auto flex flex-row flex-wrap gap-3">
                    <Bold>Harmony</Bold>
                    <Bold>Discord</Bold>
                    <Bold>Slack</Bold>
                </h4>
                <ul>
                    <li>
                        <Bold>Harmony</Bold> → <Bold>Discord</Bold> : Antonyms
                    </li>
                    <li>
                        <Bold>Discord</Bold> → <Bold>Slack</Bold> : Communcation
                        Platforms
                    </li>
                </ul>
                Each puzzle has exactly one solution, so watch out for words
                that look like they may connect to multiple words. You have{' '}
                {MAX_LIVES} lives. Good luck!{' '}
                <p>
                    If you liked this game, or if you have any feedback, say{' '}
                    <a href="https://twitter.com/marile0n">hi :)</a>
                </p>
            </ModalDialog>
        </>
    );
}
