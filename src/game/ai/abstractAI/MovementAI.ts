import AI from "../../../Wolfie2D/DataTypes/Interfaces/AI";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Timer from "../../../Wolfie2D/Timing/Timer";
import PathNode from "../../../utils/Pathing/PathNode";
import PathQueue from "../../../utils/Pathing/PathQueue";


export default abstract class MovementAI implements AI {
    protected owner: GameNode;
    /**The direction the target is moving in */
    protected dir: Vec2 = null;
    /**The speed the target is moving in */
    private _speed: number;
    /**The distance from target when considered arrived*/
    private _threshold: number;

    abstract initializeAI(owner: GameNode, options: Record<string, any>): void

    abstract activate(options: Record<string, any>): void

    update(deltaT: number): void {
        if(this.dir != null){
            this.owner.move(this.dir.clone().scale(this.speed*deltaT));
        }
    }
    abstract handleEvent(event: GameEvent): void

    protected get speed(){return this._speed}
    protected get threshold(){return this._threshold}
    
    protected set speed(value: number) {this._speed = value;}
    protected set threshold(value: number) {this._threshold = value;}

    destroy(): void {}
}