'use client';
import { Button } from 'react-aria-components';
import { GameConfig, GameState } from '../types';
import { GameWordsGroup } from './GameWordsGroup';
import { useEffect } from 'react';
import { useGameIsHydrated, useGameStore } from '../stores';
import { games } from '../games';
import { gamesEqual } from '../utils';

type GameScreenProps = {
    dayParam: number;
};

export function GameScreen({ dayParam }: GameScreenProps) {
    const gameIsHydrated = useGameIsHydrated();
    const day = useGameStore((state) => state.day);
    const game = useGameStore((state) => state);
    const initializeGame = useGameStore((state) => state.initializeGame);
    useEffect(() => {
        //TODO: This probably isnt right
        if (!gameIsHydrated) return;

        if (dayParam !== day || !gamesEqual(game, {...games[dayParam], day: dayParam})) {
            console.log(`New game ${day} -> ${dayParam}`);
            initializeGame(dayParam, games[dayParam]);
        }
    }, [day, gameIsHydrated, dayParam, initializeGame]);
    if (!gameIsHydrated) return null;

    return (
        <GameWordsGroup
            words={game.words}
            reasons={game.links}
            shuffledWords={game.shuffledWords}
            key={game.words[0]}
        />
    );
}
