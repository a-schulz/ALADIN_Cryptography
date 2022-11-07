/*
Module for RSA tasks
 */

// Todo: Step-by-Step to solution.
// Run this script with the following command:
// npx ts-node ./src/RSA.ts

// ToDo: Automatische Tests schreiben.
import {hasCommonDivider} from "./Utils";
import {IRsaConfig} from "./RsaParameterSetter"

/**
 * Datastructure representing one rsa key.
 */
interface IRsaKey {
    divisor: number;
    exponent: number;
}

/**
 * Datastructure used for representation of the extended euclidean algorithm.
 */
interface IExtEuclidAlgo {
    e: number;
    phi: number;
    q: number;
    r: number;
    x?: number;
    y?: number;
}

export class Rsa {
    private _p: number;
    private _q: number;
    public _publicKey: IRsaKey;
    private _privateKey: IRsaKey;
    private _calculatingSteps: IExtEuclidAlgo[];
    private _rsaConfig : IRsaConfig;


    get rsaConfig(): IRsaConfig {
        return this._rsaConfig;
    }

    set rsaConfig(value: IRsaConfig) {
        this._rsaConfig = value;
    }

    get calculatingSteps(): IExtEuclidAlgo[] {
        return this._calculatingSteps;
    }

    set calculatingSteps(value: IExtEuclidAlgo[]) {
        this._calculatingSteps = value;
    }

    get publicKey(): IRsaKey {
        return this._publicKey;
    }

    set publicKey(value: IRsaKey) {
        this._publicKey = value;
    }

    get privateKey(): IRsaKey {
        return this._privateKey;
    }

    set privateKey(value: IRsaKey) {
        this._privateKey = value;
    }

    constructor(rsaConfig : IRsaConfig) {
        this.rsaConfig = rsaConfig;
        this.p = rsaConfig.p;
        this.q = rsaConfig.q;
        this.publicKey = {"divisor": this.p * this.q, "exponent": rsaConfig.e};
        this.privateKey = {"divisor": this.p * this.q, "exponent": this.generateDAndSetSteps(rsaConfig.e, (this.p - 1) * (this.q - 1))}
    }

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

    /**
     * Generates d (private part - rsa key) and set steps used for calculating.
     * @param {number} e
     * @param {number} phi
     * @returns {number}
     */
    generateDAndSetSteps(e: number, phi: number): number {
        const steps: IExtEuclidAlgo[] = [];
        steps.push({"e": e, "phi": phi, "q": Math.floor(e / phi), "r": e % phi});
        //normal euclidean algorithm
        let idx = 1;
        while (steps[idx - 1]["r"] != 0) {
            let newE = steps[idx - 1]["phi"];
            let newPhi = steps[idx - 1]["r"];
            steps.push({"e": newE, "phi": newPhi, "q": Math.floor(newE / newPhi), "r": newE % newPhi});
            idx++;
        }
        // extended euclidean algorithm
        steps[steps.length - 1]["x"] = 0;
        steps[steps.length - 1]["y"] = 1;
        for (let i = steps.length - 2; i >= 0; i--) {
            steps[i]["x"] = steps[i + 1]["y"];
            steps[i]["y"] = steps[i + 1]["x"] - steps[i]["q"] * steps[i + 1]["y"];
        }
        this.calculatingSteps = steps;
        if (steps[0]["x"] < 0) return phi + steps[0]["x"];
        return steps[0]["x"];
    }

    /**
     * Generate an array filled with numbers, that have no common divisor other than 1 in relation to (p-1)*(q-q).
     * https://www.maths2mind.com/schluesselwoerter/teilerfremde-zahlen
     * @param {number} p
     * @param {number} q
     * @returns {Array <number>}
     */
    static generatePossibleE(p: number, q: number): number[] {
        const result: number[] = [];
        const fn = (p - 1) * (q - 1);
        let idx = 2;
        while(idx < fn/2 || result.length < 10){
            if (!hasCommonDivider(idx, fn)) result.push(idx);
            idx++;
        }
        return result;
    }

    /**
     * Decodes a given number using its own private key.
     * @param {number} number
     * @returns {number}
     */
    decode(number: number): number {
        return Number(BigInt(number) ** BigInt(this.privateKey["exponent"]) % BigInt(this.privateKey["divisor"]));
    }

    /**
     * Encrypts a given number using the given public key.
     * @param {number} number
     * @param {number} publicKey
     * @returns {number}
     */
    encode(number: number, publicKey: IRsaKey): number {
        return Number(BigInt(number) ** BigInt(publicKey["exponent"]) % BigInt(publicKey["divisor"]));
    }
}