import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import PathQueue from "../../../utils/Pathing/PathQueue";
import MookActor from "../../actors/MookActor";
import MovementAI from "../abstractAI/MovementAI";



export default class MookBehavior extends MovementAI{
    public override owner: MookActor

    public initializeAI(owner: MookActor, options: Record<string, any>): void {
        this.owner = owner
        this.path = new PathQueue(30)
    }

    public activate(options: Record<string, any>): void {
        console.log(options.path);
        this.path = this.path.enqueueArray((options.path)?options.path:[]);
        this.owner.position.copy((this.path.peek())?this.path.peek().position: Vec2.ZERO)
    }


    public update(deltaT: number){
        super.update(deltaT)
    }
    public handleEvent(event: GameEvent): void {
        throw new Error("Method not implemented.");
    }
    
}