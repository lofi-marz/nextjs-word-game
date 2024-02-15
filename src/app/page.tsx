import { HowToPlay } from '@/components/HowToPlay';
import { GlobalToastRegion } from '@/components/toast';
import { GameScreen } from '@/features/game/components';
import { GameEndDialog } from '@/features/game/components/GameEndDialog';
import { GameConfig, ZGameConfig } from '@/features/game/types';

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

const game = testGame4;
try {
    ZGameConfig.safeParse(game);
} catch (e) {
    console.log('Invalid game');
}
export default function Index() {
    return (
        <div className="flex max-w-screen-md grow flex-col overflow-clip font-sans">
            <GameScreen gameConfig={game} />
            <GlobalToastRegion />
            <HowToPlay />
        </div>
    );
}
