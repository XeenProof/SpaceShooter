import PlayerActor from "../../../actors/PlayerActor";
import PlayerController from "../../playerAI/PlayerController";
import BaseState from "../BaseState";

export const PlayerAnimations = {
    IDLE:"IDLE",
    TAKING_DAMAGE:"TAKING_DAMAGE",
    DYING:"DYING",
    DEAD: "DEAD"

}

export const playerstates = {
    IDLE: "IDLE",
    TAKING_DAMAGE: "TAKING_DAMAGE",
    DYING: "DYING"
}

export default abstract class PlayerState extends BaseState{
    protected parent:PlayerController
    protected owner:PlayerActor
}