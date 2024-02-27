'use client';

import { Button } from 'react-aria-components';
import { DialogControlProps, ModalDialog } from './ModalDialog';
import { useEffect, useState } from 'react';
import { MAX_LIVES } from '@/features/game/consts';
import { useGameStore } from '@/features/game/stores';

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
                <h4>Harmony, Discord, Slack</h4>
                <ul>
                    <li>Harmony -&gt; Discord: Antonyms</li>
                    <li>Discord -&gt; Slack: Communcation Platforms</li>
                </ul>
                Each puzzle has exactly one solution, so watch out for words
                that look like they may connect to multiple words. You have{' '}
                {MAX_LIVES} lives. Good luck! If you liked this game, say{' '}
                <a href="https://twitter.com/marile0n">hi :)</a>
            </ModalDialog>
        </>
    );
}
