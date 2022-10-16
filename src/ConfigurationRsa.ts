/*
Used to configure tasks with a specific difficulty.

Takes user-input to generate following tasks.

Q:
    Switch between the different tasks?
    Switch to complex task?
 */

import { Rsa } from "./Rsa";
import {generatePossibleE, generatePrimes, getRandomInt} from "./Utils";

export class ConfigurationRsa {
    /*
    Bei diesem Constructor sollen noch Ausgaben kommen, welche Werte für die Berechnung verwendet werden sollen
     */
    constructor(bitLength: number) {
        this.bitLength = bitLength;
    }

    private _bitLength: number;

    get bitLength(): number {
        return this._bitLength;
    }

    set bitLength(value: number) {
        if (value < 2) throw new Error('Bitlength cannot be less than 2. (No possible prime.)');
        this._bitLength = value;
    }

    private _Rsa: Rsa;

    get Rsa(): Rsa {
        return this._Rsa;
    }

    set Rsa(value: Rsa) {
        this._Rsa = value;
    }
    startRsa = (): Rsa => {
        //generating primes for RSA
        const primes = generatePrimes(this.bitLength);
        let choiceOfPrime = new Set();
        while (choiceOfPrime.size < 2) {
            choiceOfPrime = new Set<number>(new Array(getRandomInt(primes.length), getRandomInt(primes.length)).sort((a, b) => {
                return a - b;
            }));
        }
        const choicesOfPrimeIterator = choiceOfPrime.values();
        const p = primes[choicesOfPrimeIterator.next().value];
        const q = primes[choicesOfPrimeIterator.next().value];
        //calculating e for RSA
        const possibleE = generatePossibleE(p, q);
        const e = possibleE[getRandomInt(possibleE.length)];
        this.Rsa = new Rsa(p, q, e);
        console.log("p: " + p + "\nq: "+ q + "\ne: " + e)

        return this.Rsa;
};
}
/*
Es soll die Möglichkeit geben, dass Studenten einfach ihre Werte eingeben und dann für diese Aufgabe eine entsprechende Anleitung bekommen.
 */

/*
Bei dem zweiten Construcor sollen erstmal Primzahlen für die Bitlänge geliefert werden und dann vom User ein e zurückkonmmen, welches erstmal auf teilerfremdheit getestet wird. Falls die Bedingung erfüllt ist, wird die Berechnung durchgeführt.
Diese Unterscheidung muss dann beim Aufrufen des Construktors RSA geschehen.

Dritter Typ: vorgegebene Bitlänge der Primzahlen: eigentliche Primzahlen und e kommen vom Benutzer. Diese erst prüfen und dann Rechnung durchführen.
 */