import Button from "../../../../Wolfie2D/Nodes/UIElements/Button";
import Color from "../../../../Wolfie2D/Utils/Color";
import EventButton from "../../../../utils/SelectionUtils/EventButton";
import PlayerActor from "../../../actors/PlayerActor";
import ActorScene from "../ActorScene";


export default abstract class PlayerUIButton extends EventButton{
    protected scene:ActorScene
    protected button:Button
    protected clickId:string

    constructor(scene:ActorScene, clickId:string, button:Button){
        super()
        this.scene = scene
        this.button = button
        this.clickId = clickId
        this.button.textColor = Color.BLACK
        this.initDefaults()
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

    protected initDefaults(){
        if(this.button){
            this.button.size.set(200, 50);
            this.button.borderWidth = 0.5;
            this.button.borderColor = Color.BLACK;
            this.button.fontSize = 30;
            this.button.backgroundColor = Color.fromStringHex("#07E3D6");
            this.button.onClickEventId = this.clickId
        }
    }
}

export class HealButton extends PlayerUIButton{
    get unlocked():boolean{return this.player.canHeal}
}

export class UpgradeHealthButton extends PlayerUIButton{
    get unlocked():boolean{return this.player.canUpgradeHealth}
    protected initDefaults(): void {
        super.initDefaults()
        this.button.fontSize = 18
    }
}

export class UpgradeWeaponButton extends PlayerUIButton{
    get unlocked():boolean{return this.player.canUpgradeAttack}
    protected initDefaults(): void {
        super.initDefaults()
        this.button.fontSize = 18
    }
}