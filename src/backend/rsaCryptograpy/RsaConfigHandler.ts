import {AutomaticParameterSetter, PseudoSetter, SetPQ} from "./RsaParameterSetter";
import {Difficulty} from "./Difficulty";
import {RsaConfig} from "./RsaConfig";
import {UserConfig} from "./UserConfig";
import {configTypes} from "./configTypes";

export class RsaConfigHandler {
    private RSAConfig: RsaConfig;

    constructor(private userConfig: UserConfig) {
        const parameterSetter = new configTypes[userConfig.difficulty](userConfig.bitLength);

        this.RSAConfig = {
            ...userConfig,
            ...parameterSetter.setParameters(),
        };
    }

    public getRSAConfig() {
        return this.RSAConfig;
    }
}