import { ModalDialog } from '@/components/ModalDialog';

import { exportGame } from '../utils';
import { FaClipboard } from 'react-icons/fa6';
import { Button } from 'react-aria-components';
import { useEffect, useState } from 'react';
import { toastQueue } from '@/components/toast';

export function GameEndDialog({
    day,
    correctPath,
    userPath,
    gameEndState,
}: {
    day: number;
    userPath: string[];
    correctPath: string[];
    gameEndState: 'win' | 'lose' | null;
}) {
    console.log('End state:', gameEndState);

    const title = gameEndState === 'win' ? 'Congrats! 🎉' : 'Nice try...';
    const shareMessage = exportGame(userPath, correctPath, 0);

    const [isOpen, setIsOpen] = useState(Boolean(gameEndState));

    const copy = () => {
        try {
            navigator.clipboard.writeText(shareMessage);
            toastQueue.add('📋 Share message copied', { timeout: 2000 });
        } catch (e) {
            console.log('Error copying message');
        }
    };
    return (
        <>
            {gameEndState && <Button>Results</Button>}
            <ModalDialog title={title} isOpen={isOpen} onOpenChange={setIsOpen}>
                <div className="relative whitespace-pre rounded bg-grey-50/10 p-5 text-center font-mono text-xs sm:text-lg">
                    {shareMessage}
                </div>
                <Button
                    className="mx-auto flex w-fit flex-row items-center justify-center gap-2 rounded-full bg-primary-400 px-4 py-2 font-semibold text-light transition-all hover:scale-105 pressed:scale-95"
                    onPress={copy}>
                    Copy <FaClipboard />
                </Button>
            </ModalDialog>
        </>
    );
}
