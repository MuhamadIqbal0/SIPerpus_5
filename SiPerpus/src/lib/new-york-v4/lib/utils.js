import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
/**
* Merge class names dengan Tailwind conflict resolution
* @param {...any} inputs - Class names atau objects
* @returns {string} Merged class string
*/
export function cn(...inputs) {
return twMerge(clsx(inputs));
}
