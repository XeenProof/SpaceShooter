import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Homework1_Scene from "./LevelScene";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import { LoadData, LoadType, LoadBackground, LoadPlayer, LoadEnemy, LoadProjectiles,LoadWelcome,LoadMainmenu } from "../../constants/load";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import RandUtils from "../../Wolfie2D/Utils/RandUtils";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import MainMenu from "./MainMenu";
import LevelScene from "./LevelScene";
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
    private welcome: Layer;
    private ui: Layer;
    private controls: Layer;
    private seed: string;

    clickLabel: Label;

    protected BACKGROUND: LoadData;
    // Sprites for the background images
	protected bg1: Sprite;

    public override loadScene(){
        this.loadBackground(LoadMainmenu.MAINMENU);
        this.load.image("test","assets/sprites/test.png");
    }
    
    public override startScene(){
        const center = this.viewport.getCenter();

        // Main menu screen
        this.welcome = this.addLayer(SelectionLayer.BACKGROUND,0);
        // this.loadBackground(LoadWelcome.WELCOME);
        // console.log(LoadMainmenu.MAINMENU);
		this.initBackground(SelectionLayer.BACKGROUND);

        // this.ui = this.addLayer(WelcomeLayer.UI,0);
        // this.clickLabel = <Label>this.add.uiElement(UIElementType.BUTTON, WelcomeLayer.UI, {position: new Vec2(center.x, center.y + 330), text: "Click To Start"});
        // this.clickLabel.size.set(200, 50);
        // this.clickLabel.borderWidth = 2;
        // this.clickLabel.borderColor = Color.WHITE;
        // this.clickLabel.backgroundColor = Color.TRANSPARENT;
        // this.clickLabel.onClickEventId = WelcomeEvent.PLAY_GAME;

        const text = <Label> this.add.uiElement(UIElementType.LABEL, SelectionLayer.BACKGROUND, {position: new Vec2(center.x, center.y-275), text: "LEVEL SELECTION"});
        text.size.set(300, 50);
        // text.borderWidth = 2;
        text.fontSize = 80;
        text.textColor = Color.YELLOW;
        text.backgroundColor = Color.TRANSPARENT;

        this.controls = this.addUILayer(SelectionLayer.CONTROLS);
        this.initBackground(SelectionLayer.CONTROLS);

        const back = this.add.uiElement(UIElementType.BUTTON, SelectionLayer.CONTROLS, {position: new Vec2(center.x-440, center.y - 400), text: "Back"});
        back.size.set(200, 50);
        back.borderWidth = 2;
        back.borderColor = Color.YELLOW;
        back.backgroundColor = Color.TRANSPARENT;
        back.onClickEventId = SelectionEvent.BACK;

        const level1 = <Label> this.add.uiElement(UIElementType.LABEL, SelectionLayer.CONTROLS, {position: new Vec2(center.x-350, center.y-175), text: "LEVEL ONE"});
        level1.size.set(300, 50);
        // text.borderWidth = 2;
        level1.fontSize = 30;
        level1.textColor = Color.YELLOW;
        level1.backgroundColor = Color.TRANSPARENT;

        let level1Img = this.add.sprite("test", SelectionLayer.CONTROLS);
        level1Img.position.set(center.x-350, center.y-80);
        level1Img.scale.set(0.3, 0.3);
        
        const level1button = <Button> this.add.uiElement(UIElementType.BUTTON, SelectionLayer.CONTROLS, {position: level1Img.position, text: ""});
        level1button.size.set(220, 180);
        level1button.backgroundColor = Color.TRANSPARENT;
        level1button.borderColor = Color.TRANSPARENT;
        level1button.borderRadius = 0;
        level1button.fontSize = 0;
        level1button.setPadding(level1Img.sizeWithZoom);
        level1button.onClickEventId = SelectionEvent.LEVEL_ONE;

        

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
        console.log(this.BACKGROUND)
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
                console.log("HELLO")
                this.seed = RandUtils.randomSeed()
                this.sceneManager.changeToScene(LevelScene);
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