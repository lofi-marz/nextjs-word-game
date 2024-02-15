import { Button } from 'react-aria-components';
import { GameConfig } from '../types';
import { GameWordsGroup } from './GameWordsGroup';
const words = ['lust', 'sloth', 'snail', 'junk', 'trash'];
type GameScreenProps = {
    gameConfig: GameConfig;
    shuffledWords: string[];
};
type GameState = {};
export function GameScreen({ gameConfig, shuffledWords }: GameScreenProps) {
    return (
        <GameWordsGroup
            words={gameConfig.words}
            reasons={gameConfig.links}
            shuffledWords={shuffledWords}
            key={gameConfig.words[0]}
        />
    );
}
