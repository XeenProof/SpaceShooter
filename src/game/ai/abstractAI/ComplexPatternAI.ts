import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Timer from "../../../Wolfie2D/Timing/Timer";
import Spawnable from "../../../utils/Interface/Spawnable";
import { generatePathFromList } from "../../../utils/Pathing/CreatePaths";
import PathNode from "../../../utils/Pathing/PathNode";
import PathQueue from "../../../utils/Pathing/PathQueue";
import MovementAI from "./MovementAI";


export default abstract class ComplexPatternAI extends MovementAI {
    protected owner: GameNode;
    /**The path/movement pattern of the owner*/
    protected path: PathQueue = null;
    /**The current Target of the owner*/
    protected currDest: Vec2 = null;

    protected pathCompleted: boolean = false;

    private _waitTime: number = 0;
    private _wait: boolean = false;
    private waitTimer: Timer;

    activate(options: Record<string, any>): void {
        this.currDest = null;
        this.path.clear()
        this.path = this.path.enqueueArray((options.path)?generatePathFromList(options.path):[]);
        this.pathCompleted = false;
        this.owner.position.copy((options.src)?options.src:(this.path.peek())?this.path.peek().position: Vec2.ZERO)
    }

    update(deltaT: number): void {
        this.updateData();
        if(!this.wait){
            super.update(deltaT);
        }
    }
    abstract handleEvent(event: GameEvent): void

    protected updateData(): void{
        if(this.path === null || this.pathCompleted){return;}
        if(this.currDest == null || this.owner.position.distanceSqTo(this.currDest) <= this.threshold){
            this.updateFields(this.path.dequeue())
        }
    }

    private updateFields(node: PathNode):void{
        if(this.waitTime > 0){
            this.wait = true;
            this.waitTimer = new Timer(this.waitTime, ()=>{this.wait = false})
            this.waitTimer.start()
        }
        if(node == null){
            this.pathCompleted = true;
            this.currDest = null;
            this.speed = 0;
            return
        }
        this.currDest = node.position;
        this.dir = this.owner.position.dirTo(this.currDest)
        this.speed = (node.speed > 0)?node.speed:this.speed;
        this.threshold = (node.distanceThreshold > 0)?node.distanceThreshold:this.threshold;
        this.waitTime = (node.wait)?node.wait:0
    }

    protected get wait(): boolean {return this._wait;}
    protected set wait(value: boolean) {this._wait = value;}

    public get waitTime(): number {return this._waitTime;}
    public set waitTime(value: number) {this._waitTime = value;}

    public abstract dying():void

    destroy(): void {}
}