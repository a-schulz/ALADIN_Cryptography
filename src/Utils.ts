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
 * @param {number} bitSize
 * @returns {Array <number>}
 */
export function generatePrimes(bitSize: number): number[] {
    let result = new Array();
    if (bitSize < 2) return result;
    result.push(2, 3);
    if (bitSize == 2) return result;

    let index = 1;
    while (true) {
        if ((6 * index - 1).toString(2).length > bitSize) return result;
        result.push(6 * index - 1);

        if ((6 * index + 1).toString(2).length > bitSize) return result;
        result.push(6 * index + 1);

        index = index + 1;
    }
}

/**
 * Generate an array filled with numbers, that have no common divisor other than 1 in relation to (p-1)*(q-q).
 * https://www.maths2mind.com/schluesselwoerter/teilerfremde-zahlen
 * @param {number} p
 * @param {number} q
 * @returns {Array <number>}
 */
export function generatePossibleE(p: number, q: number): number[] {
    const result = new Array();

    const fn = (p - 1) * (q - 1);
    const fnPrimeFact = new Array();
    const primes = generatePrimes(fn.toString(2).length);
    //Generating prime factors
    // console.log("Primes: " + primes);
    primes.forEach((item) => {
        if (fn % item == 0) fnPrimeFact.push(item);
    })
    // console.log("Prime facts:" + fnPrimeFact);
    //Testing other values if they have the same prime factors.
    let hasNCD = false;
    for (let i = 2; result.length < 2 || i < fn; i++) {
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