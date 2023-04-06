import { enemyAnimations, enemyStates } from "../../../../constants/enemies/enemyAnimations";
import BaseState from "../BaseState";


export default class TakingDamage extends BaseState{
    public onEnter(options: Record<string, any>): void {
        this.owner.animation.play(enemyAnimations.TAKING_DAMAGE, false, "End")
    }
    public update(deltaT: number): void {
        if(!this.owner.animation.isPlaying(enemyAnimations.TAKING_DAMAGE)){
            this.finished(enemyStates.IDLE);
        }
    }
    public onExit(): Record<string, any> {
        this.owner.animation.stop()
        return{};
    }
}