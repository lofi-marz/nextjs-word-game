import { GameConfig } from './types';

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

export const games = [testGame1, testGame2, testGame3, testGame4];
