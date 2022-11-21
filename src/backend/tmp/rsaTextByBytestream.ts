import {Rsa} from "../Rsa";
import {RsaConfig} from "../RsaConfig";


const text = "ALA";

const rsaConfig : RsaConfig = {p: 3023, q:3037, e: 5};
//
// const text = "ALADIN";
//
// const rsaConfig : RsaConfig = {p: 10000019, q:10000079, e: 41};

/**
 * Adding zeros in front of given input.
 * @param num {string, number} input where padding is added
 * @param places number of characters of the resulting string. If it is <= length of the original string than noting will change
 */
const zeroPad = (num: string | number, places: number) => String(num).padStart(places, '0');

/**
 * Adding zeros in front of the given input so its length can be divided by 8 without remainder.
 * @param num {string, number}
 */
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
    return zeroPadBytes(char.charCodeAt(0).toString(2));
}).join('');

/**
 * Converts given bytes to string representation.
 * @param string
 * @returns {string}
 */
const bytes2String = (string: string) => string.match(/.{8}/g).map( (byte : string) => {
    return String.fromCharCode(Number.parseInt(byte,2));
}).join("");

/*
 * Test
 */
const rsa = new Rsa(rsaConfig);
console.log(rsa);
console.log("Ausgangstext: " + text);
const textAsBytes = text2Bytes(text);
console.log("Text als Bytestream: " + textAsBytes);
const textAsDecimal = Number.parseInt(textAsBytes, 2)
console.log("Text als Dezimalzahl: " + textAsDecimal);
const encryptAsDecimal = rsa.encode(textAsDecimal, rsa.publicKey)
console.log("Verschlüsselt dezimal: " + encryptAsDecimal);
const encryptAsBytes = zeroPadBytes(encryptAsDecimal.toString(2));
console.log("Verschlüsselt binär: " + encryptAsBytes);
const decryptedAsBytes = zeroPadBytes(rsa.decode(encryptAsDecimal).toString(2));
console.log("Entschlüsselt binär: " + decryptedAsBytes);
console.log("Entschlüsselt Text: " + bytes2String(decryptedAsBytes));