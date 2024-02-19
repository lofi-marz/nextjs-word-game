import { z } from 'zod';

export const ZGameConfig = z
    .object({
        words: z.array(z.string()),
        links: z.array(z.string()),
    })
    .refine(({ words, links }) => words.length - 1 === links.length);

export type GameConfig = z.infer<typeof ZGameConfig>;

export type GameEndState = 'win' | 'lose' | null;

export type GameState = GameConfig & {
    day: number;
    playedBefore: boolean;
    guesses: string[];
    shuffledWords: string[];
};

type GameActions = {
    guess: (word: string) => void;
    shuffle: () => void;
    initializeGame: (day: number, config: GameConfig) => void;
    markNotNew: () => void;
};

export type GameStore = GameState & GameActions;
