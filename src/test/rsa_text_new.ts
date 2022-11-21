// const text = "Dieser Text soll verschlüsselt werden";

import {RsaKey} from "../backend/RsaKey";
import {Rsa} from "../backend/Rsa";
import {RsaConfig} from "../backend/RsaConfig";

const text = "ALA";
const number = 12;

const rsaConfig : RsaConfig = {p: 3023, q:3037, e: 5};

const publicKey : RsaKey = {divisor: rsaConfig["p"] * rsaConfig["q"], exponent: rsaConfig["e"]};
const privateKey : RsaKey = {divisor: rsaConfig["p"] * rsaConfig["q"], exponent: 19035};

const zeroPad = (num: string | number, places: number) => String(num).padStart(places, '0')
const zeroPadBytes = (num: string | number) => {
    const input = num.toString();
    let padLength : number;
    (input.length%8 == 0)? padLength= input.length : padLength= (Math.floor(input.length/8)+1) * 8;
    return input.padStart(padLength, '0')}

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

const rsa = new Rsa(rsaConfig);
const textAsBytes = text2Bytes(text);
console.log(textAsBytes);
const textAsDecimal = Number.parseInt(textAsBytes, 2)
console.log("Text als Dezimalzahl: " + textAsDecimal);
const encryptAsDecimal = rsa.encode(textAsDecimal, publicKey)
console.log("Verschlüsselt dezimal: " + encryptAsDecimal);
const encryptAsBytes = zeroPadBytes(encryptAsDecimal.toString(2));
console.log("Verschlüsselt binär: " + encryptAsBytes);
const decryptedAsBytes = zeroPadBytes(rsa.decode(encryptAsDecimal).toString(2));
console.log("Entschlüsselt binär: " + decryptedAsBytes);
console.log("Entschlüsselt Text: " + bytes2String(decryptedAsBytes));