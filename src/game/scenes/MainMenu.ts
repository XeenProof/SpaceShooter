import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Homework1_Scene from "./LevelScene";
import SelectionScene from "./SelectionScene";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import { LoadData, LoadType, LoadBackground, LoadPlayer, LoadEnemy, LoadProjectiles,LoadWelcome,LoadMainmenu,LoadAPPLE } from "../../constants/load";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import RandUtils from "../../Wolfie2D/Utils/RandUtils";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";

import LevelScene from "./LevelScene";
import ScriptScene from "./ScriptScene";
import { level1 } from "../../constants/scripts/level1script";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import CheatCodes from "../../utils/Singletons/CheatCodes";
import { cheats } from "../../constants/gameoptions";


// Layers in the main menu
const MainMenuLayer = {
    MAIN_MENU: "MAIN_MENU", 
    CONTROLS: "CONTROLS",
    HELP: "HELP",
    BACKGROUND: "BACKGROUND",
    CONTROLS_BACKGROUND: "CONTROLS_BACKGROUND",
    HELP_BACKGROUND: "HELP_BACKGROUND",
} as const

// Events triggered in the main menu
const MainMenuEvent = {
    PLAY_GAME: "PLAY_GAME",
	CONTROLS: "CONTROLS",
	HELP: "HELP",
    ONE_SHOOT_KILL: "ONE_SHOOT_KILL",
	MENU: "MENU",
    PLAY_RECORDING: "PLAY_RECORDING",
    INVINCIBLE: "INVINCIBLE",
    NUKE: "NUKE",
    INFINITE_SCRAP: "INFINITE_SCRAP",
    INFINITE_BOOSTER: "INFINITE_BOOSTER",
    INFINITE_SHIELD: "INFINITE_SHIELD",
} as const;

export default class MainMenu extends Scene {
    // Layers, for multiple main menu screens
    private mainMenu: Layer;
    private controls: Layer;
    private about: Layer;
    private mainMenu_background: Layer;
    private seed: string;
    
    protected BACKGROUND: LoadData;
    // Sprites for the background images
	protected bg1: Sprite;
	protected bg2: Sprite;

    protected oneShootKillButton: Button;
    protected invincibleButton: Button;
    protected nukeButton: Button;
    protected infiniteScrapButton: Button;
    protected infiniteBoosterButton: Button;
    protected infiniteShieldButton: Button;

    public override loadScene(){
        // this.autoloader(LoadAPPLE.APPLE);
        this.loadBackground(LoadMainmenu.MAINMENU);
    }
    
    public override startScene(){
        const center = this.viewport.getCenter();

        // Main menu screen
        this.mainMenu_background = this.addLayer(MainMenuLayer.BACKGROUND,0);
        this.mainMenu = this.addLayer(MainMenuLayer.MAIN_MENU,1);

		this.initBackground(MainMenuLayer.BACKGROUND);
        // this.initBackground(MainMenuLayer.CONTROLS);
        // this.initBackground(MainMenuLayer.ABOUT);

        // Controls screen
        this.controls = this.addLayer(MainMenuLayer.CONTROLS_BACKGROUND,0);
        this.controls = this.addLayer(MainMenuLayer.CONTROLS,1);
        this.controls.setHidden(true);
        // About screen

        this.about = this.addLayer(MainMenuLayer.HELP_BACKGROUND,0);
        this.about = this.addLayer(MainMenuLayer.HELP,1);
        this.about.setHidden(true);

        const text = <Label> this.add.uiElement(UIElementType.LABEL, MainMenuLayer.MAIN_MENU, {position: new Vec2(center.x, center.y-200), text: "Main Menu"});
        text.size.set(300, 50);
        // text.borderWidth = 2;
        text.fontSize = 100;
        text.textColor = Color.YELLOW;
        // text.backgroundColor = Color.TRANSPARENT;
        // text.onClickEventId = MainMenuEvent.PLAY_GAME;

        // Add play button, and give it an event to emit on press
        const play = this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.MAIN_MENU, {position: new Vec2(center.x, center.y), text: "LEVEL SELECTION"});
        play.size.set(300, 50);
        play.borderWidth = 2;
        play.borderColor = Color.YELLOW;
        play.backgroundColor = Color.TRANSPARENT;
        play.onClickEventId = MainMenuEvent.PLAY_GAME;

        // Add controls button
        const controls = this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.MAIN_MENU, {position: new Vec2(center.x, center.y + 100), text: "CONTROLS"});
        controls.size.set(200, 50);
        controls.borderWidth = 2;
        controls.borderColor = Color.YELLOW;
        controls.backgroundColor = Color.TRANSPARENT;
        controls.onClickEventId = MainMenuEvent.CONTROLS;

        // Add event button
        const about =  this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.MAIN_MENU, {position: new Vec2(center.x, center.y + 200), text: "HELP"});
        about.size.set(200, 50);
        about.borderWidth = 2;
        about.borderColor = Color.YELLOW;
        about.backgroundColor = Color.TRANSPARENT;
        about.onClickEventId = MainMenuEvent.HELP;

        // Add play recording button
        // const playRecording = this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.MAIN_MENU, {position: new Vec2(center.x, center.y + 200), text: "Play Recording"});
        // playRecording.size.set(200, 50);
        // playRecording.borderWidth = 2;
        // playRecording.borderColor = Color.WHITE;
        // playRecording.backgroundColor = Color.TRANSPARENT;
        // playRecording.onClickEventId = MainMenuEvent.PLAY_RECORDING;

        this.initBackground(MainMenuLayer.CONTROLS_BACKGROUND);

        const header = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y - 250), text: "Controls"});
        header.textColor = Color.YELLOW;
        header.fontSize = 50;

        const w = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y - 150), text: "W - Move Up"});
        w.textColor = Color.YELLOW;
        w.fontSize = 50;
        const a = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y - 100), text: "A - Move Left"});
        a.textColor = Color.YELLOW;
        a.fontSize = 50;
        const s = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y - 50), text: "S - Move Down"});
        s.textColor = Color.YELLOW;
        s.fontSize = 50;
        const d = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y ), text: "D - Move Right"});
        d.textColor = Color.YELLOW
        d.fontSize = 50;
        const space = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y + 50), text: "SPACE - Shoot"});
        space.textColor = Color.YELLOW;
        space.fontSize = 50;
        const E = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y + 100), text: "E - Activate Shield"});
        E.textColor = Color.YELLOW;
        E.fontSize = 50;
        const R = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y + 150), text: "R - Activate Booster"});
        R.textColor = Color.YELLOW;
        R.fontSize = 50;
        const ESC = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y + 200), text: "ESC - Pause/Unpasue the Game"});
        ESC.textColor = Color.YELLOW;
        ESC.fontSize = 50;

        const back = this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.CONTROLS, {position: new Vec2(center.x-400, center.y - 400), text: "Back"});
        back.size.set(200, 50);
        back.borderWidth = 2;
        back.borderColor = Color.YELLOW;
        back.backgroundColor = Color.TRANSPARENT;
        back.onClickEventId = MainMenuEvent.MENU;

        this.initBackground(MainMenuLayer.HELP_BACKGROUND);
        const helpHeader = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.HELP, {position: new Vec2(center.x, center.y - 300), text: "HELP"});
        helpHeader.textColor = Color.YELLOW;
        helpHeader.fontSize = 50;

        const text1 = "Background: You play as an employee of the '\Galaxy Delivery Service\'  ";
        const text2 = "(GDS for short). One day on your delivery route, aliens, or what you";
        const text3 = "think they are, attack you. You, being too underpaid to care, decide to";
        const text4 = "just finish the run and go home";
        const text5 = "Developer: Jimmy Lin, Runkai Qiu, Stephen Tang";

        const line1 = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.HELP, {position: new Vec2(center.x , center.y - 200), text: text1});
        const line2 = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.HELP, {position: new Vec2(center.x - 25, center.y - 150), text: text2});
        const line3 = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.HELP, {position: new Vec2(center.x - 15, center.y - 100), text: text3});
        const line4 = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.HELP, {position: new Vec2(center.x - 265, center.y - 50), text: text4});
        const line5 = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.HELP, {position: new Vec2(center.x - 150, center.y + 50), text: text5});

        line1.textColor = Color.YELLOW;
        line2.textColor = Color.YELLOW;
        line3.textColor = Color.YELLOW;
        line4.textColor = Color.YELLOW;
        line5.textColor = Color.YELLOW;

        const helpBack = this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.HELP, {position: new Vec2(center.x - 400, center.y - 400), text: "Back"});
        helpBack.size.set(200, 50);
        helpBack.borderWidth = 2;
        helpBack.borderColor = Color.YELLOW;
        helpBack.backgroundColor = Color.TRANSPARENT;
        helpBack.onClickEventId = MainMenuEvent.MENU;


        this.oneShootKillButton = <Button> this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.HELP, {position: new Vec2(center.x-450, center.y + 200), text: ""});
        this.oneShootKillButton.size.set(50, 50);
        this.oneShootKillButton.borderWidth = 2;
        this.oneShootKillButton.borderColor = Color.YELLOW;
        this.oneShootKillButton.backgroundColor = Color.TRANSPARENT;
        this.oneShootKillButton.onClickEventId = MainMenuEvent.ONE_SHOOT_KILL;
        this.oneShootKillButton.text = CheatCodes.getCheat(cheats.OHKO)?"X":""

        const oneShootKill = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.HELP, {position: new Vec2(center.x-270, center.y + 200), text: "One Shoot Kill"});
        oneShootKill.textColor = Color.YELLOW;
        oneShootKill.fontSize = 40;


        this.invincibleButton = <Button> this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.HELP, {position: new Vec2(center.x-450, center.y + 300), text: ""});
        this.invincibleButton.size.set(50, 50);
        this.invincibleButton.borderWidth = 2;
        this.invincibleButton.borderColor = Color.YELLOW;
        this.invincibleButton.backgroundColor = Color.TRANSPARENT;
        this.invincibleButton.onClickEventId = MainMenuEvent.INVINCIBLE;
        this.invincibleButton.text = CheatCodes.getCheat(cheats.INVINSIBLE)?"X":""

        const invincible = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.HELP, {position: new Vec2(center.x-320, center.y + 300), text: "Invincible"});
        invincible.textColor = Color.YELLOW;
        invincible.fontSize = 40;

        this.nukeButton = <Button> this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.HELP, {position: new Vec2(center.x - 100, center.y + 200), text: ""});
        this.nukeButton.size.set(50, 50);
        this.nukeButton.borderWidth = 2;
        this.nukeButton.borderColor = Color.YELLOW;
        this.nukeButton.backgroundColor = Color.TRANSPARENT;
        this.nukeButton.onClickEventId = MainMenuEvent.NUKE;
        this.nukeButton.text = CheatCodes.getCheat(cheats.NUKE_BUTTON)?"X":""

        const nuke = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.HELP, {position: new Vec2(center.x, center.y + 200), text: "NUKE"});
        nuke.textColor = Color.YELLOW;
        nuke.fontSize = 40;

        this.infiniteScrapButton = <Button> this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.HELP, {position: new Vec2(center.x - 100, center.y + 300), text: ""});
        this.infiniteScrapButton.size.set(50, 50);
        this.infiniteScrapButton.borderWidth = 2;
        this.infiniteScrapButton.borderColor = Color.YELLOW;
        this.infiniteScrapButton.backgroundColor = Color.TRANSPARENT;
        this.infiniteScrapButton.onClickEventId = MainMenuEvent.INFINITE_SCRAP;
        this.infiniteScrapButton.text = CheatCodes.getCheat(cheats.INFINITE_SCRAP)?"X":""

        const infiniteScrap = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.HELP, {position: new Vec2(center.x + 60, center.y + 300), text: "Infinite Scrap"});
        infiniteScrap.textColor = Color.YELLOW;
        infiniteScrap.fontSize = 40;

        this.infiniteBoosterButton = <Button> this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.HELP, {position: new Vec2(center.x + 240, center.y + 300), text: ""});
        this.infiniteBoosterButton.size.set(50, 50);
        this.infiniteBoosterButton.borderWidth = 2;
        this.infiniteBoosterButton.borderColor = Color.YELLOW;
        this.infiniteBoosterButton.backgroundColor = Color.TRANSPARENT;
        this.infiniteBoosterButton.onClickEventId = MainMenuEvent.INFINITE_BOOSTER;
        this.infiniteBoosterButton.text = CheatCodes.getCheat(cheats.INFINITE_BOOSTER)?"X":""


        const infiniteBooster = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.HELP, {position: new Vec2(center.x + 420, center.y + 300), text: "Infinite Booster"});
        infiniteBooster.textColor = Color.YELLOW;
        infiniteBooster.fontSize = 40;

        this.infiniteShieldButton = <Button> this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.HELP, {position: new Vec2(center.x + 240, center.y + 200), text: ""});
        this.infiniteShieldButton.size.set(50, 50);
        this.infiniteShieldButton.borderWidth = 2;
        this.infiniteShieldButton.borderColor = Color.YELLOW;
        this.infiniteShieldButton.backgroundColor = Color.TRANSPARENT;
        this.infiniteShieldButton.onClickEventId = MainMenuEvent.INFINITE_SHIELD;
        this.infiniteShieldButton.text = CheatCodes.getCheat(cheats.INFINITE_SHIELD)?"X":""

        const infiniteShield = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.HELP, {position: new Vec2(center.x + 420, center.y + 200), text: "Infinite Shield"});
        infiniteShield.textColor = Color.YELLOW;
        infiniteShield.fontSize = 40;

        // Subscribe to the button events
        this.receiver.subscribe(MainMenuEvent.PLAY_GAME);
        this.receiver.subscribe(MainMenuEvent.CONTROLS);
        this.receiver.subscribe(MainMenuEvent.HELP);
        this.receiver.subscribe(MainMenuEvent.MENU);
        this.receiver.subscribe(MainMenuEvent.ONE_SHOOT_KILL);
        this.receiver.subscribe(MainMenuEvent.INVINCIBLE);
        this.receiver.subscribe(MainMenuEvent.NUKE);
        this.receiver.subscribe(MainMenuEvent.INFINITE_SCRAP);
        this.receiver.subscribe(MainMenuEvent.INFINITE_BOOSTER);
        this.receiver.subscribe(MainMenuEvent.INFINITE_SHIELD);
        this.receiver.subscribe("Test")
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

		this.bg2 = this.add.sprite(this.BACKGROUND.KEY, screen);
		this.bg2.scale.set(this.BACKGROUND.SCALE.X, this.BACKGROUND.SCALE.Y);
		this.bg2.position = this.bg1.position.clone();
		this.bg2.position.add(this.bg1.sizeWithZoom.scale(0, -2));
	}

    public unloadScene(): void {
        this.load.keepImage(LoadMainmenu.MAINMENU.KEY)
    }

    protected handleEvent(event: GameEvent): void {
        switch(event.type) {
            case MainMenuEvent.PLAY_GAME: {
                this.sceneManager.changeToScene(SelectionScene);
                break;
            }
            case MainMenuEvent.CONTROLS: {
                this.controls.setHidden(false);
                this.mainMenu.setHidden(true);
                break;
            }
            case MainMenuEvent.HELP: {
                this.about.setHidden(false);
                this.mainMenu.setHidden(true);
                break;
            }
            case MainMenuEvent.MENU: {
                this.mainMenu.setHidden(false);
                this.controls.setHidden(true);
                this.about.setHidden(true);
                break;
            }
            case MainMenuEvent.ONE_SHOOT_KILL: {
                CheatCodes.triggerCheat(cheats.OHKO)
                this.oneShootKillButton.text = CheatCodes.getCheat(cheats.OHKO)?"X":""
                break;
            }
            case MainMenuEvent.INVINCIBLE: {
                CheatCodes.triggerCheat(cheats.INVINSIBLE)
                this.invincibleButton.text = CheatCodes.getCheat(cheats.INVINSIBLE)?"X":""
                break;
            }
            case MainMenuEvent.NUKE: {
                CheatCodes.triggerCheat(cheats.NUKE_BUTTON)
                this.nukeButton.text = CheatCodes.getCheat(cheats.NUKE_BUTTON)?"X":""
                break;
            }
            case MainMenuEvent.INFINITE_SCRAP: {
                CheatCodes.triggerCheat(cheats.INFINITE_SCRAP)
                this.infiniteScrapButton.text = CheatCodes.getCheat(cheats.INFINITE_SCRAP)?"X":""
                break;
            }
            case MainMenuEvent.INFINITE_BOOSTER: {
                CheatCodes.triggerCheat(cheats.INFINITE_BOOSTER)
                this.infiniteBoosterButton.text = CheatCodes.getCheat(cheats.INFINITE_BOOSTER)?"X":""
                break;
            }
            case MainMenuEvent.INFINITE_SHIELD: {
                CheatCodes.triggerCheat(cheats.INFINITE_SHIELD)
                this.infiniteShieldButton.text = CheatCodes.getCheat(cheats.INFINITE_SHIELD)?"X":""
                break;
            }
            case "Test":{
                this.sceneManager.changeToScene(ScriptScene, {levelData: level1})
                break;
            }
            default: {
                throw new Error(`Unhandled event caught in MainMenu: "${event.type}"`);
            }
        }
    }
}