import { GlobalToastRegion } from '@/components/toast';
import { GameScreen } from '@/features/game/components';
import { games } from '@/features/game/games';
import { getGameRound } from '@/features/game/utils';
import { createClient } from '@/utils/supabase/server';
import { Metadata } from 'next'; // if using TypeScript
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';
import Link from 'next/link';
import { GameConfig } from '@/features/game/types';
export const metadata: Metadata = {
    openGraph: {
        title: 'SemUp',
        description: 'Can you find the connections?',
        url: 'https://sup.omarileon.me/',
        siteName: 'SemUp',
        images: [
            {
                url: 'https://sup.omarileon.me/og.png',
                width: 1280,
                height: 720,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
};

/*try {
    ZGameConfig.safeParse(game);
} catch (e) {
    console.log('Invalid game');
}*/

export default async function Index({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    //console.log('Rounds:', rounds);
    const { count } = await supabase
        .from('rounds')
        .select('*', { count: 'exact', head: true });
    const day = getGameRound(count ?? 0);
    const { data: round } = await supabase
        .from('rounds')
        .select('*')
        .eq('day', day);
    console.log('Round:', round);
    console.log('Day:', day);
    const hasParam = searchParams.game !== undefined;
    let gameParam = Number(searchParams.game ?? 0);
    if (gameParam > games.length - 1 || Number.isNaN(gameParam)) gameParam = 0;
    if (!round) return null;
    return (
        <div className="flex w-full max-w-screen-sm grow flex-col overflow-clip font-sans">
            <GameScreen
                dayParam={day}
                key={day}
                loadedGame={round[0] as GameConfig}
            />
            {hasParam && (
                <div className="absolute right-0 flex flex-col gap-2 p-2">
                    {games.map((_, i) => (
                        <Link
                            href={`?game=${i}`}
                            key={i}
                            className="flex w-6 items-center justify-center rounded bg-primary-400">
                            {i + 1}
                        </Link>
                    ))}
                </div>
            )}
            <GlobalToastRegion />
        </div>
    );
}
