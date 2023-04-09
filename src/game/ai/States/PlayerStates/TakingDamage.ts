import Timer from "../../../../Wolfie2D/Timing/Timer";
import PlayerActor from "../../../actors/PlayerActor";
import PlayerController from "../../PlayerController";
import MovementAI from "../../abstractAI/MovementAI";
import PlayerState, { PlayerAnimations, playerstates } from "./PlayerState";


export default class TakingDamage extends PlayerState{
    private playTimer:Timer
    constructor(owner:PlayerActor, parent:PlayerController){
        super(owner, parent);
        this.playTimer = new Timer(720, ()=>{this.finished(playerstates.IDLE)}, false)
    }
    public onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready(PlayerAnimations.TAKING_DAMAGE)
        this.playTimer.reset();
        this.playTimer.start();
    }
    public update(deltaT: number): void {
        if(this.owner.health <= 0){
            this.finished(playerstates.DYING)
        }
    }
    public onExit(): Record<string, any> {
        this.playTimer.pause();
        this.owner.animation.stop()
        return {}
    }
}