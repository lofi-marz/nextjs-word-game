import { z } from 'zod';

export const ZGameConfig = z
    .object({
        words: z.array(z.string()),
        links: z.array(z.string()),
    })
    .refine(({ words, links }) => words.length - 1 === links.length);

export type GameConfig = z.infer<typeof ZGameConfig>;
