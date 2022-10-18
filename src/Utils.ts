/**
 * Returns a random number, less or equal than max.
 * @param {number} max
 * @returns {number}
 */
export function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

/**
 * Function that generates an array containing prime numbers with given max bit size.
 * @param {number} maxBitSize
 * @returns {Array <number>}
 */
export function generatePrimes(maxBitSize: number): number[] {
    let result: number[] = [];
    if (maxBitSize < 2) return result;
    result.push(2, 3);
    if (maxBitSize == 2) return result;

    for (let i = 4; i.toString(2).length <= maxBitSize; i++) {
        let isPrime = true;
        result.every((item) => {
            if (i % item == 0) {
                isPrime = false
                return false;
            }
            return true;
        })
        if (isPrime) result.push(i);
    }
    return result;
}

/**
 * Generate an array filled with numbers, that have no common divisor other than 1 in relation to (p-1)*(q-q).
 * https://www.maths2mind.com/schluesselwoerter/teilerfremde-zahlen
 * @param {number} p
 * @param {number} q
 * @returns {Array <number>}
 */
export function generatePossibleE(p: number, q: number): number[] {
    const result: number[] = [];

    const fn = (p - 1) * (q - 1);
    const fnPrimeFact: number[] = [];
    const primes = generatePrimes(fn.toString(2).length);
    //Generating prime factors
    // console.log("Primes: " + primes);
    primes.forEach((item) => {
        if (fn % item == 0) fnPrimeFact.push(item);
    })
    // console.log("Prime facts:" + fnPrimeFact);
    //Testing other values if they have the same prime factors.
    let hasNCD = false;
    for (let i = 2; i < fn/2; i++) {
        fnPrimeFact.every((item) => {
            if (i % item == 0) {
                // console.log("Remainder= 0; i: " + i + ", item: " + item);
                hasNCD = false;
                return false;
            }
            // console.log("i: " + i + ", item: " + item);
            hasNCD = true;
            return true;
        })
        if (hasNCD) result.push(i);
        hasNCD = false;
    }
    return result;
}