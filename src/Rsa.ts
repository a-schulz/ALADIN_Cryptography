/*
Module for RSA tasks
 */

// Todo: Step-by-Step to solution.
// Run this script with the following command:
// npx ts-node .\RSA.ts

// ToDo: Automatische Tests schreiben.

interface IRsaKeys{
    publicKey: IPublicKey;
    privateKey: IPrivateKey;
}

interface IPublicKey {
    n: number;
    e: number;
}

interface IPrivateKey {
    n: number;
    d: number;
}

export class Rsa implements IRsaKeys{
    private _p: number;
    private _q: number;
    private _e: number;


    constructor(p: number, q: number, e: number) {
        this.p = p;
        this.q = q;
        this.e = e;
    }

    private _privateKey: IPrivateKey;
    private _publicKey: IPublicKey;

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
        this._e = value;
    }

    get privateKey(): IPrivateKey {
        return this._privateKey;
    }

    set privateKey(value: IPrivateKey) {
        this._privateKey = value;
    }

    get publicKey(): IPublicKey {
        return this._publicKey;
    }

    set publicKey(value: IPublicKey) {
        this._publicKey = value;
    }
}