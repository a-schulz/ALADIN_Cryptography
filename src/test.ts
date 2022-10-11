/**
 * Function that generates an array containing prime numbers with given max bit size.
 * @param {number} bitSize
 * @returns {array number}
 */
function generatePrimes(bitSize: number): number[] {
    let result = new Array(2, 3);
    let finished = false;
    while(!finished){
        result.forEach((item) => {
                if (item.toString(2).length <= bitSize) {
                    result = result.filter(function (element) {
                        return element !== item
                    });
                }
            }
        )
    }


    return new Array(1, 2);
}

const num = 12;
console.log(num.toString(2))


// Run this script with the following command:
// npx ts-node .\test.ts
