import { cn } from '@/utils/utils';

export function LivesDisplay({
    livesUsed,
    maxLives,
}: {
    livesUsed: number;
    maxLives: number;
}) {
    return (
        <div className="flex h-6 w-fit flex-row-reverse items-center justify-center gap-2">
            {[...new Array(maxLives)].map((_, i) => (
                <div
                    className={cn(
                        'aspect-square h-full rounded-full ',
                        i < livesUsed ? 'bg-theme-invert' : 'bg-primary-400'
                    )}
                    key={i}
                />
            ))}
        </div>
    );
}
