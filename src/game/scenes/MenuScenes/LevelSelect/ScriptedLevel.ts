import Sprite from "../../../../Wolfie2D/Nodes/Sprites/Sprite";
import Button from "../../../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../../../Wolfie2D/Nodes/UIElements/Label";
import SceneManager from "../../../../Wolfie2D/Scene/SceneManager";
import Color from "../../../../Wolfie2D/Utils/Color";
import { cheats } from "../../../../constants/gameoptions";
import LevelSelect from "../../../../utils/SelectionUtils/Level";
import CheatCodes from "../../../../utils/Singletons/CheatCodes";
import ProgressTracker from "../../../../utils/Singletons/ProgressTracker";
import ScriptScene from "../../GameplayScenes/ScriptScene";


export default class ScriptedLevel extends LevelSelect<ScriptScene>{
    public text:Label
    public image:Sprite
    public button:Button
    private defaultText:string
    private script:Record<string, any>
    private unlockConditions:string[]

    constructor(text:Label, image:Sprite, button:Button, script:Record<string, any>, manager:SceneManager){
        super(manager, ScriptScene, {levelData: script})
        this.text = text
        this.defaultText = text.text
        this.button = button
        this.image = image
        this.script = script
        this.unlockConditions = script.UNLOCK_CONDITION
        this.sceneManager = manager
        this.initDefaults()
    }

    get unlocked(): boolean {
        if(CheatCodes.getCheat(cheats.UNLOCK_ALL_LEVELS)){return true}
        if(!this.unlockConditions){return true}
        for(let s of this.unlockConditions){
            if(!ProgressTracker.getBool(s)){return false}
        }
        return true
    }
    settingsIfLocked(): void {
        this.button.backgroundColor = Color.BLACK;
        this.button.borderColor = Color.BLACK;
        this.button.onClick = null;
        this.button.onEnter = null;
        this.button.onLeave = null;
    }
    settingsIfUnlocked(): void {
        this.button.backgroundColor = Color.TRANSPARENT;
        this.button.borderColor = Color.TRANSPARENT;
        this.button.onClick = ()=>{this.onClick()};
        this.button.onEnter = ()=>{this.onEnter()};
        this.button.onLeave = ()=>{this.onLeave()};
    }

    initDefaults():void {
        this.text.size.set(300, 50);
        this.text.borderWidth = 2;
        this.text.fontSize = 30;
        this.text.textColor = Color.YELLOW;
        this.text.backgroundColor = Color.TRANSPARENT;
        
        this.button.size.set(220, 180);
        this.button.borderRadius = 0;
        this.button.fontSize = 0;
        this.button.setPadding(this.image.sizeWithZoom);

        this.handleDisplayUpdate()
    }

    onClick():void {this.sceneManager.changeToScene(this.scene, this.options)}
    onEnter():void{this.text.textColor = Color.fromStringHex("#66FFFF")}
    onLeave():void{this.text.textColor = Color.YELLOW}
}