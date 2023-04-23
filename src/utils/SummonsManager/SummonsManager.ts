import CanvasNode from "../../Wolfie2D/Nodes/CanvasNode";
import Summons from "./Summons";


export default class SummonsManager<T extends Summons>{
    private summonMap:Map<string, T>
    private summonGroup:Map<number, Set<string>>
    private keys:Set<string>

    constructor(){
        this.summonMap = new Map<string, T>()
        this.summonGroup = new Map<number, Set<string>>()
        this.keys = new Set<string>()
    }

    public addTrackedSummons(list:{key:string, minion:CanvasNode}[]):void{
        for(let {key, minion} of list){
            if(!this.keys.has(key)){continue;}
            this.summonMap.get(key).setTrackingList(minion)
        }
    }

    public getSummons(group: number = 0):Record<string, any>[]{
        let keySet = (group <= 0)?this.keys:this.getGroup(group);
        if(!keySet){return []}
        let keys = [...keySet.values()]
        let summonsList = keys.map((key)=>{return this.summonMap.get(key)})
        console.log(summonsList)
        let returnable = summonsList.map((x)=>{return x.listToSummon}).reduce((x,y)=>{return [...x, ...y]}, [])
        return returnable
    }

    public add(summons: T, ...groups:number[]):void{
        let key = summons.key
        this.summonMap.set(key, summons)
        this.keys.add(key)
        for(let n of groups){
            this.addToGroup(n, key)
        }
    }

    public addToGroup(group:number, ...keys:string[]):void{
        if(group <= 0){console.error("Positive Group Number Required")}
        if(!this.hasGroup(group)){this.createGroup(group)}
        for(let s of keys){
            if(!this.keys.has(s)){
                console.log(`${s} not found: nothing added`)
                continue;
            }
            this.getGroup(group).add(s)
        }
    }

    protected createGroup(group: number):void{
        this.summonGroup.set(group, new Set<string>())
    }

    protected hasGroup(group: number):boolean{
        return this.summonGroup.get(group)?true:false
    }

    protected getGroup(group: number):Set<string>{
        if(group <= 0){return this.keys}
        return this.summonGroup.get(group)
    }
}