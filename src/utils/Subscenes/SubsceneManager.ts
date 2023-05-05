import Subscene from "./Subscene";


export default class SubsceneManager<T extends Subscene>{
    private map:Map<string, T>
    private list:T[]

    constructor(){
        this.map = new Map<string, T>()
        this.list = []
    }

    public add(key:string, subscene:T):void{
        this.map.set(key, subscene)
        this.list.push(subscene)
    }
    public get(key):T{
        return this.map.get(key)
    }
    public loadSubscenes():void{for(let s of this.list){s.loadScene()}}
    public startSubscenes():void{for(let s of this.list){s.startScene()}}
    public updateSubscenes(delta:number):void{
        for(let s of this.list){
            if(s.active){s.updateScene(delta)}
        }}
    public unloadSubscenes():void{for(let s of this.list){s.unloadScene()}}
}