import {RsaParameterSetter, AutomaticParameterSetter, SetPQ} from "../backend/RsaParameterSetter";
import {Rsa} from "../backend/Rsa";


let configuration: RsaParameterSetter;
configuration = new SetPQ(4);

function preptPromise() {
    return new Promise(function(res, rej){
        configuration.prepRsa()
        res("Prep finished");
    })
}

preptPromise()
    .then(function(result){
        console.log(result);
    })
// const prepPromise = () => {return new Promise((resolve) => {
//     configuration.prepRsa();
//     console.log(configuration.p);
//     resolve("hallo");
// })};
// let rsa: Rsa;
// prepPromise().then(function (value){console.log(value)});
//     console.log("promise should be finished")
//     rsa = configuration.startRsa();
//     console.log("p: " + rsa.p + "\nq: " + rsa.q + "\ne: " + rsa.publicKey["exponent"] + "\nd: " + rsa.privateKey["exponent"]);
//     console.log(rsa.calculatingSteps);
// },
//     (reject) => console.log("anderer weg"));

// function initPromise() {
//     return new Promise(function(res, rej) {
//         res("initResolve");
//     })
// }
//
// initPromise()
//     .then(function(result) {
//         console.log(result); // "initResolve"
//         return "normalReturn";
//     })
//     .then(function(result) {
//         console.log(result); // "normalReturn"
//     });