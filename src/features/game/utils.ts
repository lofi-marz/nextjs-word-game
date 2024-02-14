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
export function exportGame(userPath: string[], correctPath: string[]) {
    const places = userPath.map((w) => correctPath.indexOf(w) + 1);
    const scoredPath = scorePath(userPath, correctPath);
    console.log(scoredPath, places);
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
