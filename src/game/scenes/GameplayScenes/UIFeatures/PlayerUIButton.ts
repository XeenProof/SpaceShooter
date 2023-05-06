import Button from "../../../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../../../Wolfie2D/Nodes/UIElements/Label";
import Color from "../../../../Wolfie2D/Utils/Color";
import EventButton from "../../../../utils/SelectionUtils/EventButton";
import PlayerActor from "../../../actors/PlayerActor";
import ActorScene from "../ActorScene";


export default abstract class PlayerUIButton extends EventButton{
    protected scene:ActorScene
    protected button:Button
    protected clickId:string
    protected CostDisplay:Label
    protected CostValue:Label
    protected InfoDisplay:Label
    protected InfoValue:Label

    constructor(scene:ActorScene, clickId:string, button:Button, ...Labels:Label[]){
        super()
        this.scene = scene
        this.button = button
        this.clickId = clickId
        this.CostDisplay = Labels[0]
        this.CostValue = Labels[1]
        this.InfoDisplay = Labels[2]
        this.InfoValue = Labels[3]
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
            this.button.size.set(50, 50);
            this.button.borderWidth = 0.5;
            this.button.borderColor = Color.BLACK;
            this.button.fontSize = 24;
            this.button.backgroundColor = Color.fromStringHex("#07E3D6");
            this.button.onClickEventId = this.clickId
        }
        if(this.CostDisplay){
            this.CostDisplay.size.set(30, 30);
		    this.CostDisplay.fontSize = 24;
		    this.CostDisplay.font = "Courier";
		    this.CostDisplay.textColor = Color.WHITE;
        }
        if(this.CostValue){
            this.CostValue.size.set(30, 30);
		    this.CostValue.fontSize = 24;
		    this.CostValue.font = "Courier";
		    this.CostValue.textColor = Color.WHITE;
        }
        if(this.InfoDisplay){
            this.InfoDisplay.size.set(30, 30);
		    this.InfoDisplay.fontSize = 18;
		    this.InfoDisplay.font = "Courier";
		    this.InfoDisplay.textColor = Color.WHITE;
        }
        if(this.InfoValue){
            this.InfoValue.size.set(30, 30);
		    this.InfoValue.fontSize = 18;
		    this.InfoValue.font = "Courier";
		    this.InfoValue.textColor = Color.WHITE;
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
        // this.button.fontSize = 14
    }
}

export class UpgradeWeaponButton extends PlayerUIButton{
    get unlocked():boolean{return this.player.canUpgradeAttack}
    protected initDefaults(): void {
        super.initDefaults()
        // this.button.fontSize = 14
    }
}