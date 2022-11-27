/*
Used to configure tasks with a specific difficulty.

Takes user-input to generate following tasks.

Q:
    Switch between the different tasks?
    Switch to complex task?
 */
// TODO: parsing configTypes.ts to generate the specific Configuration
// TODO: choosing witch Class should be initialized.
import {Rsa} from "./Rsa";
import {getRandomInt} from "./GetRandomInt";
import {RsaConfig} from "./RsaConfig";
import {hasCommonDivider} from "./HasCommonDivider";
import {generatePrimes} from "./GeneratePrimes";

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
    public abstract setParameters(): RsaConfig;
}


export class AutomaticParameterSetter extends RsaParameterSetter{

    constructor(bitLength: number) {
        super(bitLength);
    }

    prepRsa(): void {
        super.prepRsa();
        //calculating e for RSA
        const possibleE = Rsa.generatePossibleE(super.p, super.q);
        super.e = possibleE[getRandomInt(possibleE.length - 1)];
    }

    setParameters(): RsaConfig {
        this.prepRsa();
        return  {
            p: this.p,
            q: this.q,
            e: this.e
        } as RsaConfig;
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
        } as RsaConfig;
    }
}

/**
 * Used if nothing needs to be set.
 */
export class PseudoSetter extends RsaParameterSetter{

    constructor(bitLength: number) {
        super(bitLength);
    }

    setParameters(){
        return {} as RsaConfig;
    }
}