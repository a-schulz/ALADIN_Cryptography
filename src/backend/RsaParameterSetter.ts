/*
Used to configure tasks with a specific difficulty.

Takes user-input to generate following tasks.

Q:
    Switch between the different tasks?
    Switch to complex task?
 */
// TODO: parsing config.ts to generate the specific Configuration
// TODO: choosing witch Class should be initialized.
import {Rsa} from "./Rsa";
import {generatePrimes, getRandomInt, hasCommonDivider, isPrime} from "./Utils";
import {Difficulty} from "../config";

export interface IRsaConfig{
    p: number,
    q : number,
    e : number
}

export interface IUserConfig {
    bitLength? : number;
    difficulty: Difficulty;
    e?: number;
    p?: number;
    q?: number;
}


export abstract class RsaParameterSetter {
    private _p:number;
    private _q:number;
    private _e:number;

    get p(): number {
        return this._p;
    }

    set p(value: number) {
        this._p = value;
    }

    get q(): number {
        return this._q;
    }

    set q(value: number) {
        this._q = value;
    }

    get e(): number {
        return this._e;
    }

    set e(value: number) {
        if (hasCommonDivider(value, (this._p - 1)* (this._q -1))) {
            throw new Error('Your chosen e has at least one common divider.');
        } else {
            this._e = value;
        }
    }

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

    prepRsa(): void{
        //generating primes for RSA
        const primes = generatePrimes(this.bitLength);
        let choiceOfPrime = new Set();
        while (choiceOfPrime.size < 2) {
            choiceOfPrime = new Set<number>([getRandomInt(primes.length - 1), getRandomInt(primes.length - 1)].sort((a, b) => {
                return a - b;
            }));
        }
        const choiceOfPrimeIterator = choiceOfPrime.values();
        this.p = primes[choiceOfPrimeIterator.next().value];
        this.q = primes[choiceOfPrimeIterator.next().value];
        // console.log("p: " + this.p + ", q: " + this.q);
    }
    public abstract setParameters(): IRsaConfig;
}


export class AutomaticParameterSetter extends RsaParameterSetter{

    constructor(bitLength: number) {
        super(bitLength);
    }

    prepRsa(): void {
        super.prepRsa();
        //calculating e for RSA
        const possibleE = Rsa.generatePossibleE(super.p, super.q);
        // console.log(possibleE);
        super.e = possibleE[getRandomInt(possibleE.length - 1)];
    }

    setParameters(): IRsaConfig {
        this.prepRsa();
        return  {
            p: this.p,
            q: this.q,
            e: this.e
        } as IRsaConfig;
    }
}

export class SetPQ extends RsaParameterSetter{

    constructor(bitLength: number) {
        super(bitLength);
    }

    setParameters(){
        super.prepRsa();
        return  {
            p: this.p,
            q: this.q,
        } as IRsaConfig;
    }
}

export class PseudoSetter extends RsaParameterSetter{

    constructor(bitLength: number) {
        super(bitLength);
    }

    setParameters(){
        return {} as IRsaConfig;
    }
}
/*
Es soll die Möglichkeit geben, dass Studenten einfach ihre Werte eingeben und dann für diese Aufgabe eine entsprechende Anleitung bekommen.

Bei dem zweiten Construcor sollen erstmal Primzahlen für die Bitlänge geliefert werden und dann vom User ein e zurückkonmmen, welches erstmal auf teilerfremdheit getestet wird. Falls die Bedingung erfüllt ist, wird die Berechnung durchgeführt.
Diese Unterscheidung muss dann beim Aufrufen des Construktors RSA geschehen.

Dritter Typ: vorgegebene Bitlänge der Primzahlen: eigentliche Primzahlen und e kommen vom Benutzer. Diese erst prüfen und dann Rechnung durchführen.
 */