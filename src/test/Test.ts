import {ConfigurationRsa} from "../ConfigurationRsa";

const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Enter bitLength:', (bitLength: string) => {
    new ConfigurationRsa(parseInt(bitLength)).startRsa();
    rl.close();
})

//Leichte Aufgabe
