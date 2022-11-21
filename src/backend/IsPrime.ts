/**
 * Test if the given number is a prime. Returns true if number is prime.
 * @param {number} possiblePrime
 * @returns {boolean}
 */
export function isPrime(possiblePrime: number): boolean {
    for (let i = 2; i < Math.sqrt(possiblePrime); i++) {
        if (possiblePrime % i == 0) return false;
    }
    return true;
}