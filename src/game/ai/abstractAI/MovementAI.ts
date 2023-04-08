import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import AI from "../../../Wolfie2D/DataTypes/Interfaces/AI";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Timer from "../../../Wolfie2D/Timing/Timer";
import Spawnable from "../../../utils/Interface/Spawnable";
import PathNode from "../../../utils/Pathing/PathNode";
import PathQueue from "../../../utils/Pathing/PathQueue";
import SpawnableActor from "../../actors/abstractActors/SpawnableActor";
import DespawnAI from "./DespawnAI";


export default abstract class MovementAI extends StateMachineAI {
    protected owner: GameNode;
    /**The direction the target is moving in */
    private _dir: Vec2 = null;
    /**The speed the target is moving in */
    private _speed: number;
    /**The distance from target when considered arrived*/
    private _threshold: number;

    protected ignoreStates: boolean

    abstract activate(options: Record<string, any>): void

    update(deltaT: number): void {
        if(this.dir != null){
            this.owner.move(this.dir.clone().scale(this.speed*deltaT));
        }
        if(this.ignoreStates){return}
        super.update(deltaT);
    }
    abstract handleEvent(event: GameEvent): void

    protected get speed(){return this._speed}
    protected get threshold(){return this._threshold}

    protected get dir(): Vec2 {return this._dir;}
    protected set dir(value: Vec2) {this._dir = value;}
    
    protected set speed(value: number) {this._speed = value;}
    protected set threshold(value: number) {this._threshold = value;}

    destroy(): void {}
}