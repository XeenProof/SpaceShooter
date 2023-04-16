import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { Events } from "../../../constants/events";
import PathQueue from "../../../utils/Pathing/PathQueue";
import PlayerActor from "../../actors/PlayerActor";
import TargetedMookActor from "../../actors/EnemyActors/TargetedMookActor";
import ComplexPatternAI from "../abstractAI/ComplexPatternAI";
import { enemyStates } from "../../../constants/enemies/enemyAnimations";
import Idle from "../States/EnemyStates/Idle";
import TakingDamage from "../States/EnemyStates/TakingDamage";
import Dying from "../States/EnemyStates/Dying";
import BasicEnemyAI from "../abstractAI/BasicEnemyAI";
import { EnemyProjectileKeys } from "../../../constants/projectiles/projectileData";

const animations = {
    IDLE: "IDLE",
    TAKING_DAMAGE: "TAKING_DAMAGE"
}

export default class TargetedMookBehavior extends BasicEnemyAI {
    protected override owner: TargetedMookActor

    protected weaponCooldown: Timer;

    public initializeAI(owner: TargetedMookActor, options: Record<string, any>): void {
        this.weaponCooldown = new Timer(1500, ()=>{this.actionPattern()}, true);
        super.initializeAI(owner, options)
    }

    public activate(options: Record<string, any>): void {
        super.activate(options)
        this.weaponCooldown.start()
    }

    protected actionPattern():void{
        this.owner.fireEvent(Events.ENEMY_SHOOTS, {src: this.owner.position, dir: this.faceDir, id: this.owner.id, key: EnemyProjectileKeys.ENEMY_BEAM})
    }

    public update(deltaT: number){
        super.update(deltaT)
    }

    public get faceDir():Vec2{return this.owner.position.dirTo(this.target.position)}
    public get rotation():number{return Vec2.UP.angleToCCW(this.faceDir)}

    protected updateData(): void {
        this.owner.rotation = this.rotation
        super.updateData()
    }

    protected stopAI(): void {
        this.weaponCooldown.pause()
        this.weaponCooldown.reset()
    }
}