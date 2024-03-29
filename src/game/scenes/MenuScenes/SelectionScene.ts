import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../../Wolfie2D/Scene/Layer";
import Scene from "../../../Wolfie2D/Scene/Scene";
import Color from "../../../Wolfie2D/Utils/Color";
import Label from "../../../Wolfie2D/Nodes/UIElements/Label";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { LoadData, LoadType,LoadMainmenu, LoadMusic} from "../../../constants/load";
import Sprite from "../../../Wolfie2D/Nodes/Sprites/Sprite";
import MainMenu from "./MainMenu";
import Button from "../../../Wolfie2D/Nodes/UIElements/Button";
import ScriptScene from "../GameplayScenes/ScriptScene";
import { level1 } from "../../../constants/scripts/level1script";
import { level2 } from "../../../constants/scripts/level2script";
import { level3 } from "../../../constants/scripts/level3script";
import { level4 } from "../../../constants/scripts/level4script";
import { level5 } from "../../../constants/scripts/level5script";
import { level6 } from "../../../constants/scripts/level6script";
import CheatCodes from "../../../utils/Singletons/CheatCodes";
import { cheats } from "../../../constants/gameoptions";
import ProgressTracker from "../../../utils/Singletons/ProgressTracker";
import LevelSelect from "../../../utils/SelectionUtils/Level";
import ScriptedLevel from "./LevelSelect/ScriptedLevel";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";

// Layers in the main menu
const SelectionLayer = {
    BACKGROUND: "BACKGROUND",
    CONTROLS: "CONTROLS"
} as const

// Events triggered in the main menu
const SelectionEvent = {
    BACK: "BACK",
    CLEAR_LEVELS_STORAGE: "CLEAR_LEVELS_STORAGE",

} as const;

export default class SelectionScence extends Scene {
    // Layers, for multiple main menu screens
    private selection: Layer;
    private ui: Layer;
    private controls: Layer;

    clickLabel: Label;

    protected BACKGROUND: LoadData;
	protected bg1: Sprite;

    private levels:LevelSelect<ScriptScene>[]
    private musicPlaying:boolean

    public override initScene(init: Record<string, any> = {}): void {
        this.musicPlaying = (init.musicPlaying)?init.musicPlaying:false
    }

    public override loadScene(){
        this.load.audio(LoadMusic.SCENE_MUSIC.KEY, LoadMusic.SCENE_MUSIC.PATH)
        this.load.image("Test","assets/sprites/welcome.png");
        this.load.spritesheet("Level 1","assets/spritesheets/Level1_Boss/Level1_Boss.json");
        this.load.spritesheet("Level 2","assets/spritesheets/Level2_Boss/Level2_Boss.json");
        this.load.spritesheet("Level 3","assets/spritesheets/Level3_Boss/Level3_Boss.json");
        this.load.spritesheet("Level 4","assets/spritesheets/Level4_Boss/Level4_Boss.json");
        this.load.spritesheet("Level 5","assets/spritesheets/Level5_Boss/Level5_Boss.json");
        this.load.spritesheet("Level 6","assets/spritesheets/Level6_Boss/Level6_Boss.json")
        this.loadBackground(LoadMainmenu.MAINMENU);
    }

    public override unloadScene(): void {
        this.load.keepAudio(LoadMusic.SCENE_MUSIC.KEY)
    }
    
    public override startScene(){
        if(!this.musicPlaying){this.emitter.fireEvent(GameEventType.PLAY_MUSIC, {key:LoadMusic.SCENE_MUSIC.KEY, loop:true, holdReference:true})}
        this.initLayers()
        this.initUI()

        this.receiver.subscribe(SelectionEvent.BACK);
        this.receiver.subscribe(SelectionEvent.CLEAR_LEVELS_STORAGE)
    }

    public override updateScene(){
        while(this.receiver.hasNextEvent()){
            this.handleEvent(this.receiver.getNextEvent());
        }
    }

    protected loadBackground(data: LoadData){
		this.autoloader(data)
		this.BACKGROUND = data;
	}

    protected autoloader (data: LoadData) {
		let {KEY, TYPE, PATH } = data;
		switch(TYPE){
			case LoadType.IMAGE:
				this.load.image(KEY, PATH);
				break;
			case LoadType.AUDIO:
				this.load.audio(KEY, PATH);
				break;
			case LoadType.SPRITESHEET:
				this.load.spritesheet(KEY, PATH);
				break;
		}
	}

    protected initBackground(screen: string): void {
		this.bg1 = this.add.sprite(this.BACKGROUND.KEY, screen);
		this.bg1.scale.set(this.BACKGROUND.SCALE.X, this.BACKGROUND.SCALE.Y);
		this.bg1.position.copy(this.viewport.getCenter());
	}

    protected handleEvent(event: GameEvent): void {
        switch(event.type) {
            case SelectionEvent.BACK: {
                this.sceneManager.changeToScene(MainMenu, {musicPlaying:true});
                break;
            }

            case SelectionEvent.CLEAR_LEVELS_STORAGE: {
                ProgressTracker.clearData()
                this.updateLevelDisplay()
                break;
            }
            
            default: {
                throw new Error(`Unhandled event caught in MainMenu: "${event.type}"`);
            }
        }
    }

    
    private updateLevelDisplay():void{
        for(let l of this.levels){
            l.handleDisplayUpdate()
        }
    }

    private initLayers():void{
        this.selection = this.addLayer(SelectionLayer.BACKGROUND,0);
        this.initBackground(SelectionLayer.BACKGROUND);
        this.controls = this.addLayer(SelectionLayer.CONTROLS,1);
    }

    private createScriptButton(text:Label, image:AnimatedSprite, button:Button, script:Record<string, any>):LevelSelect<ScriptScene>{
        if(!this.levels){this.levels = []}
        let newLevel = new ScriptedLevel(text, image, button, script, this.sceneManager, this.emitter)
        this.levels.push(newLevel)
        return newLevel
    }

    private initUI():void{
        const center = this.viewport.getCenter();
        const hoverBackground = new Color(255,255,255,0.25)

        const text = <Label> this.add.uiElement(UIElementType.LABEL, SelectionLayer.CONTROLS, {position: new Vec2(center.x, center.y-275), text: "LEVEL SELECTION"});
        text.size.set(300, 50);
        text.fontSize = 80;
        text.textColor = Color.YELLOW;
        text.backgroundColor = Color.TRANSPARENT;

        const back = <Button>this.add.uiElement(UIElementType.BUTTON, SelectionLayer.CONTROLS, {position: new Vec2(center.x-440, center.y - 400), text: "Back"});
        back.size.set(200, 50);
        back.borderWidth = 2;
        back.borderColor = Color.YELLOW;
        back.backgroundColor = Color.TRANSPARENT;
        back.onClickEventId = SelectionEvent.BACK;
        back.onEnter = ()=>{back.backgroundColor = hoverBackground}
        back.onLeave = ()=>{back.backgroundColor = Color.TRANSPARENT}


        const clearData = <Button>this.add.uiElement(UIElementType.BUTTON, SelectionLayer.CONTROLS, {position: new Vec2(center.x + 400, center.y - 400), text: "Clear Levels"});
        clearData.size.set(200, 50);
        clearData.borderWidth = 2;
        clearData.borderColor = Color.YELLOW;
        clearData.backgroundColor = Color.TRANSPARENT;
        clearData.onClickEventId = SelectionEvent.CLEAR_LEVELS_STORAGE;
        clearData.onEnter = ()=>{clearData.backgroundColor = hoverBackground}
        clearData.onLeave = ()=>{clearData.backgroundColor = Color.TRANSPARENT}

        let level1text = <Label> this.add.uiElement(UIElementType.LABEL, SelectionLayer.CONTROLS, {position: new Vec2(center.x-300, center.y-190), text: "LEVEL ONE"});
        let level1Img = this.add.animatedSprite(AnimatedSprite, "Level 1", SelectionLayer.CONTROLS);
        level1Img.scale.set(1, 1);
        level1Img.position.copy(new Vec2(center.x-300, center.y-80));
        const level1button = <Button> this.add.uiElement(UIElementType.BUTTON, SelectionLayer.CONTROLS, {position: level1Img.position, text: ""});
        let level1Select = this.createScriptButton(level1text, level1Img, level1button, level1)

        // Level 2 game
        let level2text = <Label> this.add.uiElement(UIElementType.LABEL, SelectionLayer.CONTROLS, {position: new Vec2(center.x, center.y-190), text: "LEVEL TWO"});
        let level2Img = this.add.animatedSprite(AnimatedSprite, "Level 2", SelectionLayer.CONTROLS);
        level2Img.scale.set(1, 1);
        level2Img.position.copy(new Vec2(center.x, center.y-80));
        const level2button = <Button> this.add.uiElement(UIElementType.BUTTON, SelectionLayer.CONTROLS, {position: level2Img.position, text: ""});
        let level2Select = this.createScriptButton(level2text, level2Img, level2button, level2)

        // Level 3 game
        let level3text = <Label> this.add.uiElement(UIElementType.LABEL, SelectionLayer.CONTROLS, {position: new Vec2(center.x+300, center.y-190), text: "LEVEL THREE"});
        let level3Img = this.add.animatedSprite(AnimatedSprite, "Level 3", SelectionLayer.CONTROLS);
        level3Img.scale.set(1, 1);
        level3Img.position.copy(new Vec2(center.x+300, center.y-80));
        const level3button = <Button> this.add.uiElement(UIElementType.BUTTON, SelectionLayer.CONTROLS, {position: level3Img.position, text: ""});
        let level3Select = this.createScriptButton(level3text, level3Img, level3button, level3)


        // Level 4 game
        let level4text = <Label> this.add.uiElement(UIElementType.LABEL, SelectionLayer.CONTROLS, {position: new Vec2(center.x-300, center.y+75), text: "LEVEL FOUR"});
        let level4Img = this.add.animatedSprite(AnimatedSprite, "Level 4", SelectionLayer.CONTROLS);
        level4Img.scale.set(1, 1);
        level4Img.position.copy(new Vec2(center.x-300, center.y+180));
        const level4button = <Button> this.add.uiElement(UIElementType.BUTTON, SelectionLayer.CONTROLS, {position: level4Img.position, text: ""});
        let level4Select = this.createScriptButton(level4text, level4Img, level4button, level4)

        // Level 5 game
        let level5text = <Label> this.add.uiElement(UIElementType.LABEL, SelectionLayer.CONTROLS, {position: new Vec2(center.x, center.y+75), text: "LEVEL FIVE"});
        let level5Img = this.add.animatedSprite(AnimatedSprite, "Level 5", SelectionLayer.CONTROLS);
        level5Img.scale.set(1, 1);
        level5Img.position.copy(new Vec2(center.x, center.y+180));
        const level5button = <Button> this.add.uiElement(UIElementType.BUTTON, SelectionLayer.CONTROLS, {position: level5Img.position, text: ""});
        let level5Select = this.createScriptButton(level5text, level5Img, level5button, level5)

        // Level 6 game
        let level6text = <Label> this.add.uiElement(UIElementType.LABEL, SelectionLayer.CONTROLS, {position: new Vec2(center.x+300, center.y+75), text: "LEVEL SIX"});
        let level6Img = this.add.animatedSprite(AnimatedSprite, "Level 6", SelectionLayer.CONTROLS);
        level6Img.scale.set(1, 1);
        level6Img.position.copy(new Vec2(center.x+300, center.y+180));
        const level6button = <Button> this.add.uiElement(UIElementType.BUTTON, SelectionLayer.CONTROLS, {position: level6Img.position, text: ""});
        let level6Select = this.createScriptButton(level6text, level6Img, level6button, level6)
    }


}