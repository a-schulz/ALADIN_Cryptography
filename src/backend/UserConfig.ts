import {Difficulty} from "./Difficulty";

/**
 * Format of the user input.
 */
export interface UserConfig {
    bitLength: number;
    difficulty: Difficulty;
    e?: number;
    p?: number;
    q?: number;
}