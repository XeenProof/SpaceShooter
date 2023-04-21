import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../../Wolfie2D/Scene/Layer";
import Scene from "../../../Wolfie2D/Scene/Scene";
import Color from "../../../Wolfie2D/Utils/Color";
import Label from "../../../Wolfie2D/Nodes/UIElements/Label";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { LoadData, LoadType,LoadMainmenu} from "../../../constants/load";
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

// Layers in the main menu
const SelectionLayer = {
    BACKGROUND: "BACKGROUND",
    CONTROLS: "CONTROLS"
} as const

// Events triggered in the main menu
const SelectionEvent = {
    LEVEL_ONE: "LEVEL_ONE",
    LEVEL_TWO: "LEVEL_TWO",
    LEVEL_THREE: "LEVEL_THREE",
    LEVEL_FOUR: "LEVEL_FOUR",
    LEVEL_FIVE: "LEVEL_FIVE",
    LEVEL_SIX: "LEVEL_SIX",
    BACK: "BACK"
} as const;

export default class SelectionScence extends Scene {
    // Layers, for multiple main menu screens
    private selection: Layer;
    private ui: Layer;
    private controls: Layer;

    clickLabel: Label;

    protected BACKGROUND: LoadData;
	protected bg1: Sprite;

    public override loadScene(){
        this.load.image("Test","assets/sprites/welcome.png");
        this.load.image("Blank","assets/sprites/blank.png");
        this.loadBackground(LoadMainmenu.MAINMENU);
    }
    
    public override startScene(){
        const center = this.viewport.getCenter();
        // this.level1Img=LoadTest.TEST;

        this.selection = this.addLayer(SelectionLayer.BACKGROUND,0);
        this.initBackground(SelectionLayer.BACKGROUND);

        this.controls = this.addLayer(SelectionLayer.CONTROLS,1);

        const text = <Label> this.add.uiElement(UIElementType.LABEL, SelectionLayer.CONTROLS, {position: new Vec2(center.x, center.y-275), text: "LEVEL SELECTION"});
        text.size.set(300, 50);
        // text.borderWidth = 2;
        text.fontSize = 80;
        text.textColor = Color.YELLOW;
        text.backgroundColor = Color.TRANSPARENT;

        // this.controls = this.addLayer(SelectionLayer.CONTROLS,1);

        const back = this.add.uiElement(UIElementType.BUTTON, SelectionLayer.CONTROLS, {position: new Vec2(center.x-440, center.y - 400), text: "Back"});
        back.size.set(200, 50);
        back.borderWidth = 2;
        back.borderColor = Color.YELLOW;
        back.backgroundColor = Color.TRANSPARENT;
        back.onClickEventId = SelectionEvent.BACK;

        let level1Img = this.add.sprite("Test", SelectionLayer.CONTROLS);
        level1Img.scale.set(0.18, 0.2);
        level1Img.position.copy(new Vec2(center.x-300, center.y-80));
        
        let level1 = <Label> this.add.uiElement(UIElementType.LABEL, SelectionLayer.CONTROLS, {position: new Vec2(center.x-300, center.y-190), text: "LEVEL ONE"});
        level1.size.set(300, 50);
        level1.borderWidth = 2;
        level1.fontSize = 30;
        level1.textColor = Color.YELLOW;
        level1.backgroundColor = Color.TRANSPARENT;

        const level1button = <Button> this.add.uiElement(UIElementType.BUTTON, SelectionLayer.CONTROLS, {position: level1Img.position, text: ""});
        level1button.size.set(220, 180);
        level1button.backgroundColor = Color.TRANSPARENT;
        level1button.borderColor = Color.WHITE;
        level1button.borderRadius = 2;
        level1button.fontSize = 0;
        level1button.setPadding(level1Img.sizeWithZoom);
        level1button.onClickEventId = SelectionEvent.LEVEL_ONE;

        
        // Level 2 game
        let level2Img = this.add.sprite("Blank", SelectionLayer.CONTROLS);
        level2Img.scale.set(0.35, 0.35);
        level2Img.position.copy(new Vec2(center.x, center.y-80));
        
        let level2text = <Label> this.add.uiElement(UIElementType.LABEL, SelectionLayer.CONTROLS, {position: new Vec2(center.x, center.y-175), text: "LEVEL TWO"});
        level2text.size.set(300, 50);
        level2text.borderWidth = 2;
        level2text.fontSize = 30;
        level2text.textColor = Color.YELLOW;
        level2text.backgroundColor = Color.TRANSPARENT;

        const level2button = <Button> this.add.uiElement(UIElementType.BUTTON, SelectionLayer.CONTROLS, {position: level2Img.position, text: ""});
        if(this.levelIsUnlocked(level2)){
            level2button.size.set(220, 180);
            level2button.backgroundColor = Color.TRANSPARENT;
            level2button.borderColor = Color.TRANSPARENT;
            level2button.borderRadius = 0;
            level2button.fontSize = 0;
            level2button.setPadding(level2Img.sizeWithZoom);
            level2button.onClickEventId = SelectionEvent.LEVEL_TWO;
        }
        else{
            level2button.size.set(220, 180);
            level2button.backgroundColor = Color.BLACK;
            level2button.borderColor = Color.BLACK;
            level2button.borderRadius = 0;
            level2button.fontSize = 0;
            level2button.setPadding(level2Img.sizeWithZoom);
        }



        // Level 3 game
        let level3Img = this.add.sprite("Blank", SelectionLayer.CONTROLS);
        level3Img.scale.set(0.35, 0.35);
        level3Img.position.copy(new Vec2(center.x+300, center.y-80));
        
        let level3text = <Label> this.add.uiElement(UIElementType.LABEL, SelectionLayer.CONTROLS, {position: new Vec2(center.x+300, center.y-175), text: "LEVEL THREE"});
        level3text.size.set(300, 50);
        level3text.borderWidth = 2;
        level3text.fontSize = 30;
        level3text.textColor = Color.YELLOW;
        level3text.backgroundColor = Color.TRANSPARENT;

        const level3button = <Button> this.add.uiElement(UIElementType.BUTTON, SelectionLayer.CONTROLS, {position: level3Img.position, text: ""});
        if(this.levelIsUnlocked(level3)){
            level3button.size.set(220, 180);
            level3button.backgroundColor = Color.TRANSPARENT;
            level3button.borderColor = Color.TRANSPARENT;
            level3button.borderRadius = 0;
            level3button.fontSize = 0;
            level3button.setPadding(level3Img.sizeWithZoom);
            level3button.onClickEventId = SelectionEvent.LEVEL_THREE;
        }
        else{
            level3button.size.set(220, 180);
            level3button.backgroundColor = Color.BLACK;
            level3button.borderColor = Color.BLACK;
            level3button.borderRadius = 0;
            level3button.fontSize = 0;
            level3button.setPadding(level3Img.sizeWithZoom);
        }


        // Level 4 game
        let level4Img = this.add.sprite("Blank", SelectionLayer.CONTROLS);
        level4Img.scale.set(0.35, 0.35);
        level4Img.position.copy(new Vec2(center.x-300, center.y+180));
        
        let level4text = <Label> this.add.uiElement(UIElementType.LABEL, SelectionLayer.CONTROLS, {position: new Vec2(center.x-300, center.y+75), text: "LEVEL FOUR"});
        level4text.size.set(300, 50);
        level4text.borderWidth = 2;
        level4text.fontSize = 30;
        level4text.textColor = Color.YELLOW;
        level4text.backgroundColor = Color.TRANSPARENT;

        const level4button = <Button> this.add.uiElement(UIElementType.BUTTON, SelectionLayer.CONTROLS, {position: level4Img.position, text: ""});
        if(this.levelIsUnlocked(level4)){
            level4button.size.set(220, 180);
            level4button.backgroundColor = Color.TRANSPARENT;
            level4button.borderColor = Color.TRANSPARENT;
            level4button.borderRadius = 0;
            level4button.fontSize = 0;
            level4button.setPadding(level1Img.sizeWithZoom);
            level4button.onClickEventId = SelectionEvent.LEVEL_FOUR;
        }
        else{
            level4button.size.set(220, 180);
            level4button.backgroundColor = Color.BLACK;
            level4button.borderColor = Color.BLACK;
            level4button.borderRadius = 0;
            level4button.fontSize = 0;
            level4button.setPadding(level4Img.sizeWithZoom);
        }

        // Level 5 game
        let level5Img = this.add.sprite("Blank", SelectionLayer.CONTROLS);
        level5Img.scale.set(0.35, 0.35);
        level5Img.position.copy(new Vec2(center.x, center.y+180));
        
        let level5text = <Label> this.add.uiElement(UIElementType.LABEL, SelectionLayer.CONTROLS, {position: new Vec2(center.x, center.y+75), text: "LEVEL FIVE"});
        level5text.size.set(300, 50);
        level5text.borderWidth = 2;
        level5text.fontSize = 30;
        level5text.textColor = Color.YELLOW;
        level5text.backgroundColor = Color.TRANSPARENT;

        const level5button = <Button> this.add.uiElement(UIElementType.BUTTON, SelectionLayer.CONTROLS, {position: level5Img.position, text: ""});
        if(this.levelIsUnlocked(level5)){
            level5button.size.set(220, 180);
            level5button.backgroundColor = Color.TRANSPARENT;
            level5button.borderColor = Color.TRANSPARENT;
            level5button.borderRadius = 0;
            level5button.fontSize = 0;
            level5button.setPadding(level5Img.sizeWithZoom);
            level5button.onClickEventId = SelectionEvent.LEVEL_FIVE;
        }
        else{
            level5button.size.set(220, 180);
            level5button.backgroundColor = Color.BLACK;
            level5button.borderColor = Color.BLACK;
            level5button.borderRadius = 0;
            level5button.fontSize = 0;
            level5button.setPadding(level5Img.sizeWithZoom);
        }

        // Level 6 game
        let level6Img = this.add.sprite("Blank", SelectionLayer.CONTROLS);
        level6Img.scale.set(0.35, 0.35);
        level6Img.position.copy(new Vec2(center.x+300, center.y+180));
        
        let level6text = <Label> this.add.uiElement(UIElementType.LABEL, SelectionLayer.CONTROLS, {position: new Vec2(center.x+300, center.y+75), text: "LEVEL SIX"});
        level6text.size.set(300, 50);
        level6text.borderWidth = 2;
        level6text.fontSize = 30;
        level6text.textColor = Color.YELLOW;
        level6text.backgroundColor = Color.TRANSPARENT;

        const level6button = <Button> this.add.uiElement(UIElementType.BUTTON, SelectionLayer.CONTROLS, {position: level6Img.position, text: ""});
        if(this.levelIsUnlocked(level6)){
            level6button.size.set(220, 180);
            level6button.backgroundColor = Color.TRANSPARENT;
            level6button.borderColor = Color.TRANSPARENT;
            level6button.borderRadius = 0;
            level6button.fontSize = 0;
            level6button.setPadding(level6Img.sizeWithZoom);
            level6button.onClickEventId = SelectionEvent.LEVEL_SIX;
        }
        else{
            level6button.size.set(220, 180);
            level6button.backgroundColor = Color.BLACK;
            level6button.borderColor = Color.BLACK;
            level6button.borderRadius = 0;
            level6button.fontSize = 0;
            level6button.setPadding(level6Img.sizeWithZoom);
        }

        this.receiver.subscribe(SelectionEvent.LEVEL_ONE);
        this.receiver.subscribe(SelectionEvent.LEVEL_TWO);
        this.receiver.subscribe(SelectionEvent.LEVEL_THREE);
        this.receiver.subscribe(SelectionEvent.LEVEL_FOUR);
        this.receiver.subscribe(SelectionEvent.LEVEL_FIVE);
        this.receiver.subscribe(SelectionEvent.LEVEL_SIX);
        this.receiver.subscribe(SelectionEvent.BACK);
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
            case SelectionEvent.LEVEL_ONE: {
                console.log("HI 1");
                this.sceneManager.changeToScene(ScriptScene, {levelData: level1});
                break;
            }
            case SelectionEvent.LEVEL_TWO: {
                console.log("HI 2");
                this.sceneManager.changeToScene(ScriptScene, {levelData: level2});
                break;
            }
            case SelectionEvent.LEVEL_THREE: {
                this.sceneManager.changeToScene(ScriptScene, {levelData: level3});
                break;
            }
            case SelectionEvent.LEVEL_FOUR: {
                this.sceneManager.changeToScene(ScriptScene, {levelData: level4});
                break;
            }
            case SelectionEvent.LEVEL_FIVE: {
                this.sceneManager.changeToScene(ScriptScene, {levelData: level5});
                break;
            }
            case SelectionEvent.LEVEL_SIX: {
                this.sceneManager.changeToScene(ScriptScene, {levelData: level6});
                break;
            }

            case SelectionEvent.BACK: {
                this.sceneManager.changeToScene(MainMenu);
                break;
            }
            default: {
                throw new Error(`Unhandled event caught in MainMenu: "${event.type}"`);
            }
        }
    }

    private levelIsUnlocked(script: Record<string, any>):boolean{
        if(CheatCodes.getCheat(cheats.UNLOCK_ALL_LEVELS)){return true}
        let {UNLOCK_CONDITION} = script
        if(!UNLOCK_CONDITION){return true}
        for(let s of UNLOCK_CONDITION){
            if(!ProgressTracker.getBool(s)){return false}
        }
        return true
    }
}