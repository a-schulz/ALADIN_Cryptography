import {AutomaticParameterSetter, PseudoSetter, SetPQ} from "./RsaParameterSetter";
import {Difficulty} from "./Difficulty";
import {RsaConfig} from "./RsaConfig";
import {UserConfig} from "./UserConfig";

export class RsaConfigHandler {
    private RSAConfig: RsaConfig;

    // Lässt sich evtl. auch als Strategy mit Dependency-Injection im constructor implementieren (s. https://refactoring.guru/design-patterns/strategy/typescript/example)
    private difficultySetting = {
        [Difficulty.EASY]: AutomaticParameterSetter,
        [Difficulty.MEDIUM]: SetPQ,
        [Difficulty.HARD]: PseudoSetter
    };

    constructor(private userConfig: UserConfig) {
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