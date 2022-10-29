import {config, configTypes} from "../config";

// ... und einem generischen Aufruf anhand des difficulty-Parameters
const configuration = new configTypes[config["difficulty"]](config.bitLength);
console.log(configuration);