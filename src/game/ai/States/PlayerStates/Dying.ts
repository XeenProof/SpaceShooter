import EventReplayer from "../../../../Wolfie2D/Playback/EventReplayer";
import { Events, LevelEndConst } from "../../../../constants/events";
import { PlayerAudios } from "../../playerAI/PlayerController";
import PlayerState, { PlayerAnimations } from "./PlayerState";


export default class Dying extends PlayerState{
    private played:boolean;
    public onEnter(options: Record<string, any>): void {
        this.parent.handleDeath()
        this.owner.playSoundFX(PlayerAudios.DEAD);
        this.owner.animation.playIfNotAlready(PlayerAnimations.DYING, false)
        this.played = false;
    }
    public update(deltaT: number): void {
        console.log("player has died")
        this.owner.animation.playIfNotAlready(PlayerAnimations.DEAD)
        this.emitter.fireEvent(Events.LEVEL_ENDS, {endtype: LevelEndConst.GAME_OVER})
        // if(!this.owner.animation.isPlaying(PlayerAnimations.DYING) && !this.played){
        //     this.played = true
        //     this.owner.animation.playIfNotAlready(PlayerAnimations.DEAD)
        //     console.log("player has died")
        //     this.emitter.fireEvent(Events.LEVEL_ENDS, {endtype: LevelEndConst.GAME_OVER})
        //     console.log("player has died post")
        // }
    }
    public onExit(): Record<string, any> {
        this.owner.animation.stop()
        return {}
    }
}