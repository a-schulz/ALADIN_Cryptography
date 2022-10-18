/*
Module for RSA tasks
 */

// Todo: Step-by-Step to solution.
// Run this script with the following command:
// npx ts-node ./src/RSA.ts

// ToDo: Automatische Tests schreiben.
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
interface extEuclidAlgo {
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
    private _calculatingSteps: extEuclidAlgo[];


    get calculatingSteps(): extEuclidAlgo[] {
        return this._calculatingSteps;
    }

    set calculatingSteps(value: extEuclidAlgo[]) {
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

    constructor(p: number, q: number, e: number) {
        this.p = p;
        this.q = q;
        this.publicKey = {"divisor": p * q, "exponent": e};
        this.privateKey = {"divisor": p * q, "exponent": this.generateDAndSetSteps(e, (p - 1) * (q - 1))}
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
        const steps: extEuclidAlgo[] = [];
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

    decode(number: number): number {
        return number ** this.privateKey["exponent"] % this.privateKey["divisor"];
    }

    encode(number: number, publicKey: IRsaKey): number {
        return number ** publicKey["exponent"] % publicKey["divisor"];
    }
}