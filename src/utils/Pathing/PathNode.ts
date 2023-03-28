import Vec2 from "../../Wolfie2D/DataTypes/Vec2";


export default class PathNode {
    private _position: Vec2;
    private _repeatCount: number;
    private _speed: number;
    private _distanceThreshold: number; /** The distance a node must be to a point to consider it as having arrived */
    private _wait: number;
    
    constructor(position: Vec2 = Vec2.ZERO, repeatCount:number = 0, speed:number = -1, distanceThreshold: number = 20, waitTime: number = 0){
        this._position = position;
        this._repeatCount = repeatCount;
        this._speed = speed;
        this._distanceThreshold = distanceThreshold;
        this._wait = waitTime;
    }

    public get position(): Vec2 {return this._position;}
    public get repeatCount(): number {return this._repeatCount;}
    public get speed(): number {return this._speed;}
    public get distanceThreshold(): number {return this._distanceThreshold;}
    public get repeat(): boolean {return (this._repeatCount > 0 || this._repeatCount == -1)}
    public get wait(): number {return this._wait;}

    public used() {if(this._repeatCount > 0){this._repeatCount--;}}
}