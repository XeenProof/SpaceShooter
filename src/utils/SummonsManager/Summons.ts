import AI from "../../Wolfie2D/DataTypes/Interfaces/AI";
import CanvasNode from "../../Wolfie2D/Nodes/CanvasNode";
import GameNode from "../../Wolfie2D/Nodes/GameNode";

export default abstract class Summons{
    protected owner: GameNode
    protected parent: AI
    private _key: string;
    protected max: number
    protected tracked: CanvasNode[]

    constructor(owner: GameNode, parent: AI, key:string, max:number = 0){
        this.owner = owner
        this.parent = parent
        this.key = key
        this.max = max
        if(this.max){this.tracked = []}
    }

    public get activated():boolean{return !this.isTracking || !this.trackedExist}

    public get listToSummon():Record<string, any>[]{
        return this.activated?this.summonsList:[]
    }

    public get isTracking():boolean{return this.max > 0}
    public get trackedExist():boolean{
        this.updateTrackingList()
        return (this.tracked.length >= this.max)
    }
    public updateTrackingList():void{if(this.isTracking){this.tracked = this.tracked.filter((x)=>{return x.visible})}}
    public setTrackingList(...value: CanvasNode[]):void{if(this.isTracking){this.tracked = [...this.tracked, ...value]}}
    public get key(): string {return this._key;}
    protected set key(value: string) {this._key = value;}

    public abstract get summonsList():Record<string, any>[]
}