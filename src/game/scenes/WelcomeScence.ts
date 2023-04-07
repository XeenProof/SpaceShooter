import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Homework1_Scene from "./LevelScene";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import { LoadData, LoadType, LoadBackground, LoadPlayer, LoadEnemy, LoadProjectiles,LoadWelcome, LoadMainmenu } from "../../constants/load";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import RandUtils from "../../Wolfie2D/Utils/RandUtils";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import MainMenu from "./MainMenu";
import SelectionScence from "./SelectionScene";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";

// Layers in the main menu
const WelcomeLayer = {
    WELCOME: "WELCOME",
    UI: "UI"
} as const

// Events triggered in the main menu
const WelcomeEvent = {
    PLAY_GAME: "PLAY_GAME",
} as const;

export default class WelcomeScence extends Scene {
    // Layers, for multiple main menu screens
    private welcome: Layer;
    private ui: Layer;
    

    protected BACKGROUND: LoadData;
    // Sprites for the background images
	protected bg1: Sprite;

    public override loadScene(){
        this.loadBackground(LoadWelcome.WELCOME);
        this.autoloader(LoadMainmenu.MAINMENU);
    }
    
    public override startScene(){
        const center = this.viewport.getCenter();

        // Main menu screen
        this.welcome = this.addLayer(WelcomeLayer.WELCOME,0);
        // this.loadBackground(LoadWelcome.WELCOME);
        console.log(LoadWelcome.WELCOME);
		this.initBackground();

        this.ui = this.addLayer(WelcomeLayer.UI,1);

        const clickLabel = this.add.uiElement(UIElementType.BUTTON, WelcomeLayer.UI, {position: new Vec2(center.x, center.y + 330), text: "Click To Start"});
        clickLabel.size.set(200, 50);
        clickLabel.borderWidth = 2;
        clickLabel.borderColor = Color.WHITE;
        clickLabel.backgroundColor = Color.TRANSPARENT;
        clickLabel.onClickEventId = WelcomeEvent.PLAY_GAME;

        this.receiver.subscribe(WelcomeEvent.PLAY_GAME);
    }

    public override updateScene(){
        while(this.receiver.hasNextEvent()){
            this.handleEvent(this.receiver.getNextEvent());
        }
    }

    public unloadScene(): void {
        this.load.keepImage(LoadMainmenu.MAINMENU.KEY)
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

    protected initBackground(): void {
		this.bg1 = this.add.sprite(this.BACKGROUND.KEY, WelcomeLayer.WELCOME);
		this.bg1.scale.set(this.BACKGROUND.SCALE.X, this.BACKGROUND.SCALE.Y);
		this.bg1.position.copy(this.viewport.getCenter());
	}

    protected handleEvent(event: GameEvent): void {
        switch(event.type) {
            case WelcomeEvent.PLAY_GAME: {
                this.sceneManager.changeToScene(MainMenu,{},{});
                break;
            }
            default: {
                throw new Error(`Unhandled event caught in MainMenu: "${event.type}"`);
            }
        }
    }
}