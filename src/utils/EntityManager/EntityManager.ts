import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import CanvasNode from "../../Wolfie2D/Nodes/CanvasNode";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Spawnable from "../Interface/Spawnable";


/**Key would equate the type of enemy */
export default class EntityManager<T extends CanvasNode>{
    private entityKeys:Array<string>
    private entities:Map<string, Array<T>>
    private initFuncs:Map<string, ()=>T>
    private comparables:Map<string, Record<string, any>>

    constructor(){
        this.entityKeys = new Array<string>()
        this.entities = new Map<string,Array<T>>()
        this.initFuncs = new Map<string, ()=>T>();
        this.comparables = new Map<string, Record<string, any>>()
    }

    public initEntity(key: string, total:number, func: ()=>T = this.getinitFunc(key), comparable:Record<string, any> = {}):T{
        if(!func){console.log("can't initiate"); return}
        let array = new Array<T>(total)
        let old = this.getEntityList(key)?this.getEntityList(key):[]
        for(let i = 0; i < array.length; i++){array[i] = func();}
        let original = this.getComparable(key)?this.getComparable(key):{}
        this.entities.set(key, [...old, ...array])
        this.initFuncs.set(key, func)
        this.comparables.set(key, {...original, ...comparable})
        this.entityKeys.push(key)
    }

    public getEntity(key: string){
        let list = this.getEntityList(key);
        if(!list) {return null;}
        return list.find((x)=>{return !x.visible})
    }

    public findEntity(entityFilter: (value?: any, index?: number) => boolean = ()=>{return true;}, keyFilter: (value?: any, index?: number) => boolean = ()=>{return true;}):(T)[]{
        let filteredKeys = this.entityKeys.filter((x, i) => {return keyFilter(this.getComparable(x), i)});
        let foundEntities = filteredKeys.map((x) => {return this.getEntityList(x)}).reduce((x,y)=>{return [...x, ...y]}, []).filter(entityFilter)
        return foundEntities
    }

    public findOneEntity(entityFilter: (value?: any, index?: number) => boolean = ()=>{return true;}, keyFilter: (value?: any, index?: number) => boolean = ()=>{return true;}):(T){
        let foundEntities = this.findEntity(entityFilter, keyFilter)
        return (foundEntities.length > 0)?foundEntities[0]:null
    }

    public findClosestEntity(pos: Vec2, keyFilter: (value?: any, index?: number) => boolean = ()=>{return true;}):(T){
        let found = this.findEntity((value: CanvasNode) => {return value.visible}, keyFilter)
        if(found.length <= 0){return null}
        let closest:T = found[0]
        let leastDistance:number = closest.position.distanceSqTo(pos)
        for(let node of found){
            let distance = node.position.distanceSqTo(pos)
            if(leastDistance > distance){
                closest = node
                leastDistance = distance
            }
        }
        return closest
    }

    public getEntityById(id: number, physicsGroup?: string):(T){
        let idFinder = (value: CanvasNode, index: number) => {return value.id == id}
        let groupFinder = (physicsGroup)?(value: any, index: number) => {return value.PHYSICS == physicsGroup}:()=>{return true}
        let found = this.findEntity(idFinder, groupFinder);
        if(found.length >= 1){return found[0]}
        return null;
    }

    public countInUse(keyFilter: (value?: any, index?: number) => boolean = ()=>{return true;}, condition:(value?: any, index?: number) => boolean = (value: CanvasNode) => {return value.visible}):number{
        let found = this.findEntity(condition, keyFilter)
        return found.length
    }

    protected getinitFunc(key:string){return this.initFuncs.get(key)}
    protected getEntityList(key:string){return this.entities.get(key);}
    protected getComparable(key:string){return this.comparables.get(key)}
    public get keys(){return this.entityKeys}
}