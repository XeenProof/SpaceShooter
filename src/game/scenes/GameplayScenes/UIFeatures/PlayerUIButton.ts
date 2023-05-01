import Button from "../../../../Wolfie2D/Nodes/UIElements/Button";
import Color from "../../../../Wolfie2D/Utils/Color";
import EventButton from "../../../../utils/SelectionUtils/EventButton";
import PlayerActor from "../../../actors/PlayerActor";


export default abstract class PlayerUIButton extends EventButton{
    protected player:PlayerActor
    protected button:Button

    constructor(player:PlayerActor, button:Button){
        super()
        this.player = player
        this.button = button
    }

    settingsIfLocked(): void {
        this.button.textColor = Color.WHITE
    }
    settingsIfUnlocked(): void {
        this.button.textColor = Color.BLACK
    }
}