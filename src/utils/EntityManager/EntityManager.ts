import CanvasNode from "../../Wolfie2D/Nodes/CanvasNode";
import Spawnable from "../Interface/Spawnable";


/**Key would equate the type of enemy */
export default class EntityManager{
    private entityKeys:Array<string>
    private entities:Map<string, Array<CanvasNode & Spawnable>>
    private initFuncs:Map<string, ()=>CanvasNode & Spawnable>
    private comparables:Map<string, Record<string, any>>

    constructor(){
        this.entityKeys = new Array<string>()
        this.entities = new Map<string,Array<CanvasNode & Spawnable>>()
        this.initFuncs = new Map<string, ()=>CanvasNode & Spawnable>();
        this.comparables = new Map<string, Record<string, any>>()
    }

    public initEntity(key: string, total:number, func: ()=>CanvasNode & Spawnable = this.getinitFunc(key), comparable:Record<string, any> = {}):void{
        if(!func){console.log("can't initiate"); return}
        let array = new Array<CanvasNode & Spawnable>(total)
        for(let i = 0; i < array.length; i++){array[i] = func();}
        let original = this.getComparable(key)?this.getComparable(key):{}
        this.entities.set(key, array)
        this.initFuncs.set(key, func)
        this.comparables.set(key, {...original, ...comparable})
        this.entityKeys.push(key)
    }

    public getEntity(key: string){
        let list = this.getEntityList(key);
        if(!list) {return null;}
        return list.find((x)=>{return !x.visible})
    }

    protected getinitFunc(key:string){return this.initFuncs.get(key)}
    protected getEntityList(key:string){return this.entities.get(key);}
    protected getComparable(key:string){return this.comparables.get(key)}
    public get keys(){return this.entityKeys}
}