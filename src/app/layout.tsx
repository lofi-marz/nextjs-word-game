import { cn } from '@/utils/utils';
import { Providers } from './providers';
import { sans } from '@/styles/fonts';
import '../styles/globals.css';
import { Nav } from '../components';
export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    sans.variable,
                    'flex h-screen max-h-screen flex-col items-center justify-start bg-theme font-sans text-theme-invert'
                )}>
                <Providers>
                    <Nav />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
