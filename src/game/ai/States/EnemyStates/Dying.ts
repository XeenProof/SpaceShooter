import { enemyAnimations } from "../../../../constants/enemies/enemyAnimations";
import BaseState from "../BaseState";


export default class Dying extends BaseState{
    public onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready(enemyAnimations.DYING, true)
    }
    public onExit(): Record<string, any> {
        this.owner.animation.stop()
        return{};
    }
}