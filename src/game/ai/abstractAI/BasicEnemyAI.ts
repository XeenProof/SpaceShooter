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
import HPActor from "../../actors/abstractActors/HPActor";
import Dying from "../States/EnemyStates/Dying";
import Idle from "../States/EnemyStates/Idle";
import TakingDamage from "../States/EnemyStates/TakingDamage";
import ComplexPatternAI from "./ComplexPatternAI";

const animations = {
    IDLE: "IDLE",
    TAKING_DAMAGE: "TAKING_DAMAGE"
}

export default abstract class BasicEnemyAI extends ComplexPatternAI{
    protected override owner: HPActor

    protected target: PlayerActor;

    public initializeAI(owner: HPActor, options: Record<string, any> = {}): void {
        this.owner = owner
        this.owner.canDespawn = false;

        this.addState(enemyStates.IDLE, new Idle(this.owner, this))
        this.addState(enemyStates.TAKING_DAMAGE, new TakingDamage(this.owner, this))
        this.addState(enemyStates.DEAD, new Dying(this.owner, this))

        this.receiver.subscribe(Events.PLAYER_ENEMY_COLLISION);
        this.receiver.subscribe(Events.WEAPON_ENEMY_COLLISION);

        this.path = new PathQueue(options.pathLength?options.pathLength:30)
    }

    public activate(options: Record<string, any>): void {
        super.activate(options)
        this.initialize(enemyStates.IDLE)
        this.owner.healthBar.visible = this.owner.visible
        this.owner.animation.playIfNotAlready(animations.IDLE, true)
        this.owner.canDespawn = false;
        this.target = this.owner.getScene().player

        let hp = options.stats?options.stats.hp:1;
        this.owner.maxHealth = hp;
        this.owner.health = hp;
    }


    public update(deltaT: number){
        if(!this.owner.visible){return;}
        while(this.receiver.hasNextEvent()){
			this.handleEvent(this.receiver.getNextEvent());
		}
        this.owner.updateHealthBar(deltaT)
        if(this.owner.despawnConditions({}) && this.owner.canDespawn){
            this.despawn();
        }
        super.update(deltaT)
    }

    public destroy(): void {
    }

    protected updateData(): void {
        if(this.owner.onScreen && !this.owner.canDespawn){this.owner.canDespawn = true}
        if(this.pathCompleted && this.target){
            this.dir = this.owner.position.dirTo(this.target.position)
            this.speed = 500;
            this.target = null;
            return
        }
        super.updateData()
    }

    public handleEvent(event: GameEvent): void {
        switch(event.type){
            case Events.PLAYER_ENEMY_COLLISION:{
                this.handleRamDamage(event.data.get("node"));
                break;
            }
            case Events.WEAPON_ENEMY_COLLISION:{
                this.handleDamage(event.data.get("node"), event.data.get("other"))
                break;
            }
        }
    }

    protected handleRamDamage(enemyId):void {
        if(enemyId != this.owner.id){return;}
        let enemy = this.owner
        let player = this.owner.getScene().player
        let damage = Math.min(enemy.ramDamage, player.ramDamage)
        this.OwnerTakeDamage(damage)
    }

    protected handleDamage(enemyId, shotid):void{
        if(enemyId != this.owner.id){return;}
        let bullet = this.owner.getScene().getShot(shotid)
        let damage = this.owner.getScene().getDamage(bullet.damage_key)
        this.OwnerTakeDamage(damage)
        
    }

    protected OwnerTakeDamage(damage:number){
        let receivedDamage = this.owner.takeDamage(damage)
        if(receivedDamage){this.changeState(enemyStates.TAKING_DAMAGE)}
    }

    public dying(){
        this.owner.dying();
        this.stopAI();
    }

    protected despawn(){
        this.owner.despawn();
        this.stopAI();
    }

    protected abstract stopAI():void;
}