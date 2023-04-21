

export default class ProgressTracker{
    private static _instance:ProgressTracker
    private static get instance():ProgressTracker{
        if(!this._instance){this._instance = new ProgressTracker()}
        return this._instance
    }
    public static getProgress(key:string):number{return this.instance.getProgress(key)}
    public static setProgress(key:string, value:number, updateLocal:boolean = true):void{
        this.instance.setProgress(key, value)
    }
    public static getBool(key:string):boolean{return !!this.getProgress(key)}
    /**Instantanious methods */
    private process:Map<string, number>
    constructor(){this.process = new Map<string, number>()}
    getProgress(key:string):number{return this.process.get(key)?this.process.get(key):0}
    setProgress(key:string, value:number):void{this.process.set(key, value)}
}