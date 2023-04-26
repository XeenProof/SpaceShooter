import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import RandUtils from "../../Wolfie2D/Utils/RandUtils";
import MemoryList from "../MemoryList.ts/MemoryList";
import PathNode from "./PathNode";

export default class PathMemory extends MemoryList<PathNode>{
    private static instance:PathMemory
    static preallocate(size:number = 0){this.instance = new PathMemory(size)}
    static newPathNode(x:number = 0, y:number = 0, r:number = 0, s:number = -1, d: number = 20, w: number = 0):PathNode{
        let node:PathNode = this.instance.getMemory()
        if(!node){node = new PathNode()}
        node.reinit(x, y, r, s, d, w)
        return node
    }
    static recycle(node:PathNode):void{this.instance.recycle(node)}
    constructor(size:number = 0){super(size)}
    protected newMemory(): PathNode {return new PathNode()}
}

export interface Range{
    min:number,
    max?:number
}

export interface Coords{
    x:number,
    y:number
}

export interface RandomizeVariables{
    /**Main ranges */
    x?: Range
    y?: Range
    speed?: Range //theash uses the speed value
    wait?: Range
    repeat?: Range
    /**generate count */
    generateAmount?: number
    distanceBetweenNodes?: number
    retryCount?: number
}

const defaultRandomizeVariables = {
    x: {min: 0, max: 900},
    y: {min: 0, max: 600},
    speed: {min: 300},
    wait: {min: 0},
    repeat: {min: 0},
    generateAmount: 20,
    distanceBetweenNodes: 450,
    retryCount: 5
}

export const spawnRandomizer = {
    x: {min: 0, max: 900},
    y: {min: 0},
    generateAmount: 1
}

export interface Positions{
    x: number,
    y: number,
    speed?: number,
    repeat?: number,
    wait?: number
    thresh?: number,
}

export function generateRandomPathFuncList(settingsList:RandomizeVariables[], defaultSettings:RandomizeVariables):Positions[]{
    let updatedSettingsList = settingsList.map((x)=>{return {...defaultSettings, ...x}})
    let PathGenerated = updatedSettingsList.map((x)=>{return generateRandomPathFunc(x)})
    let mergedPath = PathGenerated.reduce((x,y)=>{return [...x,...y]}, [])
    return mergedPath
}

export function generateRandomPathFunc(incompleteSettings:RandomizeVariables = {}):Positions[]{
    let settings = fillWithDefaults(incompleteSettings)
    console.log(settings)
    let {generateAmount} = settings
    let list:Positions[] = []
    let prev:Positions
    for(let i = 0; i < generateAmount; i++){
        let newPos = generateRandomPos(settings, prev)
        list.push(newPos)
        prev = newPos
    }
    return list
}

export function generatePathFromList(list: Array<Positions>, default_speed: number = 300): PathNode[]{
    return list.map((pos) => {
        let { x, y, repeat, speed, thresh, wait} = pos;
        let r = (repeat)?repeat:0;
        let s = (speed)?speed:default_speed;
        let t = (thresh)?thresh:s
        let w = (wait)?wait:0
        return PathMemory.newPathNode(x,y, r, s, t, w)
    })
}

function fillWithDefaults(settings: RandomizeVariables):RandomizeVariables{
    return {...defaultRandomizeVariables, ...settings}
}

function generateRandomPos(settings: RandomizeVariables, prev:Positions){
    let prevCoord = extractCoord(prev)
    let coord = generateCoords(settings, prevCoord)
    let speed = generateRandomInt(settings.speed)
    return {
        x:coord.x,
        y:coord.y,
        speed: speed,
        theash: speed,
        repeat: generateRandomInt(settings.repeat),
        wait: generateRandomInt(settings.wait)
    }
}

function generateCoords(settings:RandomizeVariables, prev?:Coords):Coords{
    let {x,y, retryCount, distanceBetweenNodes} = settings
    let xRandomizable = !!x.max || x.min != x.max
    let yRandomizable = !!y.max || y.min != y.max
    let randomizable = xRandomizable || yRandomizable
    let coord = {x:generateRandomInt(x), y:generateRandomInt(y)}
    if(!randomizable || !prev){return coord}
    let dbts = distanceBetweenNodes*distanceBetweenNodes
    for(let i = 0; i < retryCount; i++){
        let cdbts = getDistanceSq(coord, prev)
        if(dbts <= cdbts){return coord}
        coord = {x:generateRandomInt(x), y:generateRandomInt(y)}
    }
    return coord
}

function generateRandomInt(range: Range){
    if(!range.max && range.max != 0){return range.min;}
    let min = Math.min(range.min, range.max)
    let max = Math.max(range.min, range.max)
    return RandUtils.randInt(min, max)
}

function getDistanceSq(c1:Coords, c2:Coords){
    let xdiffsq = Math.pow((c1.x-c2.x),2)
    let ydiffsq = Math.pow((c1.y-c2.y),2)
    return xdiffsq+ydiffsq
}

function extractCoord(pos?: Positions):Coords{
    return (pos)?{x:pos.x, y:pos.y}:null
}