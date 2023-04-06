import BaseState from "./BaseState";

const animations = {
    ATTACK: "ATTACK"
}

export default class Attack extends BaseState{
    public onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready(animations.ATTACK, true)
    }
    public onExit(): Record<string, any> {
        this.owner.animation.stop()
        return{};
    }
}