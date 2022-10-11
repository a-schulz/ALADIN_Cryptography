/**
 * Function that generates an array containing prime numbers with given max bit size.
 * @param {number} bitSize
 * @returns {array number}
 */
function generatePrimes(bitSize: number): number[] {
    let result = new Array();
    if(bitSize < 2) return result;
    result.push(2,3);
    if(bitSize == 2) return result;

    let index = 1;
    while(true){
        if((6*index - 1).toString(2).length > bitSize) return result;
        result.push(6*index - 1);

        if((6*index + 1).toString(2).length > bitSize) return result;
        result.push(6*index + 1);

        index = index + 1;
    }
}

console.log("Erster test");
console.log(generatePrimes(2));
console.log("Zweiter test");
console.log(generatePrimes(4));
console.log("Dritter test");
console.log(generatePrimes(8));

// Run this script with the following command:
// npx ts-node .\test.ts

// ToDo: Automatische Tests schreiben.
