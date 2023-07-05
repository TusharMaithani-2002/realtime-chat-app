import {clsx} from 'clsx';// conditional classes
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}