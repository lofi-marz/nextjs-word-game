'use client';
import { Button } from 'react-aria-components';
import { GameConfig, GameState } from '../types';
import { GameWordsGroup } from './GameWordsGroup';
import { useEffect } from 'react';
import { useGameIsHydrated, useGameStore } from '../stores';

import { gamesEqual } from '../utils';

type GameScreenProps = {
    loadedGame: GameConfig;
    dayParam: number;
};

export function GameScreen({ loadedGame, dayParam }: GameScreenProps) {
    const gameIsHydrated = useGameIsHydrated();
    const day = useGameStore((state) => state.day);
    console.log(day);
    const game = useGameStore((state) => state);
    const initializeGame = useGameStore((state) => state.initializeGame);
    useEffect(() => {
        //TODO: This probably isnt right
        if (!gameIsHydrated) return;

        if (
            dayParam !== day ||
            !gamesEqual(game, { ...loadedGame, day: dayParam })
        ) {
            console.log(`New game ${day} -> ${dayParam}`);
            initializeGame(dayParam, loadedGame);
        }
    }, [day, gameIsHydrated, dayParam, initializeGame, loadedGame]);
    if (!gameIsHydrated) return null;

    return (
        <GameWordsGroup
            day={day}
            words={game.words}
            reasons={game.links}
            shuffledWords={game.shuffledWords}
            key={game.words[0]}
        />
    );
}
