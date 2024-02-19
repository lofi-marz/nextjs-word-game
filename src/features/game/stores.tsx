import { create } from 'zustand';

import { GameStore } from './types';

import { persist, createJSONStorage } from 'zustand/middleware';
import { shuffleArray } from '@/utils/utils';

import { useEffect, useState } from 'react';
/*
export type CreatedGameStore = ReturnType<typeof createGameStore>;
const GameContext = createContext<CreatedGameStore | null>(null);

export function useGameContext<T>(selector: (state: GameStore) => T): T {
    const store = useContext(GameContext);
    if (!store) throw new Error('Missing GameContext.Provider in the tree');
    return useStore(store, selector);
}
export function GameProvider({
    children,
    game,
    day,
}: PropsWithChildren<{ game: Partial<GameState>; day: number }>) {
    const storeRef = useRef<CreatedGameStore>();
    if (!storeRef.current) {
        const store = createGameStore(game, day);
        storeRef.current = store;
    }
    return (
        <GameContext.Provider value={storeRef.current}>
            {children}
        </GameContext.Provider>
    );
}
export const createGameStore = (
    initialState: Partial<GameState>,
    day: number
) => {
    const DEFAULT_STATE: GameState = {
        day,
        playedBefore: false
        words: [],
        shuffledWords: [],
        links: [],
        guesses: [],
    };
    return createStore<GameStore>()(
        persist(
            (set) => ({
                ...DEFAULT_STATE,
                ...initialState,
                guess: (guess) =>
                    set((state) => {
                        //if (state.guesses.length - state.words.length <= 0) return state;
                        return {
                            ...state,
                            guesses: [...state.guesses, guess],
                        };
                    }),

                shuffle: () =>
                    set((state) => ({
                        ...state,
                        shuffledWords: shuffleArray(state.shuffledWords),
                    })),

                initializeGame: (day, config) =>
                    set((state) => ({
                        day,
                        ...config,
                        guesses: [config.words[0]],
                        shuffledWords: shuffleArray(config.words.slice(1)),
                    })),
            }),
            {
                name: 'word-link-game', // name of the item in the storage (must be unique)
                storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
            }
        )
    );
};*/
export const useGameStore = create<GameStore>()(
    persist(
        (set) => ({
            day: 0,
            playedBefore: false,
            words: [],
            shuffledWords: [],
            links: [],
            guesses: [],
            guess: (guess) =>
                set((state) => {
                    //if (state.guesses.length - state.words.length <= 0) return state;
                    return {
                        ...state,
                        guesses: [...state.guesses, guess],
                    };
                }),

            shuffle: () =>
                set((state) => ({
                    ...state,
                    shuffledWords: shuffleArray(state.shuffledWords),
                })),

            initializeGame: (day, config) =>
                set((state) => ({
                    day,
                    ...config,
                    guesses: [config.words[0]],
                    shuffledWords: shuffleArray(config.words.slice(1)),
                })),
            markNotNew: () =>
                set((state) => ({ ...state, playedBefore: true })),
        }),
        {
            name: 'word-link-game', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);

export const useGameIsHydrated = () => {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        // Note: This is just in case you want to take into account manual rehydration.
        // You can remove the following line if you don't need it.
        const unsubHydrate = useGameStore.persist.onHydrate(() =>
            setHydrated(false)
        );

        const unsubFinishHydration = useGameStore.persist.onFinishHydration(
            () => setHydrated(true)
        );

        setHydrated(useGameStore.persist.hasHydrated());

        return () => {
            unsubHydrate();
            unsubFinishHydration();
        };
    }, []);

    return hydrated;
};
