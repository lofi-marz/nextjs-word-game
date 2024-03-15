import { GameConfig } from './types';

const testGame1: GameConfig = {
    words: ['lush', 'lust', 'pride', 'lion', 'cat', 'dog', 'better', 'row'],
    links: [
        'lus_',
        'deadly sins',
        'a _ of _',
        'feline',
        'pets',
        '_ days',
        'greek letter homonyms',
    ],
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
    words: [
        'iran',
        'pain',
        'harmony',
        'discord',
        'slack',
        'cake',
        'wagon',
        'carriage',
    ],
    links: [
        'countries minus the first letter',
        'in _',
        'antonyms',
        'instant messaging apps',
        'cut me some _',
        'slang 🍑',
        'horse-drawn',
    ],
};

const testGame4: GameConfig = {
    words: [
        'callaloo',
        'connections',
        'mini',
        'toy',
        'story',
        'jab',
        'pull',
        'check',
    ],
    links: [
        '3 syllable words',
        'Word games',
        'Smaller version',
        'Toy Story',
        'Hi_',
        'Boxing terms',
        '_ out',
    ],
};

const testGame5: GameConfig = {
    words: ['zoom', 'flash', 'hell', 'heel', 'face', 'brave', 'chrome', 'bard'],
    links: [
        'DC speedsters',
        '_ fire',
        'h__l',
        'wrestling terms',
        'stand up to, as a challenge',
        'browsers',
        'Google products',
    ],
};

const testGame6: GameConfig = {
    words: ['mega', 'kilo', 'delta', 'bank', 'cash', 'check', 'cheque'],
    links: [
        'Prefixes',
        'NATO alphabet',
        'Store',
        'Methods of paying',
        'Homophones',
    ],
};

const testGame7: GameConfig = {
    words: [
        'minute',
        'hour',
        'sour',
        'sweet',
        'nice',
        'cork',
        'paper',
        'large',
    ],
    links: [
        'Time',
        'Rhyme',
        'Taste',
        'Cool!',
        'Cities',
        'Made from trees',
        'Slang for money',
    ],
};

export const games = [
    testGame1,
    testGame2,
    testGame3,
    testGame4,
    testGame5,
    testGame6,
    testGame7,
];
