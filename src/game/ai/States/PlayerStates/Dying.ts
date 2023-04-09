import PlayerState, { PlayerAnimations } from "./PlayerState";


export default class Dying extends PlayerState{
    private played:boolean;
    public onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready(PlayerAnimations.DYING, false)
        this.played = false;
    }
    public update(deltaT: number): void {
        if(!this.owner.animation.isPlaying(PlayerAnimations.DYING) && !this.played){
            this.played = true
            this.owner.animation.playIfNotAlready(PlayerAnimations.DEAD)
            console.log("player has died")
        }
    }
    public onExit(): Record<string, any> {
        this.owner.animation.stop()
        return {}
    }
}