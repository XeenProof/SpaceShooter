import PlayerState, { PlayerAnimations, playerstates } from "./PlayerState";


export default class Idle extends PlayerState{
    public onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready(PlayerAnimations.IDLE, true)
    }
    public update(deltaT: number): void {
        if(this.owner.health <= 0){
            this.finished(playerstates.DYING)
        }
    }
    public onExit(): Record<string, any> {
        this.owner.animation.stop()
        return {}
    }
}