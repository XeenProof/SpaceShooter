import { enemyAnimations, enemyStates } from "../../../../constants/enemies/enemyAnimations";
import BaseState from "../BaseState";
import EnemyState from "./EnemyState";


export default class TakingDamage extends EnemyState{
    public onEnter(options: Record<string, any>): void {
        this.owner.animation.play(enemyAnimations.TAKING_DAMAGE, false)
    }
    public update(deltaT: number): void {
        if(!this.owner.animation.isPlaying(enemyAnimations.TAKING_DAMAGE)){
            this.finished(enemyStates.IDLE);
        }
        if(this.owner.health <= 0){
            this.finished(enemyStates.DEAD)
        }
    }
    public onExit(): Record<string, any> {
        this.owner.animation.stop()
        return{};
    }
}