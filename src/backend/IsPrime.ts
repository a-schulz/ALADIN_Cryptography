/**
 * Test if the given number is a prime. Returns true if number is prime.
 * @param {number} possiblePrime
 * @returns {boolean}
 */
export function isPrime(possiblePrime: number): boolean {
    if (possiblePrime < 2) {
        return false;
    }
    if (possiblePrime === 2) {
        return true;
    }
    if (possiblePrime % 2 === 0) {
        return false;
    }
    for (let i = 3; i <= Math.sqrt(possiblePrime); i += 2) {
        if (possiblePrime % i === 0) {
            return false;
        }
    }
    return true;
}