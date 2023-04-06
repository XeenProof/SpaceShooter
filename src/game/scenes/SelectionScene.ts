import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Homework1_Scene from "./LevelScene";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import { LoadData, LoadType,LoadMainmenu,LoadAPPLE } from "../../constants/load";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import RandUtils from "../../Wolfie2D/Utils/RandUtils";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import MainMenu from "./MainMenu";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";

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
    // protected level1Img: LoadData;
    // Sprites for the background images
	protected bg1: Sprite;
    // protected level1Img2: Sprite;

    public override loadScene(){
        // this.autoloader(LoadAPPLE.APPLE);
        this.loadBackground(LoadMainmenu.MAINMENU);
    }
    
    public override startScene(){
        const center = this.viewport.getCenter();
        // this.level1Img=LoadTest.TEST;

        // Main menu screen
        // this.selection = this.addUILayer(SelectionLayer.BACKGROUND);
        // this.selection.setDepth(1);

        // this.controls = this.addLayer(SelectionLayer.CONTROLS,5);
		// this.initBackground(SelectionLayer.BACKGROUND);
        this.selection = this.addUILayer(SelectionLayer.BACKGROUND);
        this.initBackground(SelectionLayer.BACKGROUND);

        const text = <Label> this.add.uiElement(UIElementType.LABEL, SelectionLayer.BACKGROUND, {position: new Vec2(center.x, center.y-275), text: "LEVEL SELECTION"});
        text.size.set(300, 50);
        // text.borderWidth = 2;
        text.fontSize = 80;
        text.textColor = Color.YELLOW;
        text.backgroundColor = Color.TRANSPARENT;

        // this.controls = this.addLayer(SelectionLayer.CONTROLS,1);

        const back = this.add.uiElement(UIElementType.BUTTON, SelectionLayer.BACKGROUND, {position: new Vec2(center.x-440, center.y - 400), text: "Back"});
        back.size.set(200, 50);
        back.borderWidth = 2;
        back.borderColor = Color.YELLOW;
        back.backgroundColor = Color.TRANSPARENT;
        // back.onClickEventId = SelectionEvent.LEVEL_ONE;

        // let level1Img2 = this.add.sprite(LoadTest.TEST.KEY, SelectionLayer.CONTROLS);
        // level1Img2.scale.set(0.3, 0.3);
        // level1Img2.position.copy(new Vec2(center.x-350, center.y-80));

        this.controls = this.addUILayer(SelectionLayer.CONTROLS);
        this.controls.setDepth(1);
        
        let level1 = <Label> this.add.uiElement(UIElementType.LABEL, SelectionLayer.CONTROLS, {position: new Vec2(center.x-350, center.y-175), text: "LEVEL ONE"});
        level1.size.set(300, 50);
        // text.borderWidth = 2;
        level1.fontSize = 30;
        level1.textColor = Color.YELLOW;
        level1.backgroundColor = Color.TRANSPARENT;
        level1.onClickEventId = SelectionEvent.LEVEL_ONE;

        // this.level1Img2 = this.add.sprite(this.level1Img.KEY, SelectionLayer.CONTROLS);
        // this.level1Img2.scale.set(0.3, 0.3);
        // this.level1Img2.position.copy(new Vec2(center.x-350, center.y-80));

        
        // const level1button = <Button> this.add.uiElement(UIElementType.BUTTON, SelectionLayer.CONTROLS, {position: new Vec2(center.x, center.y), text: "222"});
        // level1button.size.set(220, 180);
        // level1button.backgroundColor = Color.TRANSPARENT;
        // level1button.borderColor = Color.TRANSPARENT;
        // level1button.borderRadius = 100;
        // level1button.fontSize = 100;
        // // level1button.setPadding(this.level1Img2.sizeWithZoom);
        // level1button.onClickEventId = SelectionEvent.LEVEL_ONE;

        

        this.receiver.subscribe(SelectionEvent.LEVEL_ONE);
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
                this.sceneManager.changeToScene(Homework1_Scene);
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
}