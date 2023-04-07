import Timer from "../../../Wolfie2D/Timing/Timer";
import ShieldMookActor from "../../actors/EnemyActors/ShieldMookActor";
import HPActor from "../../actors/abstractActors/HPActor";
import BasicEnemyAI from "../abstractAI/BasicEnemyAI";



export default class ShieldMookBehavior extends BasicEnemyAI{
    protected override owner: ShieldMookActor

    protected ShieldCooldown: Timer

    public initializeAI(owner: HPActor, options?: Record<string, any>): void {
        super.initializeAI(owner, options)
        this.ShieldCooldown =  new Timer(2000, ()=>{this.shieldPattern()})
    }

    public activate(options: Record<string, any>): void {
        super.activate(options)
        let shieldhp = 10
        this.owner.shield.health = shieldhp;
        this.owner.shield.maxHealth = shieldhp;
        console.log(this.owner.shield)

        this.owner.activateShield(shieldhp);
    }

    protected updateData(){
        if(!this.owner.shielded && !this.ShieldCooldown.isActive()){
            this.ShieldCooldown.reset()
            this.ShieldCooldown.start()
        }
        super.updateData()
    }

    public shieldPattern():void {
        this.owner.activateShield(10)
    }

    protected stopAI(): void {
        this.ShieldCooldown.pause()
        this.ShieldCooldown.reset()
    }
}