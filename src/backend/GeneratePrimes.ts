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