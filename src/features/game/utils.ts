import { GameState, GameStore } from './types';

function numberToEmoji(n: number) {
    const emojiMap = new Map([
        [0, '0️⃣'],
        [1, '1️⃣'],
        [2, '2️⃣'],
        [3, '3️⃣'],
        [4, '4️⃣'],
        [5, '5️⃣'],
        [6, '6️⃣'],
        [7, '7️⃣'],
        [8, '8️⃣'],
        [9, '9️⃣'],
        [10, '🔟'],
    ]);

    return emojiMap.get(n);
}
export function exportGame(
    userPath: string[],
    correctPath: string[],
    day: number
) {
    const places = userPath.map((w) => correctPath.indexOf(w) + 1);
    const scoredPath = scorePath(userPath, correctPath);
    console.log({ scoredPath, places });
    let shareString = places.map(numberToEmoji).join('') + '\n';

    shareString += scoredPath
        .map(({ correct }) => (correct ? '🟩' : '🟥'))
        .join('');
    return shareString;
}

export function scorePath(userPath: string[], correctPath: string[]) {
    let j = 0;
    return userPath.map((word) => {
        const correct = word === correctPath[j];
        if (correct) j++;
        return { word, correct };
    });
}

export function getGameRound(max?: number): number {
    const today = new Date();
    const july17 = new Date(2023, 6, 17); // 2023-07-17

    const timeDifference = today.getTime() - july17.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return max ? daysDifference % max : daysDifference;
}

export function gamesEqual(
    game1: Pick<GameState, 'day' | 'words'>,
    game2: Pick<GameState, 'day' | 'words'>
) {
    //console.log('Games:', game1, game2);
    if (game1.day !== game2.day) return false;
    //console.log('Same day');
    if (game1.words.length !== game2.words.length) return false;
    //console.log('Same length');
    for (let i = 0; i < game1.words.length; i++) {
        //console.log('Comparing:', game1.words[i], game2.words[i]);
        if (game1.words[i] !== game2.words[i]) return false;
    }
    return true;
}
