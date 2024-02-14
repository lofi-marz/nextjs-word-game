import { ThemeProvider } from 'next-themes';

import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <Component {...pageProps} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}
