/**
 * User schickt immer ein neues JSON welches die bestehenden Felder der userConfig überschreibt und weitere ergänzt.
 * Diese müssen dann im Anschluss über setter geprüft werden.
 * Da die Parameter selber gewählt werden müssen, muss es hierfür auch Lösungshilfen geben.
 *
 * -> Frontend anschließen
 */

import {Rsa} from "../rsaCryptography/Rsa";
import {RsaConfigHandler} from "../rsaCryptography/RsaConfigHandler";
import {Difficulty} from "../rsaCryptography/Difficulty";
import {UserConfig} from "../rsaCryptography/UserConfig";

function main() {
    const prompt = require('prompt-sync')({sigint: true});
    const userConfig = {} as UserConfig;
    let answer: string = prompt("Schwierigkeitsgrad? (1-3)");
    userConfig.difficulty= Number.parseInt(answer);
    answer = prompt("Bitlänge?");
    userConfig.bitLength = Number.parseInt(answer);
    const rsaConfig = new RsaConfigHandler(userConfig).getRSAConfig();

    //TODO: Getter und setter beim RSAConfigHandler, damit kann dann hier auch die Übergabe mittels setter erfolgen und gleich auf validität geprüft werden
    //TODO: statt der rsaConfig sollte durch den User immer die userConfig angepasst werden, und diese später dann geprüft werden
    if(userConfig.difficulty == Difficulty.MEDIUM){
        console.log("p: " + rsaConfig.p + ", q: " + rsaConfig.q);
        answer = prompt("Chose your e: ");
        rsaConfig.e = Number.parseInt(answer);
    }else if(userConfig.difficulty == Difficulty.HARD){
        console.log("Bitlength: " + userConfig.bitLength);
        answer = prompt("Chose your p: ");
        rsaConfig.p = Number.parseInt(answer);
        answer = prompt("Chose your q: ");
        rsaConfig.q = Number.parseInt(answer);
        answer = prompt("Chose your e: ");
        rsaConfig.e = Number.parseInt(answer);
    }
    // Check ob die neue Configuration auch noch korrekt ist. hier werden nochmal alle setter druchlaufen.
    const checkedConfig = new RsaConfigHandler({...userConfig, ...rsaConfig}).getRSAConfig();
    const rsa = new Rsa(rsaConfig);
    console.log("p: " + rsa.p + "\nq: "+ rsa.q + "\ne: " + rsa.publicKey["exponent"] + "\nd: " + rsa.privateKey["exponent"]);
    console.log(rsa.calculatingSteps);
}


main();