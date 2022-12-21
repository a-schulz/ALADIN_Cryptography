import {generatePrimes} from "./GeneratePrimes";

/**
 * Tests whether the given two numbers have a common divider.
 * @param {number} firstNumber
 * @param {number} secondNumber
 * @returns {boolean}
 */
export function hasCommonDivider(firstNumber: number, secondNumber: number): boolean {
    const primeFact: number[] = [];
    const primes = generatePrimes(firstNumber.toString(2).length, true);
    primes.forEach((item) => {
        if (firstNumber % item == 0) primeFact.push(item);
    })
    let hasNCD: boolean = true;
    primeFact.every((item: number) => {
        if (secondNumber % item == 0) {
            hasNCD = false;
            return false;
        }
        return true;
    })
    return !hasNCD;
}

/**
 * Calculates all possible divisors where the remainder is zero.
 * @param base
 * @returns number[]
 */
export const calculateDividerSet = (base: number): number[] => {
    let result: number[] = [];
    for (let idx = 1; idx <= base; idx++) {
        if (base % idx == 0) result.push(idx);
    }
    return result;
}