import LocalStorageHandler from "./LocalStorageHandler"

const KEY = "CHEATS"

export default class CheatCodes{
    private static _instance:CheatCodes
    private static get instance():CheatCodes{
        if(!this._instance){this._instance = new CheatCodes()}
        return this._instance
    }
    public static triggerCheat(key: string, value: boolean = !this.instance.getCheat(key), updateLocal:boolean = true){
        this.instance.setCheat(key, value)
        if(updateLocal){
            LocalStorageHandler.updateData(KEY, this.instance.cheats)
        }
    }
    public static getCheat(key: string):boolean{return this.instance.getCheat(key)}
    public static refresh(){this._instance = new CheatCodes()}
    public static clearData(){
        LocalStorageHandler.updateData(KEY)
        this.refresh()
    }

    private constructor(){
        this.cheats = new Map<string, boolean>()
        let data = LocalStorageHandler.getData(KEY)
        let keys = Object.keys(data)
        for(let k of keys){
            if(data[k]){this.setCheat(k, data[k])}
        }
    }
    private cheats:Map<string,boolean>
    private setCheat(key: string, value:boolean):void{this.cheats.set(key, value)}
    private getCheat(key: string): boolean{return this.cheats.get(key)?this.cheats.get(key):false}
}