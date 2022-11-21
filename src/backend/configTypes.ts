import {AutomaticParameterSetter, PseudoSetter, SetPQ} from "./RsaParameterSetter";
import {Difficulty} from "./Difficulty";

/**
 * Mapping Difficulty to specific RsaParameterSetter.
 */
export const configTypes = {
    [Difficulty.EASY]: AutomaticParameterSetter,
    [Difficulty.MEDIUM]: SetPQ,
    [Difficulty.HARD]: PseudoSetter,
};

