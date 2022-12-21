import {isPrime} from "./IsPrime";

/**
 * Function that generates an array containing prime numbers with given max bit size.
 * @param {number} bitLength
 * @param {boolean} all - if true, all primes are returned, if false, only primes with bit length of bitLength are returned.
 * @returns {Array <number>}
 */
export function generatePrimes(bitLength: number, all: boolean): number[] {
    let result: number[] = [];
    const max: number = Math.pow(2, bitLength);
    const min: number = Math.pow(2, bitLength - 1);
    for (let idx = min; idx < max; idx++) {
        if (isPrime(idx)) result.push(idx);
    }
    if (all) {
        for (let idx = 2; idx < min; idx++) {
            if (isPrime(idx)) result.push(idx);
        }
    }
    return result;
    }