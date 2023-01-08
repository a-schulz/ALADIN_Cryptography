import {ascii} from "../../frontend/src/components/Ascii";

/**
 * Converts given text to array of corresponding decimal numbers. (ASCII)
 * @param char
 * @returns {number}
 */
export const char2DecimalAscii = (char: string): number => {
    return Object.values(ascii).findIndex((e) => e.char === char);
}

/**
 * Converts string to array of decimal numbers. Incl. special characters. (ASCII)
 * @param s
 */
export const string2DecimalAscii = (s: string): number[] => {
    const regexp = new RegExp(/\[.*?\]/g);
    let index = 0;
    let result: number[] = [];
    const matches = s.matchAll(regexp);
    for (const match of matches) {
        if (char2DecimalAscii(match[0]) > -1) {
            result = result.concat(s.slice(index, match.index).split("").map((char) => char2DecimalAscii(char)));
            result.push(char2DecimalAscii(match[0]));
        } else {
            // @ts-ignore
            result = result.concat(s.slice(index, match.index + match[0].length).split("").map((char) => char2DecimalAscii(char)));
        }
        // @ts-ignore
        index = match.index + match[0].length;
    }
    while (index < s.length) {
        result.push(char2DecimalAscii(s[index]));
        index++;
    }
    return result;
}

/**
 * Splits given string into chars and special characters.
 * @param s
 */
export const string2CharAscii = (s: string): string[] => {
    const regexp = new RegExp(/\[.*?\]/g);
    let index = 0;
    let result: string[] = [];
    const matches = s.matchAll(regexp);
    for (const match of matches) {
        if (char2DecimalAscii(match[0]) > -1) {
            result = result.concat(s.slice(index, match.index).split("").map((char) => char));
            result.push(match[0]);
        } else {
            // @ts-ignore
            result = result.concat(s.slice(index, match.index + match[0].length).split("").map((char) => char));
        }
        // @ts-ignore
        index = match.index + match[0].length;
    }
    while (index < s.length) {
        result.push(s[index]);
        index++;
    }
    return result;
}