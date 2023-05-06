import PlayerState, { PlayerAnimations, playerstates } from "./PlayerState";


export default class TakingDamage extends PlayerState{
    public onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready(PlayerAnimations.TAKING_DAMAGE)
        this.owner.animation.queue(PlayerAnimations.IDLE)
    }
    public update(deltaT: number): void {
        if(this.owner.animation.isPlaying(PlayerAnimations.IDLE)){
            this.finished(PlayerAnimations.IDLE);
        }
        if(this.owner.health <= 0){
            this.finished(playerstates.DYING)
        }
    }
    public onExit(): Record<string, any> {
        return {}
    }
}