'use client';

import { ThemeProvider } from 'next-themes';
import { WithChildrenProps } from 'types';

export function Providers({ children }: WithChildrenProps) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
        </ThemeProvider>
    );
}
