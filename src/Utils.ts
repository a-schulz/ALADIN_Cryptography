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

    for (let i = 4; i.toString(2).length <= bitSize; i++) {
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

/**
 * Generates d (private part - rsa key).
 * @param {number} e
 * @param {number} phi
 * @returns {number}
 */
export function generateD(e: number, phi: number) {
    const steps: euklAlgo[] = [];
    steps.push({"e": e, "phi": phi, "q": Math.floor(e / phi), "r": e % phi});
    for (let i = 1; steps[i - 1]["r"] != 0; i++) {
        let newE = steps[i - 1]["phi"];
        let newPhi = steps[i - 1]["r"];
        steps.push({"e": newE, "phi": newPhi, "q": Math.floor(newE / newPhi), "r": newE % newPhi});
    }
    steps[steps.length - 1]["x"] = 0;
    steps[steps.length - 1]["y"] = 1;
    for (let i = steps.length - 2; i >= 0; i--) {
        steps[i]["x"] = steps[i + 1]["y"];
        steps[i]["y"] = steps[i + 1]["x"] - steps[i]["q"] * steps[i + 1]["y"];
    }
    console.log(steps);
    if(steps[0]["x"] < 0) return phi + steps[0]["x"];
    return steps[0]["x"];
}

interface euklAlgo {
    e: number;
    phi: number;
    q: number;
    r: number;
    x?: number;
    y?: number;
}