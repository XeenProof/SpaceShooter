import EventReplayer from "../../../../Wolfie2D/Playback/EventReplayer";
import { Events, LevelEndConst } from "../../../../constants/events";
import { PlayerAudios } from "../../playerAI/PlayerController";
import PlayerState, { PlayerAnimations } from "./PlayerState";


export default class Dying extends PlayerState{
    public onEnter(options: Record<string, any>): void {
        this.parent.handleDeath()
        this.owner.playSoundFX(PlayerAudios.DEAD);
        this.owner.animation.playIfNotAlready(PlayerAnimations.DYING, false)
        this.owner.animation.queue(PlayerAnimations.DEAD, true)
        this.emitter.fireEvent(Events.LEVEL_ENDS, {endtype: LevelEndConst.GAME_OVER})
    }
    public update(deltaT: number): void {}
    public onExit(): Record<string, any> {
        this.owner.animation.stop()
        return {}
    }
}