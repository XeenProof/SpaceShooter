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
import PlayerActor from "../../actors/PlayerActor";
import ComplexPatternAI from "../abstractAI/ComplexPatternAI";

const animations = {
    IDLE: "IDLE",
    TAKING_DAMAGE: "TAKING_DAMAGE"
}

export default class MookBehavior extends ComplexPatternAI{
    protected override owner: MookActor

    protected target: PlayerActor;
    protected weaponCooldown: Timer;

    public initializeAI(owner: MookActor, options: Record<string, any>): void {
        this.owner = owner

        this.weaponCooldown = new Timer(1000, ()=>{this.firePattern()}, true);

        this.receiver.subscribe(Events.PLAYER_ENEMY_COLLISION);
        this.receiver.subscribe(Events.WEAPON_ENEMY_COLLISION);

        this.path = new PathQueue(30)
    }

    public activate(options: Record<string, any>): void {
        super.activate(options)
        this.target = this.owner.getScene().player
        this.weaponCooldown.start()

        let hp = options.hp?options.hp:10;
        this.owner.maxHealth = hp;
        this.owner.health = hp;
    }

    protected firePattern():void{
        this.owner.fireEvent(Events.ENEMY_SHOOTS, {src: this.owner.position, dir: null, id: this.owner.id, type: bulletType.ENEMY_BEAM})
    }


    public update(deltaT: number){
        if(!this.owner.visible){return;}
        while(this.receiver.hasNextEvent()){
			this.handleEvent(this.receiver.getNextEvent());
		}
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
        this.owner.takeDamage(damage)
    }

    protected handleDamage(enemyId, shotid):void{
        if(enemyId != this.owner.id){return;}
        let bullet = this.owner.getScene().getShot(shotid)
        //if(!bullet.visible){return;}
        let damage = this.owner.getScene().getDamage(bullet.damage_key)
        this.owner.takeDamage(damage)
    }

    protected despawn(){
        this.owner.despawn();
        this.weaponCooldown.pause()
        this.weaponCooldown.reset()
    }
    
}