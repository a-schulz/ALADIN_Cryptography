import {ascii} from "../../frontend/src/components/Ascii";

/**
 * Converts given text to array of corresponding decimal numbers. (ASCII)
 * @param char
 * @returns {number}
 */
export const char2DecimalAscii = (char: string): number => {
    return Object.values(ascii).findIndex((e) => e.char === char);
}