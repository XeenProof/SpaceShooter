import Weapon from "./Weapon";


export default class WeaponsManager<T extends Weapon>{
    private weaponMap:Map<string, T>
    private weaponGroup:Map<number, Set<string>>
    private keys:Set<string>

    constructor(){
        this.weaponMap = new Map<string, T>()
        this.weaponGroup = new Map<number, Set<string>>()
        this.keys = new Set<string>()
    }

    public getProjectiles(group: number = 0):Record<string, any>[]{
        let keySet = (group <= 0)?this.keys:this.getGroup(group);
        if(!keySet){return []}
        let keys = [...keySet.values()]
        let weaponList = keys.map((key)=>{return this.weaponMap.get(key)})
        return weaponList.map((x)=>{return x.listToFire}).reduce((x,y)=>{return [...x, ...y]}, [])
    }

    public add(key:string, weapon: T, ...groups:number[]):void{
        this.weaponMap.set(key, weapon)
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
        this.weaponGroup.set(group, new Set<string>())
    }

    protected hasGroup(group: number):boolean{
        return this.weaponGroup.get(group)?true:false
    }

    protected getGroup(group: number):Set<string>{
        if(group <= 0){return this.keys}
        return this.weaponGroup.get(group)
    }
}