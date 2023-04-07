import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Emitter from "../../../Wolfie2D/Events/Emitter";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { bulletType } from "../../../constants/bulletTypes";
import { enemyStates } from "../../../constants/enemies/enemyAnimations";
import { Events } from "../../../constants/events";
import PathQueue from "../../../utils/Pathing/PathQueue";
import { TargetableEntity } from "../../../utils/Targeting/TargetableEntity";
import MookActor from "../../actors/EnemyActors/MookActor";
import PlayerActor from "../../actors/PlayerActor";
import Dying from "../States/EnemyStates/Dying";
import Idle from "../States/EnemyStates/Idle";
import TakingDamage from "../States/EnemyStates/TakingDamage";
import BasicEnemyAI from "../abstractAI/BasicEnemyAI";
import ComplexPatternAI from "../abstractAI/ComplexPatternAI";

const animations = {
    IDLE: "IDLE",
    TAKING_DAMAGE: "TAKING_DAMAGE"
}

export default class MookBehavior extends BasicEnemyAI{
    protected override owner: MookActor

    protected target: PlayerActor;
    protected weaponCooldown: Timer;

    public initializeAI(owner: MookActor, options: Record<string, any>): void {
        super.initializeAI(owner, options)
        this.weaponCooldown = new Timer(1000, ()=>{this.actionPattern()}, true);
    }

    public activate(options: Record<string, any>): void {
        super.activate(options)
    }

    protected actionPattern():void{
        this.owner.fireEvent(Events.ENEMY_SHOOTS, {src: this.owner.position, dir: Vec2.DOWN, id: this.owner.id, key: bulletType.ENEMY_BEAM})
    }


    public update(deltaT: number){
        super.update(deltaT)
    }

    protected stopAI(): void {
        this.weaponCooldown.pause()
        this.weaponCooldown.reset()
    }
}