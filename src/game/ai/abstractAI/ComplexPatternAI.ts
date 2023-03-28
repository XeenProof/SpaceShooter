import AI from "../../../Wolfie2D/DataTypes/Interfaces/AI";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Timer from "../../../Wolfie2D/Timing/Timer";
import PathNode from "../../../utils/Pathing/PathNode";
import PathQueue from "../../../utils/Pathing/PathQueue";
import MovementAI from "./MovementAI";


export default abstract class ComplexPatternAI extends MovementAI {
    protected owner: GameNode;
    /**The path/movement pattern of the owner*/
    protected path: PathQueue = null;
    /**The current Target of the owner*/
    protected currDest: Vec2 = null;

    abstract initializeAI(owner: GameNode, options: Record<string, any>): void

    abstract activate(options: Record<string, any>): void

    update(deltaT: number): void {
        this.updateData();
        super.update(deltaT);
    }
    abstract handleEvent(event: GameEvent): void

    protected updateData(): void{
        if(this.path === null || this.path.peek() === null){return;}
        if(this.currDest === null || this.owner.position.distanceSqTo(this.currDest) <= this.threshold){
            this.updateFields(this.path.dequeue())
        }
    }

    private updateFields(node: PathNode):void{
        if(node == null){
            this.currDest = null;
            this.speed = 0;
            return
        }
        this.currDest = node.position;
        this.dir = this.owner.position.dirTo(this.currDest)
        console.log(this.currDest.x, this.currDest.y)
        console.log(this.path)
        console.log(node)
        this.speed = (node.speed > 0)?node.speed:this.speed;
        this.threshold = (node.distanceThreshold > 0)?node.distanceThreshold:this.threshold;
    }

    destroy(): void {}
}