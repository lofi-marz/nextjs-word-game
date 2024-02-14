'use client';
import { MotionGridListItem } from '@/utils/motion';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
    Checkbox,
    GridList,
    GridListItem,
    GridListItemProps,
} from 'react-aria-components';

import { Selection } from 'react-aria-components';
import { themeColors } from '../../../../tailwind.config';
import theme from 'tailwindcss/defaultTheme';
import { exportGame, scorePath } from '../utils';
import { cn } from '@/utils/utils';
const connectionWordVariants: Variants = {
    hide: { scaleX: 0 },
    show: { scaleX: 1, transition: { ease: 'anticipate', duration: 0.5 } },
};
function SubmittedWord({
    word,
    isLast = false,
    isWrong = false,
}: {
    word: string;
    isLast?: boolean;
    isWrong?: boolean;
}) {
    return (
        <motion.div
            className={cn(
                'card card-s relative rounded text-light card-solid-primary-400',
                isLast && 'card-solid-green-400',
                isWrong && 'opacity-50 card-solid-red-400'
            )}
            variants={connectionWordVariants}>
            {word}
        </motion.div>
    );
}

const connectionLineVariants: Variants = {
    hide: { scaleY: 0 },
    show: { scaleY: 1, transition: { ease: 'easeOut' } },
};

function SubmittedWordConnection({
    connection = '???',
}: {
    connection?: string;
}) {
    const isWrong = connection === '???';
    return (
        <motion.div
            className={cn(
                'relative flex items-center justify-center text-sm text-theme',
                isWrong && 'opacity-50'
            )}
            transition={{ staggerChildren: 0.2 }}
            variants={{ hide: {}, show: {} }}>
            <motion.div
                className="absolute mx-auto h-full w-2 bg-theme-invert"
                variants={connectionLineVariants}
            />
            <motion.div
                className="card card-s relative my-2 rounded card-solid-theme-invert"
                variants={connectionWordVariants}>
                ( {connection} )
            </motion.div>
        </motion.div>
    );
}
function isCorrectConnection(word1: string, word2: string, words: string[]) {
    console.log({
        word1,
        word2,
        words,
        result: words.indexOf(word1) + 1 === words.indexOf(word2),
    });
    return words.indexOf(word1) + 1 === words.indexOf(word2);
}

function sameArray<T>(arr1: T[], arr2: T[]) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, i) => value === arr2[i]);
}

export function GameWordsGroup({
    words,
    reasons,
}: {
    words: string[];
    reasons: string[];
}) {
    const [startWord, ...restWords] = words;
    const [selected, setSelected] = useState<Selection>(new Set());

    const [allSubmitted, setAllSubmitted] = useState<string[]>([startWord]);
    //pride lion cat
    //pride cat lion cat

    const labelledSubmitted = scorePath(allSubmitted, words);

    const correctWords = labelledSubmitted
        .filter(({ correct }) => correct)
        .map(({ word }) => word);

    const hasWon = sameArray(correctWords, words);
    console.log(exportGame(allSubmitted, words));
    console.log({ hasWon, correctWords });
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scroll({top: containerRef.current.scrollHeight, behavior: 'smooth'})
            
        }
    }, [allSubmitted]);
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4 p-4 text-lg font-semibold">
            <div
                className="relative flex max-h-full w-full grow flex-col items-center overflow-y-scroll py-4 text-3xl"
                ref={containerRef}>
                <AnimatePresence>
                    {allSubmitted.map((w, i, arr) => (
                        <motion.div
                            key={i}
                            className="flex flex-col items-center justify-center first:mt-auto"
                            initial="hide"
                            animate="show"
                            transition={{ staggerChildren: 0.5 }}
                            layout>
                            <SubmittedWord
                                word={w}
                                isLast={
                                    words.indexOf(w) === words.length - 1 &&
                                    hasWon
                                }
                                isWrong={
                                    i > 0 &&
                                    (!correctWords.includes(w) ||
                                        arr.lastIndexOf(w) !== i)
                                }
                            />
                            {i < arr.length - 1 && (
                                <SubmittedWordConnection
                                    connection={
                                        correctWords.includes(arr[i + 1]) &&
                                        arr.lastIndexOf(arr[i + 1]) === i + 1
                                            ? reasons[
                                                  words.indexOf(
                                                      correctWords[
                                                          correctWords.indexOf(
                                                              arr[i + 1]
                                                          )
                                                      ]
                                                  ) - 1
                                              ]
                                            : undefined
                                    }
                                />
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                <GridList
                    className="flex flex-wrap place-content-center gap-4 text-xl"
                    selectedKeys={selected}
                    selectionMode="single"
                    onSelectionChange={setSelected}
                    aria-label="Submmitted words"
                    disabledKeys={correctWords}
                    items={restWords.map((w) => ({ key: w, name: w }))}>
                    {(w) => {
                        return <GameWord>{w.name}</GameWord>;
                    }}
                </GridList>
                <Button
                    isDisabled={
                        typeof selected === 'string' || selected.size === 0
                    }
                    onPress={() => {
                        setSelected(new Set());
                        console.log('Press clicked');
                        if (typeof selected === 'string') return;
                        const [selectedWord] = [...selected];
                        console.log('Word');
                        setAllSubmitted((ss) => [
                            ...ss,
                            selectedWord.toString(),
                        ]);
                    }}
                    className="card card-s transition-all card-solid-primary-400 hover:brightness-110 pressed:brightness-90 disabled:text-grey-400 disabled:card-solid-theme-invert">
                    Submit
                </Button>
            </div>
        </div>
    );
}

const gameWordVariants: Variants = {
    wrong: {
        x: ['-10%', '10%'],
        transition: {
            x: {
                repeat: 10,
                repeatType: 'mirror',
                ease: 'anticipate',
                duration: 0.1,
            },
        },
    },
};

function GameWord({ children, ...props }: GridListItemProps) {
    const textValue = typeof children === 'string' ? children : undefined;

    return (
        <MotionGridListItem
            className="card-s md:card-m bg-theme-invert font-semibold text-theme transition-all selected:bg-primary-400 selected:text-light disabled:text-grey-400 md:text-3xl"
            textValue={textValue}
            {...props}
            variants={gameWordVariants}>
            <Checkbox className="" slot="selection">
                {children as string}
            </Checkbox>
        </MotionGridListItem>
    );
}
