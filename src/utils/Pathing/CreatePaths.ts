import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import RandUtils from "../../Wolfie2D/Utils/RandUtils";
import PathNode from "./PathNode";

const defaults = {
    xmin: 100,
    ymin: 100,
    xmax: 800,
    ymax: 450,
    destNum: 20,
    mindist: 300,
    repeating: 0,
    speed: -1,
    threshold: 5,
    minWait: 0,
    maxWait: 0
}

export interface Positions{
    x: number,
    y: number,
    repeat?: number,
    speed?: number,
    thresh?: number,
    wait?: number
}

export function generateRandomPathList(setList: Record<string, any>[]): PathNode[]{
    let allPathing = setList.map((set) => {return this.generateRandomPath(set)})
    let path = allPathing.reduce((x, y)=>{return [...x, ...y]}, []);
    return path;
}

export function generatePathFromList(list: Array<Positions>, default_speed: number = 300): PathNode[]{
    return list.map((pos) => {
        let { x, y, repeat, speed, thresh, wait} = pos;
        let r = (repeat)?repeat:0;
        let s = (speed)?speed:default_speed;
        let t = (thresh)?thresh:defaults.threshold
        let w = (wait)?wait:defaults.minWait
        return new PathNode(new Vec2(x,y), r, s, t, w)
    })
}

export function generateRandomPath(set: Record<string, any>): PathNode[]{
    let settings = {...defaults, ...set}
    let {destNum, repeating, speed, threshold} = settings
    let array = new Array<Vec2>(destNum);
    for(let i = 0; i < destNum; i++){
        let prev = (i > 0)? array[i-1]:null;
        array[i] = this.getNextCoord(settings, prev);
    }
    let nodes = this.toNodeList(array, repeating, speed, threshold);
    return nodes;
}

function toNodeList(list: Array<Vec2>, repeating: number, speed: number, threshold: number){
    return list.map((vec) => {return new PathNode(vec, repeating, speed, threshold)})
}

function getNextCoord(settings: Record<string, any>, previous: Vec2 = null){
    let {xmin, ymin, xmax, ymax, mindist} = settings
    let nextVec = RandUtils.randVec(xmin, xmax, ymin, ymax)
    if(previous == null){return nextVec;}
    while(nextVec.distanceTo(previous) < mindist){
        nextVec = RandUtils.randVec(xmin, xmax, ymin, ymax, nextVec)
    }
    return nextVec;
}

function generateWaitTime(min: number, max:number){
    return RandUtils.randInt(min, max);
}