import Button from "../../../../Wolfie2D/Nodes/UIElements/Button";
import Color from "../../../../Wolfie2D/Utils/Color";
import EventButton from "../../../../utils/SelectionUtils/EventButton";
import PlayerActor from "../../../actors/PlayerActor";
import ActorScene from "../ActorScene";


export default abstract class PlayerUIButton extends EventButton{
    protected scene:ActorScene
    protected button:Button

    constructor(scene:ActorScene, button:Button){
        super()
        this.scene = scene
        this.button = button
        this.button.textColor = Color.BLACK
    }

    public handleDisplayUpdate(): void {
        if(!this.player){return;}
        super.handleDisplayUpdate()
    }

    protected get player():PlayerActor{return this.scene.player}

    settingsIfLocked(): void {
        this.button.textColor.a = 0.5
        this.button.disable = true
    }
    settingsIfUnlocked(): void {
        this.button.textColor.a = 1
        this.button.disable = false
    }
}

export class HealButton extends PlayerUIButton{
    get unlocked():boolean{return this.player.canHeal}
}

export class UpgradeHealthButton extends PlayerUIButton{
    get unlocked():boolean{return this.player.canUpgradeHealth}
}

export class UpgradeWeaponButton extends PlayerUIButton{
    get unlocked():boolean{return this.player.canUpgradeAttack}
}