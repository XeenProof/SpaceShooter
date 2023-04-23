import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { Events } from "../../../constants/events";
import { EnemyProjectileKeys } from "../../../constants/projectiles/projectileData";
import MookActor from "../../actors/EnemyActors/MookActor";
import PlayerActor from "../../actors/PlayerActor";
import BasicEnemyAI from "../abstractAI/BasicEnemyAI";

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
        this.weaponCooldown.start()
    }

    public pause(): void {
        super.pause()
        this.weaponCooldown.pause()
    }
    public resume(): void {
        super.resume()
        this.weaponCooldown.start()
    }

    protected actionPattern():void{
        this.owner.fireEvent(Events.ENEMY_SHOOTS, 
            {projectiles: [
                {src: this.owner.position, 
                dir: Vec2.DOWN, 
                id: this.owner.id, 
                key: EnemyProjectileKeys.ENEMY_BEAM_GREEN}]}
            )
    }


    public update(deltaT: number){
        super.update(deltaT)
    }

    protected stopAI(): void {
        this.weaponCooldown.pause()
        this.weaponCooldown.reset()
    }
}