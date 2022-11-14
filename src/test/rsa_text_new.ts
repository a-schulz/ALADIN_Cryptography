// const text = "Dieser Text soll verschlüsselt werden";

import {RsaKey} from "../backend/RsaKey";
import {Rsa} from "../backend/Rsa";
import {RsaConfig} from "../backend/RsaConfig";

const text = "AB";
const number = 12;

const rsaConfig : RsaConfig = {p: 167, q:173, e: 3};

const publicKey : RsaKey = {divisor: rsaConfig["p"] * rsaConfig["q"], exponent: rsaConfig["e"]};
const privateKey : RsaKey = {divisor: rsaConfig["p"] * rsaConfig["q"], exponent: 19035};

const zeroPad = (num: string | number, places: number) => String(num).padStart(places, '0')

/**
 * @param string {string}
 * @returns {string}
 */
const text2Bytes = (string: string) => string.split('').map(function (char: string) {
    return zeroPad(char.charCodeAt(0).toString(2), 8);
}).join('');

/**
 * Converts given bytes to string representation.
 * @param string
 * @returns {string}
 */
const bytes2String = (string: string) => string.match(/.{8}/g).map( (byte : string) => {
    return String.fromCharCode(Number.parseInt(byte,2));
}).join("");

const binary2Decimal = (string: string) => {
    return string.split(" ").map( (element : string) => {
        return Number.parseInt(element,2);
    }).join(" ");
}

const encode = (string: string) => {
    return string.split(" ").map( (element : string) => {
        return Number(BigInt(Number.parseInt(element)) ** BigInt(3) % BigInt(319));
    }).join(" ");
}

const decode = (string: string) => {
    return string.split(" ").map( (element : string) => {
        return Number(BigInt(Number.parseInt(element)) ** BigInt(187) % BigInt(319));
    }).join(" ");
}

const decimal2Text = (string: string) => {
    return string.split(" ").map( (element : string) => {
        return String.fromCharCode(Number.parseInt(element));
    }).join("");
}

const text2Decimal = (string: string) => {
    return string.split("").map( (element : string) => {
        return element.charCodeAt(0);
    }).join(" ");
}



const encodeText = (string: string) => {
    return decimal2Text(encode(binary2Decimal(text2Bytes(string))));
}

const decodeText = (string :string ) => {
    return decimal2Text(decode(binary2Decimal(text2Bytes(string))));
}

console.log(text)
console.log(text2Bytes(text));
console.log(bytes2String(text2Bytes(text)));

const rsa = new Rsa(rsaConfig);
console.log(Number.parseInt(text2Bytes(text), 2)); //Als Dezimalzahl
console.log("Verschlüsselt dezimal: " + rsa.encode(Number.parseInt(text2Bytes(text),2), publicKey));
console.log("Entschlüsselt binär: " + rsa.decode(rsa.encode(Number.parseInt(text2Bytes(text),2), publicKey)).toString(2));
console.log(zeroPad(rsa.decode(rsa.encode(Number.parseInt(text2Bytes(text),2), publicKey)).toString(2), 16));
console.log(bytes2String(zeroPad(rsa.decode(rsa.encode(Number.parseInt(text2Bytes(text),2), publicKey)).toString(2), 16)));


// Test ob lieber jeder Buchstabe einzeln oder eine Nachricht als ganzes (ByteStream) verschlüsselt werden sollte.

console.log("Test jeder Buchstabe einzeln:")
console.log("Schritt für Schritt");
console.log(text);
console.log(text2Bytes(text));
console.log(binary2Decimal(text2Bytes(text)))
// console.log(encode(binary2Decimal(text2Bytes(text))))
// console.log(decimal2Text(encode(binary2Decimal(text2Bytes(text)))))
// console.log(decode(encode(binary2Decimal(text2Bytes(text)))))
// console.log(decimal2Text(decode(encode(binary2Decimal(text2Bytes(text))))))
// console.log(decimal2Text(decode(encode(binary2Decimal(text2Bytes(text))))))
console.log(encodeText(text));
console.log(decodeText(encodeText(text)));
// Hatte mal funktioniert...siehe History Donnerstag den 10.11.2022

console.log(bytes2String("0100000101000010"))