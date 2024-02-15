import { HowToPlay } from '@/components/HowToPlay';
import { GlobalToastRegion } from '@/components/toast';
import { GameScreen } from '@/features/game/components';
import { GameEndDialog } from '@/features/game/components/GameEndDialog';
import { GameConfig, ZGameConfig } from '@/features/game/types';
import { shuffleArray } from '@/utils/utils';
import Link from 'next/link';

const testGame1: GameConfig = {
    words: ['lust', 'pride', 'lion', 'cat', 'dog', 'better'],
    links: ['deadly sins', 'a _ of _', 'feline', 'pets', '_ days'],
};

const testGame2: GameConfig = {
    words: ['kayak', 'mom', 'dad', 'pop', 'bang', 'dipper', 'robin', 'clank'],
    links: [
        'palindromes',
        'parents',
        'father',
        'onomatopoeia',
        'big _',
        'birds',
        'sidekicks',
    ],
};

type GameWords = [string, ...string[]];

const testGame3: GameConfig = {
    words: ['pain', 'harmony', 'discord', 'slack', 'cake', 'wagon', 'carriage'],
    links: [
        'in _',
        'antonyms',
        'instant messaging apps',
        'cut me some _',
        'slang 🍑',
        'horse-drawn',
    ],
};

const testGame4: GameConfig = {
    words: ['connections', 'mini', 'toy', 'story', 'jab', 'pull'],
    links: [
        'Word games',
        'Smaller version',
        'Toy Story',
        'Hi_',
        'Boxing terms',
    ],
};

const games = [testGame1, testGame2, testGame3, testGame4];

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
    let gameIndex = Number(searchParams.game ?? 0);
    if (gameIndex > games.length - 1 || Number.isNaN(gameIndex)) gameIndex = 0;
    const game = games[gameIndex];
    const [first, ...rest] = game.words;
    console.log('First:', first);
    const shuffledWords = shuffleArray(rest);
    return (
        <div className="flex max-w-screen-md grow flex-col overflow-clip font-sans">
            <GameScreen gameConfig={game} shuffledWords={shuffledWords} key={gameIndex}/>
            <div className="flex flex-col absolute right-0 p-2 gap-2">
                {games.map((_, i) => (
                    <Link href={`?game=${i}`} key={i} className='w-6 bg-primary-400 flex items-center justify-center rounded'>
                        {i + 1}
                    </Link>
                ))}
            </div>
            <GlobalToastRegion />
            <HowToPlay />
        </div>
    );
}
