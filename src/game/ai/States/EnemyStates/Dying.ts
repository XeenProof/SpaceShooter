import { enemyAnimations } from "../../../../constants/enemies/enemyAnimations";
import BaseState from "../BaseState";
import EnemyState from "./EnemyState";


export default class Dying extends EnemyState{
    public onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready(enemyAnimations.DYING, false)
        this.owner.healthBar.visible = false
    }
    update(deltaT:number){
        if(!this.owner.animation.isPlaying(enemyAnimations.DYING)){
            this.parent.dying()
        }
    }
    public onExit(): Record<string, any> {
        this.owner.animation.stop()
        return{};
    }
}