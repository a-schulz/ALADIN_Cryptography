import {AutomaticParameterSetter, IRsaConfig, IUserConfig, PseudoSetter, SetPQ} from "./RsaParameterSetter";
import {Difficulty} from "../config";

export class RsaConfigHandler {
    private RSAConfig: IRsaConfig;

    // Lässt sich evtl. auch als Strategy mit Dependency-Injection im constructor implementieren (s. https://refactoring.guru/design-patterns/strategy/typescript/example)
    private difficultySetting = {
        [Difficulty.easy]: AutomaticParameterSetter,
        [Difficulty.medium]: SetPQ,
        [Difficulty.hard]: PseudoSetter
    };

    constructor(private userConfig: IUserConfig) {
        const parameterSetter = new this.difficultySetting[userConfig.difficulty](userConfig.bitLength);

        this.RSAConfig = {
            ...userConfig,
            ...parameterSetter.setParameters(),
        };
    }

    public getRSAConfig() {
        return this.RSAConfig;
    }
}