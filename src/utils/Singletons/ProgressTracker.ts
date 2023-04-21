import LocalStorageHandler from "./LocalStorageHandler"

const KEY = "PROGRESS"

export default class ProgressTracker{
    private static _instance:ProgressTracker
    private static get instance():ProgressTracker{
        if(!this._instance){this._instance = new ProgressTracker()}
        return this._instance
    }
    public static getProgress(key:string):number{return this.instance.getProgress(key)}
    public static setProgress(key:string, value:number, updateLocal:boolean = this.instance.changes(key, value)):void{
        this.instance.setProgress(key, value)
        if(updateLocal){
            LocalStorageHandler.updateData(KEY, this.instance.progress)
        }
    }
    public static getBool(key:string):boolean{return !!this.getProgress(key)}
    /**Instantanious methods */
    private progress:Map<string, number>
    constructor(){
        this.progress = new Map<string, number>()
        let data = LocalStorageHandler.getData(KEY)
        let keys = Object.keys(data)
        for(let k of keys){
            this.setProgress(k, data[k])
        }
    }
    private getProgress(key:string):number{return this.progress.get(key)?this.progress.get(key):0}
    private setProgress(key:string, value:number):void{this.progress.set(key, value)}
    private changes(key: string, newValue:number):boolean{return this.getProgress(key) != newValue}
}