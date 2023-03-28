import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Emitter from "../../../Wolfie2D/Events/Emitter";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { bulletType } from "../../../constants/bulletTypes";
import { Events } from "../../../constants/events";
import PathQueue from "../../../utils/Pathing/PathQueue";
import { TargetableEntity } from "../../../utils/Targeting/TargetableEntity";
import MookActor from "../../actors/MookActor";
import ComplexPatternAI from "../abstractAI/ComplexPatternAI";



export default class MookBehavior extends ComplexPatternAI{
    protected override owner: MookActor

    public emitter: Emitter

    //for targeting
    protected target: TargetableEntity;
    protected weaponCooldown: Timer;

    public initializeAI(owner: MookActor, options: Record<string, any>): void {
        this.owner = owner
        this.emitter = new Emitter()

        this.target = options.target
        this.weaponCooldown = new Timer(1000, ()=>{this.firePattern()}, true);
        console.log(this.emitter);

        this.path = new PathQueue(30)
    }

    public activate(options: Record<string, any>): void {
        console.log(options.path);
        this.path = this.path.enqueueArray((options.path)?options.path:[]);
        this.owner.position.copy((this.path.peek())?this.path.peek().position: Vec2.ZERO)
        this.weaponCooldown.start()
    }

    protected firePattern():void{
        this.owner.fireEvent(Events.ENEMY_SHOOTS, {src: this.owner.position, dir: Vec2.DOWN, id: this.owner.id, type: bulletType.ENEMY_BEAM})
    }


    public update(deltaT: number){
        super.update(deltaT)
        //this.firePattern()
    }
    public handleEvent(event: GameEvent): void {
        throw new Error("Method not implemented.");
    }
    
}