import AI from "../../Wolfie2D/DataTypes/Interfaces/AI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import Receiver from "../../Wolfie2D/Events/Receiver";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Graphic from "../../Wolfie2D/Nodes/Graphic";

export default class BeamBehavior implements AI {
    private owner: Graphic;
    private receiver: Receiver;

    private ySpeed: number;
    private dir: Vec2;

    public initializeAI(owner: Graphic, options: Record<string, any>): void {
        this.owner = owner;

        this.dir = Vec2.UP;
        this.ySpeed = 500;
        this.receiver = new Receiver();

        this.activate(options);
    }
    
    public activate(options: Record<string, any>): void {
        this.owner.position.copy(options.pos)
        console.log(options.pos)
        this.ySpeed = options.speed?options.speed:this.ySpeed;
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
            this.owner.move(this.dir.clone().scale(this.ySpeed*deltaT));
        }
    }

    public destroy(): void {}
}