import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Receiver from "../../../Wolfie2D/Events/Receiver";
import Graphic from "../../../Wolfie2D/Nodes/Graphic";
import BeamActor from "../../actors/BeamActor";
import MovementAI from "../abstractAI/MovementAI";

export default class BeamBehavior extends MovementAI {
    protected override owner: BeamActor;

    public initializeAI(owner: BeamActor, options: Record<string, any>): void {
        this.owner = owner;
        this.speed = 500;
        this.dir = (options.dir)?options.dir:Vec2.UP;
        this.receiver = new Receiver();
        this.activate(options);
    }
    
    public activate(options: Record<string, any>): void {
        this.owner.position.copy(options.pos)
        this.dir = (options.dir)?options.dir:this.dir;
        this.speed = options.speed?options.speed:this.speed;
        this.receiver.ignoreEvents();
    }
    public handleEvent(event: GameEvent): void {
        console.log("handle events")
    }
    public update(deltaT: number): void {
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
        if (this.owner.visible){
            super.update(deltaT)
        }
    }

    //public updateData(): void {}
}