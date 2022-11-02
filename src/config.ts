import {ConfigurationRsaEasy, ConfigurationRsaHard, ConfigurationRsaMedium} from "./backend/ConfigurationRsa";

export enum Difficulty{
    easy = 1,
    medium = 2,
    hard = 3,
}

/**
 * this is the format of the userinput
 */
export const config = {
    "bitLength": 5,
    "difficulty": Difficulty.easy
}

// Ersetzt ihr Switch Case mit einem Dictionary ...
// quasi Mapping, bei dem die Version der Configuration mit der Schwierigkeitsstufe dargestellt wird.
export const configTypes = {
    [Difficulty.easy]: ConfigurationRsaEasy,
    [Difficulty.medium]: ConfigurationRsaMedium,
    [Difficulty.hard]: ConfigurationRsaHard,
};