import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Timer from "../../../Wolfie2D/Timing/Timer";
import Spawnable from "../../../utils/Interface/Spawnable";
import PathNode from "../../../utils/Pathing/PathNode";
import PathQueue from "../../../utils/Pathing/PathQueue";
import MovementAI from "./MovementAI";


export default abstract class ComplexPatternAI extends MovementAI {
    protected owner: GameNode & Spawnable;
    /**The path/movement pattern of the owner*/
    protected path: PathQueue = null;
    /**The current Target of the owner*/
    protected currDest: Vec2 = null;

    private _waitTime: number = 0;
    private _wait: boolean = false;
    private waitTimer: Timer;

    abstract activate(options: Record<string, any>): void

    update(deltaT: number): void {
        this.updateData();
        if(!this.wait){
            super.update(deltaT);
        }
    }
    abstract handleEvent(event: GameEvent): void

    protected updateData(): void{
        if(this.path === null || this.path.peek() === null){return;}
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

    destroy(): void {}
}