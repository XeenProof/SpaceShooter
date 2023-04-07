import { enemyAnimations, enemyStates } from "../../../../constants/enemies/enemyAnimations";
import BaseState from "../BaseState";
import EnemyState from "./EnemyState";


export default class Idle extends EnemyState{
    public onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready(enemyAnimations.IDLE, true)
    }
    public update(deltaT: number):void {
        if(this.owner.health <= 0){
            this.finished(enemyStates.DEAD)
        }
    }
    public onExit(): Record<string, any> {
        this.owner.animation.stop()
        return{};
    }
}