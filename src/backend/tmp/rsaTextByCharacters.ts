import {RsaConfig} from "../RsaConfig";
import {Rsa} from "../Rsa";

const text = "AB";

const rsaConfig : RsaConfig = {p: 167, q:173, e: 3};

/**
 * Converts given text to array of corresponding binary numbers. (ASCII)
 * @param string
 */
function text2Binary(string: string): string[]{
    return string.split('').map(function (char : string) {
        return char.charCodeAt(0).toString(2);
    });
}

/**
 * Converts given binaries to array of corresponding decimal numbers.
 * @param string
 */
const binary2Decimal = (string: string[]): number[] => {
    return string.map( (element : string) => {
        return Number.parseInt(element,2);
    });
}

/**
 * Converts given decimals to responding string.
 * @param number
 */
const decimal2Text = (number: number[]) => {
    return number.map((element : number) => {
        return String.fromCharCode(element);
    }).join("");
}

/**
 * Converts given text to array of corresponding decimal numbers. (ASCII)
 * @param string
 */
const text2Decimal = (string: string): number[] => {
    return string.split("").map( (element : string) => {
        return element.charCodeAt(0);
    });
}

/*
Test
 */
console.log("Schritt für Schritt");
const rsa = new Rsa(rsaConfig);
console.log(rsa);
console.log("Text: " + text);
const textAsBytes = text2Binary(text)
console.log("Byte: " + textAsBytes);
const textAsDecimal = binary2Decimal(textAsBytes);
console.log("Dezimal: " + textAsDecimal);
const encodedAsDecimal = textAsDecimal.map((element : number) => {
    return rsa.encode(element, rsa.publicKey);
});
console.log("Verschlüsselt dezimal: " + encodedAsDecimal);
const encodedAsText = decimal2Text(encodedAsDecimal);
console.log("Verschlüsselt text: " + encodedAsText);
const decodedAsDecimal = encodedAsDecimal.map((element: number) => {
    return rsa.decode(element);
});
console.log("Entschlüsselt dezimal: " + decodedAsDecimal);
console.log("Entschlüsselt text: " + decimal2Text(decodedAsDecimal));