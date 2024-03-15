import connections from './connections.json';
import fs from 'fs';
import { GameConfig } from '@/features/game/types';
import { games } from '@/features/game/games';
type Node = {
    value: string;
    next: string[];
};

function getConnectionsByWord() {
    const words: Record<string, string[]> = {};

    connections.forEach(({ answers }) => {
        answers.forEach(({ group, members }) => {
            members.forEach((word) => {
                if (words[word]) {
                    words[word].push(group);
                } else {
                    words[word] = [group];
                }
            });
        });
    });
    return words;
}

function getConnectionsByGroup(): Record<string, string[]> {
    return Object.fromEntries(
        connections.flatMap(({ answers }) =>
            answers.map(({ group, members }) => [group, members])
        )
    );
}

type Path = number[];

const MAX_DEPTH = 8;
function dfs(
    rows: { reason: string; words: string[] }[],
    nodeIndex: number,
    visited: number[],
    path: GameConfig = { words: [], links: [] },
    depth: number = 0
): GameConfig[] {
    if (path.words.length === MAX_DEPTH || depth === MAX_DEPTH) return [path];
    const rowIndexes = rows.map((row, i) => ({
        row,
        originalIndex: i,
        intersections: [],
    }));
    const nextRows = rowIndexes.filter(
        ({ row: { reason, words }, originalIndex }) =>
            nodeIndex !== originalIndex &&
            !visited.includes(originalIndex) &&
            words.some((w) => rows[nodeIndex].words.includes(w))
    );

    const intersections = nextRows
        .map(({ row: { reason, words }, originalIndex }) => ({
            originalIndex,
            reason,
            words: words.filter((w) => rows[nodeIndex].words.includes(w)),
        }))
        .flatMap((intersection) =>
            intersection.words.map((w) => ({ ...intersection, words: [w] }))
        );

    if (nextRows.length === 0) {
        return [
            {
                words: [
                    ...path.words,
                    rows[nodeIndex].words.filter(
                        (w) => !path.words.includes(w)
                    )[0],
                ],
                links: path.links,
            },
        ];
    }
    //console.log(intersections);
    const splitPaths = intersections.filter(({ words }) => words.length > 1);
    if (splitPaths.length > 1) console.log(splitPaths);
    const filteredRows = intersections.filter(
        ({ words }, i) => !path.words.includes(words[0])
    );
    let options = [];
    for (let i = 0; i < filteredRows.length; i++) {
        const { originalIndex, reason, words } = filteredRows[i];

        const pathsFound = dfs(
            rows,
            originalIndex,
            [...visited, nodeIndex],
            {
                words: [
                    ...(path.words.length === 0
                        ? [
                              rows[nodeIndex].words.filter(
                                  (w) => !words.includes(w)
                              )[0],
                          ]
                        : []),
                    ...path.words,
                    words[0],
                ],
                links: [
                    ...(path.links.length === 0
                        ? [rows[nodeIndex].reason]
                        : []),
                    ...path.links,
                    reason,
                ],
            },
            depth + 1
        );
        //console.log({ pathsFound });
        const validPaths = pathsFound.filter(
            ({ words }) => words.length === MAX_DEPTH
        );
        //console.log(validPaths);
        if (validPaths.length > 0) {
            //console.log({ validPaths });
            return validPaths;
        }
    }
    return [path];
}

function generateGames() {
    fs.writeFileSync('./games.json', '[]', 'utf-8');
    rows.forEach((_, i) => {
        const savedConfigs = JSON.parse(
            fs.readFileSync('./games.json', 'utf-8')
        ) as GameConfig[];
        const configs = dfs(rows, i, [])
            .map(({ words, links }) => ({
                words,
                links: links.slice(0, -1),
            }))
            .filter(({ words }) => words.length === MAX_DEPTH);
        console.log(configs);
        fs.writeFileSync(
            './games.json',
            JSON.stringify([...savedConfigs, ...configs])
        );
    });
}

const quotes = '"';
const fakeRandom = (offset: number) => (Math.sin(Math.sin(offset)) + 1) / 2;
function shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(fakeRandom(i) * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function getFirstGames() {
    let id = 0;
    const loadedGames = JSON.parse(
        fs.readFileSync('./games.json', 'utf-8')
    ) as GameConfig[];

    let csv = 'id,day,words,links\n';
    const allGames = shuffle([...loadedGames, ...games]);
    allGames.forEach((game) => {
        csv += `${id},${id},"${JSON.stringify(game.words).replaceAll(quotes, quotes + quotes)}","${JSON.stringify(game.links).replaceAll(quotes, quotes + quotes)}"\n`;
        id++;
    });
    console.log(csv);
    fs.writeFileSync('./games.csv', csv);
}

const rows = Object.entries(getConnectionsByGroup()).map(([reason, words]) => ({
    reason,
    words,
}));

const result = dfs(rows, 1, []);
console.log('Result:', result);

generateGames();
getFirstGames();
