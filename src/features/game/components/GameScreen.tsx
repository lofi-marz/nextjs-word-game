import { Button } from 'react-aria-components';
import { GameConfig } from '../types';
import { GameWordsGroup } from './GameWordsGroup';
const words = ['lust', 'sloth', 'snail', 'junk', 'trash'];
type GameScreenProps = {
    gameConfig: GameConfig;
};
type GameState = {};
export function GameScreen({ gameConfig }: GameScreenProps) {
    return (
        <GameWordsGroup words={gameConfig.words} reasons={gameConfig.links} />
    );
}
