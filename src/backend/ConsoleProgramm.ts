import {ConfigurationRsa, ConfigurationRsaEasy, ConfigurationRsaHard, ConfigurationRsaMedium} from "./ConfigurationRsa";
import {Rsa} from "./Rsa";

const config = require("../config");
// console.log(config);
enum difficulty {
    easy=1,
    medium=2,
    hard=3

}

let configuration: ConfigurationRsa;
switch(config.difficulty){
    case difficulty.easy:
        configuration = new ConfigurationRsaEasy(config.bitLength);
        break;
    case difficulty.medium:
        configuration = new ConfigurationRsaMedium(config.bitLength);
        break;
    case difficulty.hard:
        configuration = new ConfigurationRsaHard(config.bitLength);
        break;
}
console.log(configuration);
configuration.prepRsa();
const rsa : Rsa = configuration.startRsa();
console.log("p: " + rsa.p + "\nq: "+ rsa.q + "\ne: " + rsa.publicKey["exponent"] + "\nd: " + rsa.privateKey["exponent"]);
console.log(rsa.calculatingSteps);



//
// var instance = new MyClass();
// Object.keys(instance) //["myNum1", "myNum2", "myNum3", "myString", "myBoolean"]
// instance["myNum1"] // 0
// var numerics = Object.keys(instance).map(k => instance[k]).filter(v => v.constructor === Number)
// console.log(numerics) //[0, 0, 0]
