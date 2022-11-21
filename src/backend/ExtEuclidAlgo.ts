/**
 * Datastructure used for representation of the extended euclidean algorithm.
 */
export interface ExtEuclidAlgo {
    e: number;
    phi: number;
    q: number;
    r: number;
    x?: number;
    y?: number;
}