import { enemyAnimations } from "../../../../constants/enemies/enemyAnimations";
import BaseState from "../BaseState";


export default class Idle extends BaseState{
    public onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready(enemyAnimations.IDLE, true)
    }
    public onExit(): Record<string, any> {
        this.owner.animation.stop()
        return{};
    }
}