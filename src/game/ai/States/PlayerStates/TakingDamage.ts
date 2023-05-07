import { PlayerAudios } from "../../playerAI/PlayerController";
import PlayerState, { PlayerAnimations, playerstates } from "./PlayerState";


export default class TakingDamage extends PlayerState{
    private countdown:number
    public onEnter(options: Record<string, any>): void {
        this.owner.playSoundFX(PlayerAudios.DAMAGED)
        this.owner.animation.playIfNotAlready(PlayerAnimations.TAKING_DAMAGE)
        this.owner.animation.queue(PlayerAnimations.IDLE)
        this.countdown = 2
    }
    public update(deltaT: number): void {
        if(this.owner.frozen){return;}
        if(this.countdown > 0){
            this.countdown-=deltaT
        }
        if(this.countdown <= 0){
            this.finished(playerstates.IDLE);
        }
        if(this.owner.health <= 0){
            this.finished(playerstates.DYING)
        }
    }
    public onExit(): Record<string, any> {
        return {}
    }
}