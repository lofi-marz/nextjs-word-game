'use client';

import { DialogControlProps, ModalDialog } from './ModalDialog';
import { useState } from 'react';

export function HowToPlay() {
    const [dialogOpen, setDialogOpen] = useState(true);
    return (
        <ModalDialog
            title="How to Play"
            isOpen={dialogOpen}
            onOpenChange={setDialogOpen}>
            Link each word to the next e.g.:
            <h4>Harmony, Discord, Slack</h4>
            <ul>
                <li>Harmony -&gt; Discord: Antonyms</li>
                <li>Discord -&gt; Slack: Communcation Platforms</li>
            </ul>
            Each puzzle has exactly one solution, so watch out for words that
            look like they may connect to multiple words
        </ModalDialog>
    );
}
