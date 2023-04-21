import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import AI from "../../../Wolfie2D/DataTypes/Interfaces/AI";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { Events } from "../../../constants/events";
import Spawnable from "../../../utils/Interface/Spawnable";
import PathNode from "../../../utils/Pathing/PathNode";
import PathQueue from "../../../utils/Pathing/PathQueue";
import SpawnableActor from "../../actors/abstractActors/SpawnableActor";


export default abstract class MovementAI extends StateMachineAI {
    protected owner: GameNode;
    /**The direction the target is moving in */
    private _dir: Vec2 = null;
    /**The speed the target is moving in */
    private _speed: number;
    /**The distance from target when considered arrived*/
    private _threshold: number;

    protected ignoreStates: boolean

    public initializeAI(owner: GameNode, config: Record<string, any>): void {
        this.receiver.subscribe(Events.PAUSE)
    }

    abstract activate(options: Record<string, any>): void

    update(deltaT: number): void {
        if(this.dir != null){
            this.owner.move(this.dir.clone().scale(this.speed*deltaT));
        }
        if(this.ignoreStates){return}
        super.update(deltaT);
    }
    public handleEvent(event: GameEvent): void{
        switch(event.type){
            case Events.PAUSE:{
                this.handlePause(event.data.get("pausing"))
            }
        }
    }

    public handlePause(pausing: boolean):void{
        if(pausing){
            this.pause()
        }else{
            this.resume()
        }
    }

    public pause():void{this.owner.freeze()}
    public resume():void{this.owner.unfreeze()}

    protected get speed(){return this._speed}
    protected set speed(value: number) {this._speed = value;}

    protected get threshold(){return this._threshold}
    protected set threshold(value: number) {this._threshold = value;}

    protected get dir(): Vec2 {return this._dir;}
    protected set dir(value: Vec2) {this._dir = value;}

    destroy(): void {}
}