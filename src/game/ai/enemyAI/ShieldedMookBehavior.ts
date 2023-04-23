import Timer from "../../../Wolfie2D/Timing/Timer";
import { enemyStates } from "../../../constants/enemies/enemyAnimations";
import ShieldMookActor from "../../actors/EnemyActors/ShieldMookActor";
import HPActor from "../../actors/abstractActors/HPActor";
import BasicEnemyAI from "../abstractAI/BasicEnemyAI";

const audio = {
    DAMAGED: 0,
    DEAD: 1,
}

export default class ShieldMookBehavior extends BasicEnemyAI{
    protected override owner: ShieldMookActor

    protected ShieldCooldown: Timer

    public initializeAI(owner: ShieldMookActor, options?: Record<string, any>): void {
        super.initializeAI(owner, options)
        this.ShieldCooldown =  new Timer(2000, ()=>{this.shieldPattern()})
    }

    public activate(options: Record<string, any>): void {
        super.activate(options)
        let initshieldhp = (options.stats)?options.stats.shieldhp:10
        let hp_multi = options.mods?options.mods.hp_multi:1
        let shieldhp = initshieldhp*hp_multi
        this.owner.shield.health = shieldhp;
        this.owner.shield.maxHealth = shieldhp;

        this.owner.activateShield();
    }

    protected updateData(){
        if(!this.owner.shielded && !this.ShieldCooldown.isActive()){
            this.ShieldCooldown.reset()
            this.ShieldCooldown.start()
        }
        super.updateData()
    }

    public shieldPattern():void {
        if(this.isState(enemyStates.DEAD)){return;}
        this.owner.activateShield()
    }

    public pause(): void {
        super.pause()
        if(!this.owner.shielded){this.ShieldCooldown.pause()}
    }
    public resume(): void {
        super.resume()
        if(!this.owner.shielded){this.ShieldCooldown.start()}
    }

    protected stopAI(): void {
        this.ShieldCooldown.pause()
        this.ShieldCooldown.reset()
    }
}