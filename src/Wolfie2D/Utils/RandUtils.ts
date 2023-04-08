import MathUtils from "./MathUtils";
import Color from "./Color";
import Perlin from "./Rand/Perlin";
import Vec2 from "../DataTypes/Vec2";
import RANDOM from 'seed-random';

class Noise {
    p: Perlin = new Perlin();

    perlin(x: number, y: number, z?: number): number {
        return this.p.perlin(x, y, z);
    }
}

/** A class that has some random generator utils */
export default class RandUtils {

    private static _seed: string | undefined;
    private static _rand: () => number;

    static randomInt(v1: number, v2: number = 0):number{
        if(v1 == v2) return v1;
        let min = Math.min(v1, v2)
        let max = Math.max(v1, v2)
        let range = max-min+1;
        return Math.floor(min+(this.random()*range))
    }

    static randomChance(chance: number):boolean{
        return (this.random()<=chance)
    }

    /**
     * The random function for Wolfie2D. The random() method generates a random number using 
     * the function exported seed-random. This function does the exact same thing that 
     * Math.random() does, except it allows us to use a seed.
     * 
     * @returns a random number from the function _rand() that generates random numbers based
     * on the seed, _seed.
     */
    static random(): number {
        if (RandUtils._rand === undefined || RandUtils._rand === null) { 
            RandUtils._rand = RANDOM(RandUtils.seed);
        }
        return RandUtils._rand();
    }

    static randomSeed(): string {
        return Math.random().toString();
    }

    /** 
     * Gets the seed used by the random number generator. If the seed is null or undefined,
     * a seed is generated using RandUtils.randomSeed().
     * @returns the seed
     */
    static get seed(): string { 
        if (RandUtils._seed === undefined || RandUtils._seed === null) {
            RandUtils._seed = RandUtils.randomSeed();
        }
        return RandUtils._seed; 
    }

    /** 
     * Sets the seed used by the random number generator. Sets the _rand function used
     * by random() to a new function, seeded with the given seed.
     * @param seed the seed used by the random number generator
     */
    static set seed(seed: string) { 
        RandUtils._seed = seed;
        RandUtils._rand = RANDOM(seed);
    }

    /**
     * Generates a random integer in the specified range
     * @param min The min of the range (inclusive)
     * @param max The max of the range (exclusive)
     * @returns A random int in the range [min, max)
     */
	static randInt(min: number, max: number): number {
        return Math.floor(RandUtils.random()*(max - min) + min);
    }

    /**
     * Generates a random float in the specified range
     * @param min The min of the range (inclusive)
     * @param max The max of the range (exclusive)
     * @returns A random float in the range [min, max)
     */
	static randFloat(min: number, max: number): number {
        return RandUtils.random()*(max - min) + min;
    }
    
    /**
     * Generates a random hexadecimal number in the specified range
     * @param min The min of the range (inclusive)
     * @param max The max of the range (exclusive)
     * @returns a random hex number in the range [min, max) as a string
     */
    static randHex(min: number, max: number): string {
        return MathUtils.toHex(RandUtils.randInt(min, max));
    }

    /**
     * Generates a random color
     * @returns A random Color
     */
	static randColor(): Color {
        let r = RandUtils.randInt(0, 256);
        let g = RandUtils.randInt(0, 256);
        let b = RandUtils.randInt(0, 256);
        return new Color(r, g, b);
    }

    static randVec(minX: number, maxX: number, minY: number, maxY: number, memory: Vec2 = Vec2.ZERO): Vec2 {
        memory.x = this.randFloat(minX, maxX);
        memory.y = this.randFloat(minY, maxY);
        return memory;
    }

    /** A noise generator */
    static noise: Noise = new Noise();

}