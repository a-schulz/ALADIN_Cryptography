import {ConfigurationRsa} from "../ConfigurationRsa";
import {Rsa} from "../Rsa";

const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let rsa: Rsa;
rl.question('Enter bitLength:', (bitLength: string) => {
    rsa = new ConfigurationRsa(parseInt(bitLength)).startRsa();
    console.log("p: " + rsa.p + "\nq: "+ rsa.q + "\ne: " + rsa.publicKey["exponent"] + "\nd: " + rsa.privateKey["exponent"]);
    console.log(rsa.calculatingSteps);
    let encoded: number;
    rl.question('Enter number to encode:', (answer: string) => {
        encoded = rsa.encode(parseInt(answer), rsa.publicKey);
        console.log("encode: " + encoded);
        console.log("decode: " + rsa.decode(encoded));
        rl.close();
    })
})

/*
pk/sk sind beide vom typ Key diagramm sollte dahingehend noch verschlankt werden.

Codierung/Dekodierung Schritt für Schritt.

Einlesen welcher Aufgaben Schwierigkeit sollte als Config geschehen.

-> sehen wie weit ich komme. Ansonsten danach direkt Huffmann mit den Graphen

Probleme dokumentieren und abspeichern für den Projektbericht
 */

