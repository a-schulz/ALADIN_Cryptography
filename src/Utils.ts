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
    let idx = 2;
    while(idx < fn/2 && result.length < 10){
        if (!hasCommonDivider(idx, fn)) result.push(idx);
        idx++;
    }
    return result;
}

/**
 * Test if the given number is a prime.
 * @param {number} possiblePrime
 * @returns {boolean}
 */
export function validatePrime(possiblePrime: number): boolean {
    for (let i = 2; i < Math.sqrt(possiblePrime); i++) {
        if (possiblePrime % i == 0) return false;
    }
    return true;
}

/**
 * Tests whether the given two numbers have a common divider.
 * @param {number} firstNumber
 * @param {number} secondNumber
 * @returns {boolean}
 */
export function hasCommonDivider(firstNumber: number, secondNumber: number): boolean {
    const primeFact: number[] = [];
    const primes = generatePrimes(firstNumber.toString(2).length);
    primes.forEach((item) => {
        if (firstNumber % item == 0) primeFact.push(item);
    })
    let hasNCD: boolean = true;
    primeFact.every((item: number) =>{
        if(secondNumber % item == 0){
            hasNCD = false;
            return false;
        }
        return true;
    })
    return !hasNCD;
}