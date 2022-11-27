import {config, configTypes} from "../backend/configTypes";
import {Difficulty} from "../backend/Difficulty";

// ... und einem generischen Aufruf anhand des difficulty-Parameters
// const configuration = new configTypes[config["difficulty"]](config.bitLength);
// console.log(configuration);
console.log(Object.values(Difficulty));
console.log(Object.keys(Difficulty).filter((value: string) => (isNaN(Number.parseInt(value)))));
console.log(Object.keys(Difficulty))
console.log(Difficulty["EASY"])
