import { GlobalToastRegion } from '@/components/toast';
import { GameScreen } from '@/features/game/components';
import { games } from '@/features/game/games';
import Link from 'next/link';
import { getGameRound } from '@/features/game/utils';
import { Metadata } from 'next'; // if using TypeScript

export const metadata: Metadata = {
    openGraph: {
        title: 'SemUp',
        description: 'Can ou find the connections?',
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

export default function Index({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const day = getGameRound(games.length);
    console.log('Day:', day);
    const hasParam = searchParams.game !== undefined;
    let gameParam = Number(searchParams.game ?? 0);
    if (gameParam > games.length - 1 || Number.isNaN(gameParam)) gameParam = 0;

    return (
        <div className="flex max-w-screen-md grow flex-col overflow-clip font-sans">
            <GameScreen dayParam={day} key={day} />
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
