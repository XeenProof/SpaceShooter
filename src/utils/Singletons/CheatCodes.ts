export default class CheatCodes{
    private static instance:CheatCodes
    public static triggerCheat(key: string){
        if(!this.instance){this.instance = new CheatCodes()}
        this.instance.setCheat(key, !this.instance.getCheat(key))
    }
    public static getCheat(key: string):boolean{return (this.instance)?this.instance.getCheat(key):false}

    private constructor(){this.cheats = new Map<string, boolean>()}
    private cheats:Map<string,boolean>
    private setCheat(key: string, value:boolean):void{this.cheats.set(key, value)}
    private getCheat(key: string): boolean{return this.cheats.get(key)?this.cheats.get(key):false}
}