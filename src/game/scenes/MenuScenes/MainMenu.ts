import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../../Wolfie2D/Scene/Layer";
import Scene from "../../../Wolfie2D/Scene/Scene";
import Color from "../../../Wolfie2D/Utils/Color";
import Homework1_Scene from "../GameplayScenes/LevelScene";
import SelectionScene from "./SelectionScene";
import Label from "../../../Wolfie2D/Nodes/UIElements/Label";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { LoadData, LoadType, LoadBackground, LoadPlayer, LoadEnemy, LoadProjectiles,LoadWelcome,LoadMainmenu,LoadAPPLE } from "../../../constants/load";
import Sprite from "../../../Wolfie2D/Nodes/Sprites/Sprite";
import RandUtils from "../../../Wolfie2D/Utils/RandUtils";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";

import LevelScene from "../GameplayScenes/LevelScene";
import ScriptScene from "../GameplayScenes/ScriptScene";
import { level1 } from "../../../constants/scripts/level1script";
import Button from "../../../Wolfie2D/Nodes/UIElements/Button";
import CheatCodes from "../../../utils/Singletons/CheatCodes";
import { cheats } from "../../../constants/gameoptions";
import LocalStorageHandler from "../../../utils/Singletons/LocalStorageHandler";
import ProgressTracker from "../../../utils/Singletons/ProgressTracker";
import Checkbox from "../../../utils/SelectionUtils/Checkbox";
import CheatsCheckBox from "./LevelSelect/CheatsCheckbox";


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
    CLEAR_LOCAL_STORAGE: "CLEAR_LOCAL_STORAGE",
    INVINCIBLE: "INVINCIBLE",
    NUKE: "NUKE",
    INFINITE_SCRAP: "INFINITE_SCRAP",
    INFINITE_BOOSTER: "INFINITE_BOOSTER",
    INFINITE_SHIELD: "INFINITE_SHIELD",
    UNLOCK_ALL_LEVEL: "UNLOCK_ALL_LEVEL",
    UNLOCK_ALL_WEAPON: "UNLOCK_ALL_WEAPON",
    CLEAR_CHEATS_STORAGE: "CLEAR_CHEATS_STORAGE",


} as const;

export default class MainMenu extends Scene {
    // Layers, for multiple main menu screens
    private mainMenu: Layer;
    private controls: Layer;
    private about: Layer;
    private mainMenu_background: Layer;
    
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
    protected unlockAllLevelButton: Button;
    protected unlockAllWeaponButton: Button;

    private checkboxes:Checkbox[]
    private generateCheckbox(button: Button, text:Label, cheat:string, options:Record<string, any>={}):CheatsCheckBox{
        if(!this.checkboxes){this.checkboxes = []}
        let checkbox = new CheatsCheckBox(button, text, cheat, options)
        this.checkboxes.push(checkbox)
        return checkbox
    }

    public override loadScene(){
        // this.autoloader(LoadAPPLE.APPLE);
        this.loadBackground(LoadMainmenu.MAINMENU);
    }
    
    public override startScene(){
        const center = this.viewport.getCenter();
        const hoverBackground = new Color(255,255,255,0.25)

        // Main menu screen
        this.mainMenu_background = this.addLayer(MainMenuLayer.BACKGROUND,0);
        this.mainMenu = this.addLayer(MainMenuLayer.MAIN_MENU,1);

		this.initBackground(MainMenuLayer.BACKGROUND);

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
        play.onEnter = ()=>{play.backgroundColor = hoverBackground}
        play.onLeave = ()=>{play.backgroundColor = Color.TRANSPARENT}
        //play.onEnter = ()=>{play.backgroundColor = ba}

        // Add controls button
        const controls = this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.MAIN_MENU, {position: new Vec2(center.x, center.y + 100), text: "CONTROLS"});
        controls.size.set(200, 50);
        controls.borderWidth = 2;
        controls.borderColor = Color.YELLOW;
        controls.backgroundColor = Color.TRANSPARENT;
        controls.onClickEventId = MainMenuEvent.CONTROLS;
        controls.onEnter = ()=>{controls.backgroundColor = hoverBackground}
        controls.onLeave = ()=>{controls.backgroundColor = Color.TRANSPARENT}

        // Add event button
        const about =  this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.MAIN_MENU, {position: new Vec2(center.x, center.y + 200), text: "HELP"});
        about.size.set(200, 50);
        about.borderWidth = 2;
        about.borderColor = Color.YELLOW;
        about.backgroundColor = Color.TRANSPARENT;
        about.onClickEventId = MainMenuEvent.HELP;
        about.onEnter = ()=>{about.backgroundColor = hoverBackground}
        about.onLeave = ()=>{about.backgroundColor = Color.TRANSPARENT}

        const clearData = this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.MAIN_MENU, {position: new Vec2(center.x + 400, center.y - 400), text: "Clear Data"});
        clearData.size.set(200, 50);
        clearData.borderWidth = 2;
        clearData.borderColor = Color.YELLOW;
        clearData.backgroundColor = Color.TRANSPARENT;
        clearData.onClickEventId = MainMenuEvent.CLEAR_LOCAL_STORAGE;
        clearData.onEnter = ()=>{clearData.backgroundColor = hoverBackground}
        clearData.onLeave = ()=>{clearData.backgroundColor = Color.TRANSPARENT}


        this.initBackground(MainMenuLayer.CONTROLS_BACKGROUND);

        const header = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y - 300), text: "Controls"});
        header.textColor = Color.YELLOW;
        header.fontSize = 50;

        const health = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y -200), text: "1 - heal"});
        health.textColor = Color.YELLOW;
        health.fontSize = 50;

        const upgradeHealth = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y -150), text: "2 - Upgrade Health"});
        upgradeHealth.textColor = Color.YELLOW;
        upgradeHealth.fontSize = 50;

        const upgradeWeapon = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y -100), text: "3 - Upgrade Weapon"});
        upgradeWeapon.textColor = Color.YELLOW;
        upgradeWeapon.fontSize = 50;

        const w = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y ), text: "W - Move Up"});
        w.textColor = Color.YELLOW;
        w.fontSize = 50;
        const a = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y + 50), text: "A - Move Left"});
        a.textColor = Color.YELLOW;
        a.fontSize = 50;
        const s = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y + 100), text: "S - Move Down"});
        s.textColor = Color.YELLOW;
        s.fontSize = 50;
        const d = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y + 150), text: "D - Move Right"});
        d.textColor = Color.YELLOW
        d.fontSize = 50;
        const space = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y + 200), text: "Left Click - Shoot"});
        space.textColor = Color.YELLOW;
        space.fontSize = 50;
        const E = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y + 250), text: "E - Activate Shield"});
        E.textColor = Color.YELLOW;
        E.fontSize = 50;
        const R = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y + 300), text: "R - Activate Booster"});
        R.textColor = Color.YELLOW;
        R.fontSize = 50;
        const ESC = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y + 350), text: "ESC - Pause/Unpasue the Game"});
        ESC.textColor = Color.YELLOW;
        ESC.fontSize = 50;

        const back = this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.CONTROLS, {position: new Vec2(center.x-400, center.y - 400), text: "Back"});
        back.size.set(200, 50);
        back.borderWidth = 2;
        back.borderColor = Color.YELLOW;
        back.backgroundColor = Color.TRANSPARENT;
        back.onClickEventId = MainMenuEvent.MENU;
        back.onEnter = ()=>{back.backgroundColor = hoverBackground}
        back.onLeave = ()=>{back.backgroundColor = Color.TRANSPARENT}

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
        helpBack.onEnter = ()=>{helpBack.backgroundColor = hoverBackground}
        helpBack.onLeave = ()=>{helpBack.backgroundColor = Color.TRANSPARENT}

        const clearCheats = this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.HELP, {position: new Vec2(center.x + 400, center.y - 400), text: "Clear Cheats"});
        clearCheats.size.set(200, 50);
        clearCheats.borderWidth = 2;
        clearCheats.borderColor = Color.YELLOW;
        clearCheats.backgroundColor = Color.TRANSPARENT;
        clearCheats.onClickEventId = MainMenuEvent.CLEAR_CHEATS_STORAGE;
        clearCheats.onEnter = ()=>{clearCheats.backgroundColor = hoverBackground}
        clearCheats.onLeave = ()=>{clearCheats.backgroundColor = Color.TRANSPARENT}


        const oneShootKillButton = <Button> this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.HELP, {position: new Vec2(center.x-450, center.y + 200), text: ""});
        const oneShootKill = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.HELP, {position: new Vec2(center.x-270, center.y + 200), text: "One Shoot Kill"});
        const oneShootKillCheckbox = this.generateCheckbox(oneShootKillButton, oneShootKill, cheats.OHKO, {})

        const invincibleButton = <Button> this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.HELP, {position: new Vec2(center.x-450, center.y + 300), text: ""});
        const invincible = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.HELP, {position: new Vec2(center.x-320, center.y + 300), text: "Invincible"});
        const invincibleCheckbox = this.generateCheckbox(invincibleButton, invincible, cheats.INVINSIBLE, {})

        const nukeButton = <Button> this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.HELP, {position: new Vec2(center.x - 100, center.y + 200), text: ""});
        const nuke = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.HELP, {position: new Vec2(center.x + 30, center.y + 200), text: "NUKE ( - )"});
        const nukeCheckbox = this.generateCheckbox(nukeButton, nuke, cheats.NUKE_BUTTON, {})

        const infiniteScrapButton = <Button> this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.HELP, {position: new Vec2(center.x - 100, center.y + 300), text: ""});
        const infiniteScrap = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.HELP, {position: new Vec2(center.x + 60, center.y + 300), text: "Infinite Scrap"});
        const infiniteScrapCheckbox = this.generateCheckbox(infiniteScrapButton, infiniteScrap, cheats.INFINITE_SCRAP, {})

        const infiniteBoosterButton = <Button> this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.HELP, {position: new Vec2(center.x + 240, center.y + 300), text: ""});
        const infiniteBooster = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.HELP, {position: new Vec2(center.x + 420, center.y + 300), text: "Infinite Booster"});
        const infiniteBoosterCheckbox = this.generateCheckbox(infiniteBoosterButton, infiniteBooster, cheats.INFINITE_BOOSTER, {})

        const infiniteShieldButton = <Button> this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.HELP, {position: new Vec2(center.x + 240, center.y + 200), text: ""});
        const infiniteShield = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.HELP, {position: new Vec2(center.x + 420, center.y + 200), text: "Infinite Shield"});
        const infiniteShieldCheckbox = this.generateCheckbox(infiniteShieldButton, infiniteShield, cheats.INFINITE_SHIELD, {})

        const unlockAllLevelButton = <Button> this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.HELP, {position: new Vec2(center.x - 450, center.y + 400), text: ""});
        const unlockAllLevel = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.HELP, {position: new Vec2(center.x - 280, center.y + 400), text: "Unlock all levels"});
        const unlockAllLevelCheckbox = this.generateCheckbox(unlockAllLevelButton, unlockAllLevel, cheats.UNLOCK_ALL_LEVELS, {fontSize:35})

        const unlockAllWeaponButton = <Button> this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.HELP, {position: new Vec2(center.x - 100, center.y + 400), text: ""});
        const unlockAllWeapon = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.HELP, {position: new Vec2(center.x + 80, center.y + 400), text: "Unlock all Weapons"});
        const unlockAllWeaponCheckbox = this.generateCheckbox(unlockAllWeaponButton, unlockAllWeapon, cheats.UNLOCK_ALL_WEAPONS, {fontSize:32})

        // Subscribe to the button events
        this.receiver.subscribe(MainMenuEvent.PLAY_GAME);
        this.receiver.subscribe(MainMenuEvent.CONTROLS);
        this.receiver.subscribe(MainMenuEvent.HELP);
        this.receiver.subscribe(MainMenuEvent.MENU);
        this.receiver.subscribe(MainMenuEvent.CLEAR_LOCAL_STORAGE);
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
            case MainMenuEvent.CLEAR_LOCAL_STORAGE:{
                LocalStorageHandler.clearData()
                CheatCodes.refresh()
                ProgressTracker.refresh()
                this.handleRefreshCheats();
                break;
            }
            case MainMenuEvent.CLEAR_CHEATS_STORAGE:{
                CheatCodes.clearData()
                this.handleRefreshCheats();
                break;
            }
            default: {
                throw new Error(`Unhandled event caught in MainMenu: "${event.type}"`);
            }
        }
    }
    handleRefreshCheats(){
        for(let c of this.checkboxes){
            c.handleDisplayUpdate()
        }
    }
}