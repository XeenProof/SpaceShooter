import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Label from "../../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Color from "../../../Wolfie2D/Utils/Color";
import RandUtils from "../../../Wolfie2D/Utils/RandUtils";
import Sprite from "../../../Wolfie2D/Nodes/Sprites/Sprite";
import CanvasNode from "../../../Wolfie2D/Nodes/CanvasNode";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Timer from "../../../Wolfie2D/Timing/Timer";

import Viewport from "../../../Wolfie2D/SceneGraph/Viewport";
import SceneManager from "../../../Wolfie2D/Scene/SceneManager";
import RenderingManager from "../../../Wolfie2D/Rendering/RenderingManager";

import { LoadData, LoadType} from "../../../constants/load";
import { PhysicGroups, Physics } from "../../../constants/physics";
import { Events, LevelEndConst } from "../../../constants/events";
import PlayerActor from "../../actors/PlayerActor";
import EntityManager from "../../../utils/EntityManager/EntityManager";
import ActorScene from "./ActorScene";
import HPActor from "../../actors/abstractActors/HPActor";
import DamageActor from "../../actors/abstractActors/DamageActor";
import { Layers } from "../../../constants/layers";
import { GAMEPLAY_DIMENTIONS } from "../../../constants/dimenstions";
import Button from "../../../Wolfie2D/Nodes/UIElements/Button";
import Input from "../../../Wolfie2D/Input/Input";
import Layer from "../../../Wolfie2D/Scene/Layer";

/**
 * This is the base scene for our game.
 * It handles all the initializations 
 */
export default class BaseScene extends ActorScene{
	protected BACKGROUND: LoadData;
	protected statMods:Record<string, number> = {
		hp_multi: 1,
		droprate_multi: 1,
        enemydamage_multi: 1,
		points_multi: 1
	}
	protected paused:boolean

	protected endLevelTimer:Timer
	protected endType:string
	protected levelEnded:boolean

	protected PLAYERINFO: Record<string, any>
	protected _player: PlayerActor;
	protected backgroundSpeed:Vec2;

	// Sprites for the background images
	protected bg1: Sprite;
	protected bg2: Sprite;
	protected bg3: Sprite;
	protected bg4: Sprite;

	protected entities: EntityManager<CanvasNode>;
	protected damages: Map<String, number>;
	protected wavenum: number = 0;

	// shield labels
	protected shieldLabel: Label;
	protected shieldBars: Array<Label>;
	protected shieldBarBg: Label;

	// boost labels
	protected boostLabel: Label;
	// protected boostBar: Label;
	protected boostBars: Array<Label>;
	protected boostBarBg: Label;

	// Health labels
	protected healthLabel: Label;
	protected healthBar: Label;
	protected healthBarBg: Label;

	// health, shield, booster icons
	protected healthIcon: Sprite;
	protected shieldIcon: Sprite;
	protected boostIcon: Sprite;

	// wave, scrap iron, points lables
	protected waveLabel: Label;
	protected scrapIronLabel: Label;
	protected pointsLabel: Label;

	// wave, scrap iron, points values
	protected wave: Label;
	protected scrapIron: Label;
	protected points: Label;

	protected endText: Label;

	protected informationBackground: Label;

	// The padding of the world
	protected worldPadding: Vec2;

	protected showControls:boolean;

	public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, {...options, physics: Physics});
		this.entities = new EntityManager<CanvasNode>();
		this.damages = new Map<String, number>();
		this.backgroundSpeed = new Vec2(0, -150);
    }

	public override loadScene(){
        this.load.image("HealthIcon","assets/sprites/health.png");
		this.load.image("ShieldIcon","assets/sprites/shield.png");
		this.load.image("BoostIcon","assets/sprites/boost.png");
    }

	/** Scene lifecycle methods */
	/**
	 * @see Scene.initScene()
	 */
	public override initScene(options: Record<string, any>): void {

	}

	protected loadList(list:LoadData[]){
		for(let data of list){this.autoloader(data);}
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

	/**
	 * @see Scene.startScene()
	 */
	public override startScene(){
		this.worldPadding = new Vec2(64, 64);//-----------------------------------------------------

		// Create a background layer
		this.initLayers();
		this.initUI();

		this.receiver.subscribe(Events.PAUSE)
		this.receiver.subscribe(Events.CONTROLS)
		this.receiver.subscribe(Events.BACK_TO_PAUSE)
	}
	/**
	 * @see Scene.updateScene 
	 */
	public override updateScene(deltaT: number){
		this.handleEndType()
		if(this.levelEnded){return;}
		
		// Handle events
		while (this.receiver.hasNextEvent()) {
			this.handleEvent(this.receiver.getNextEvent());
		}

		if(this.paused && !this.showControls){
			this.getLayer(Layers.PAUSE).setHidden(false)
			return; 
		}
		else{
			this.getLayer(Layers.PAUSE).setHidden(true)
		}

		this.handleHealthChange(this.player.health,this.player.maxHealth);
		this.handleShieldChange((this.player.shieldCharge.value/this.player.shieldCharge.maxValue)*5);
		this.handleBoosterChange((this.player.boosterCharge.value/this.player.boosterCharge.maxValue)*5);
		this.wave.setText(this.wavenum.toString());
		this.scrapIron.setText(this.player.scrap.toString());
		this.points.setText(this.player.points.toString());

		this.moveBackgrounds(deltaT);
		this.lockPlayer(this.player, this.viewport.getCenter(), this.viewport.getHalfSize())

	}

	public handleEndType(){
		if (this.endType === LevelEndConst.GAME_OVER){
			this.endText.text="GAME OVER"
		}
		else if (this.endType === LevelEndConst.LEVEL_CLEARED){
			this.endText.text="VICTORY"
		}
	}
    /**
     * @see Scene.unloadScene()
     */
    public override unloadScene(): void {}

	/**
	 * This method helps with handling events. 
	 * Student Edited
	 * 
	 * @param event the event to be handled
	 * @see GameEvent
	 */
	protected handleEvent(event: GameEvent){
		switch(event.type){
			case Events.PAUSE:{
				console.log(event.data.get("pausing"))
				this.paused = event.data.get("pausing");
				break;
			}
			case Events.CONTROLS:{
				this.getLayer(Layers.BACKGROUND).setHidden(true);
				this.getLayer(Layers.PRIMARY).setHidden(true);
				this.getLayer(Layers.HEALTHBARS).setHidden(true);
				this.getLayer(Layers.EXTRABARS).setHidden(true);
				this.getLayer(Layers.STATES).setHidden(true);
				this.getLayer(Layers.GAMEEND).setHidden(true);
				this.getLayer(Layers.UI).setHidden(true);
				this.getLayer(Layers.PAUSE).setHidden(true);
				this.getLayer(Layers.INFORMATION_BACKGROUND).setHidden(true);

				this.showControls=true;
				this.getLayer(Layers.CONTROLS).setHidden(false);
				this.getLayer(Layers.CONTROLS_BACKGROUND).setHidden(false);
				this.initControlScene();

				break;
			}
			case Events.BACK_TO_PAUSE:{
				this.getLayer(Layers.BACKGROUND).setHidden(false);
				this.getLayer(Layers.PRIMARY).setHidden(false);
				this.getLayer(Layers.HEALTHBARS).setHidden(false);
				this.getLayer(Layers.EXTRABARS).setHidden(false);
				this.getLayer(Layers.STATES).setHidden(false);
				this.getLayer(Layers.GAMEEND).setHidden(false);
				this.getLayer(Layers.UI).setHidden(false);
				this.getLayer(Layers.PAUSE).setHidden(false);
				this.getLayer(Layers.INFORMATION_BACKGROUND).setHidden(false);

				this.showControls=false;
				this.getLayer(Layers.CONTROLS).setHidden(true);
				this.getLayer(Layers.CONTROLS_BACKGROUND).setHidden(true);
				break;
			}
		}
	}

	protected initLayers():void{
		this.addLayer(Layers.BACKGROUND, 0);
		this.addLayer(Layers.PRIMARY, 5);
		this.addLayer(Layers.HEALTHBARS, 6);
		this.addLayer(Layers.EXTRABARS, 7);
		this.addLayer(Layers.INFORMATION_BACKGROUND, 8);
		this.addLayer(Layers.STATES, 9);
		this.addLayer(Layers.GAMEEND, 10);
		this.addUILayer(Layers.UI);

		this.addLayer(Layers.PAUSE, 100);
		this.addLayer(Layers.CONTROLS_BACKGROUND, 10);
		this.addLayer(Layers.CONTROLS, 102);
	}
	

	/**
	 * Initializes the UI for the HW3-Scene.
	 * 
	 * @remarks
	 * 
	 * The UI should probably be extracted out of the Scene class and put into
	 * it's own UI class, but I don't have time for that.
	 */
	protected initUI(): void {
		//
		const center = this.viewport.getCenter();
		this.endText = <Label> this.add.uiElement(UIElementType.LABEL, Layers.GAMEEND, {position: new Vec2(center.x, center.y), text: ""});
		this.endText.fontSize=48;
		this.endText.textColor=Color.WHITE
		// information background
		this.informationBackground = <Label>this.add.uiElement(UIElementType.LABEL, Layers.INFORMATION_BACKGROUND, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+150, GAMEPLAY_DIMENTIONS.YSTART+450), text: ""});
		this.informationBackground.size = new Vec2(295, 895);
		this.informationBackground.backgroundColor = Color.fromStringHex("#364558");
		this.informationBackground.borderColor = Color.WHITE;
		this.informationBackground.borderWidth = 4;

		// health icon  
		this.healthIcon = this.add.sprite("HealthIcon", Layers.STATES);
		this.healthIcon.position = new Vec2(GAMEPLAY_DIMENTIONS.XEND+60, GAMEPLAY_DIMENTIONS.YSTART+80);
		this.healthIcon.scale = new Vec2(0.25,0.25);
		// HP Label
		this.healthLabel = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+60, GAMEPLAY_DIMENTIONS.YSTART+30), text: "HP"});
		this.healthLabel.size.set(24, 24);
		this.healthLabel.fontSize = 24;
		this.healthLabel.font = "Courier";
		this.healthLabel.textColor = Color.WHITE;
		//health bar
		this.healthBar = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+60, GAMEPLAY_DIMENTIONS.YSTART+325), text: ""});
		this.healthBar.size = new Vec2(60, 450);
		this.healthBar.backgroundColor = Color.fromStringHex("#07E3D6");
		// HealthBar Border
		this.healthBarBg = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+60, GAMEPLAY_DIMENTIONS.YSTART+325), text: ""});
		this.healthBarBg.size = new Vec2(60, 450);
		this.healthBarBg.borderColor = Color.BLACK;
		this.healthBarBg.borderWidth = 1;

		// shield icon  
		this.shieldIcon = this.add.sprite("ShieldIcon", Layers.STATES);
		this.shieldIcon.position = new Vec2(GAMEPLAY_DIMENTIONS.XEND+150, GAMEPLAY_DIMENTIONS.YSTART+80);
		this.shieldIcon.scale = new Vec2(0.25,0.25);
		// shield Label
		this.shieldLabel = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+150, GAMEPLAY_DIMENTIONS.YSTART+30), text: "SHIELD"});
		this.shieldLabel.size.set(24, 24);
		this.shieldLabel.fontSize = 24;
		this.shieldLabel.font = "Courier";
		this.shieldLabel.textColor = Color.WHITE;
		//shield bar
		this.shieldBars = new Array(5);
		for (let i = 0; i < this.shieldBars.length; i++) {
			let pos = new Vec2(GAMEPLAY_DIMENTIONS.XEND+150, GAMEPLAY_DIMENTIONS.YSTART+595-(i + 1)*(450 / this.shieldBars.length));
			this.shieldBars[i] = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: pos, text: ""});
			this.shieldBars[i].size = new Vec2(60, 450/this.shieldBars.length);
			this.shieldBars[i].backgroundColor = Color.fromStringHex("#07E3D6");
			this.shieldBars[i].borderColor = Color.BLACK;
		}
		// shield Border
		this.shieldBarBg = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+150, GAMEPLAY_DIMENTIONS.YSTART+325), text: ""});
		this.shieldBarBg.size = new Vec2(60, 450);
		this.shieldBarBg.borderColor = Color.BLACK;
		this.shieldBarBg.borderWidth = 1;

		// boost icon  
		this.boostIcon = this.add.sprite("BoostIcon", Layers.STATES);
		this.boostIcon.position = new Vec2(GAMEPLAY_DIMENTIONS.XEND+240, GAMEPLAY_DIMENTIONS.YSTART+80);
		this.boostIcon.scale = new Vec2(0.25,0.25);
		// boost Label
		this.boostLabel = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+240, GAMEPLAY_DIMENTIONS.YSTART+30), text: "BOOST"});
		this.boostLabel.size.set(24, 24);
		this.boostLabel.fontSize = 24;
		this.boostLabel.font = "Courier";
		this.boostLabel.textColor = Color.WHITE;
		// boost bar
		this.boostBars = new Array(5);
		for (let i = 0; i < this.boostBars.length; i++) {
			let pos = new Vec2(GAMEPLAY_DIMENTIONS.XEND+240, GAMEPLAY_DIMENTIONS.YSTART+595-(i + 1)*(450 / this.boostBars.length));
			this.boostBars[i] = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: pos, text: ""});
			this.boostBars[i].size = new Vec2(60, 450/this.boostBars.length);
			this.boostBars[i].backgroundColor = Color.fromStringHex("#07E3D6");
			this.boostBars[i].borderColor = Color.BLACK;
		}
		// boost Border
		this.boostBarBg = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+240, GAMEPLAY_DIMENTIONS.YSTART+325), text: ""});
		this.boostBarBg.size = new Vec2(60, 450);
		this.boostBarBg.borderColor = Color.BLACK;
		this.boostBarBg.borderWidth = 1;

		//wave
		this.waveLabel = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+75, GAMEPLAY_DIMENTIONS.YSTART+590), text: "WAVE: "});
		this.waveLabel.size.set(30, 30);
		this.waveLabel.fontSize = 30;
		this.waveLabel.font = "Courier";
		this.waveLabel.textColor = Color.WHITE;

		this.wave = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+125, GAMEPLAY_DIMENTIONS.YSTART+590), text: "0"});
		this.wave.size.set(30, 30);
		this.wave.fontSize = 30;
		this.wave.font = "Courier";
		this.wave.textColor = Color.WHITE;
		//

		//scrap iron
		this.scrapIronLabel = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+83, GAMEPLAY_DIMENTIONS.YSTART+640), text: "SCRAP: "});
		this.scrapIronLabel.size.set(30, 30);
		this.scrapIronLabel.fontSize = 30;
		this.scrapIronLabel.font = "Courier";
		this.scrapIronLabel.textColor = Color.WHITE;

		this.scrapIron = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+160, GAMEPLAY_DIMENTIONS.YSTART+640), text: `0`});
		this.scrapIron.size.set(30, 30);
		this.scrapIron.fontSize = 30;
		this.scrapIron.font = "Courier";
		this.scrapIron.textColor = Color.WHITE;
		//

		//points
		this.pointsLabel = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+92, GAMEPLAY_DIMENTIONS.YSTART+690), text: "POINTS: "});
		this.pointsLabel.size.set(30, 30);
		this.pointsLabel.fontSize = 30;
		this.pointsLabel.font = "Courier";
		this.pointsLabel.textColor = Color.WHITE;

		this.points = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+155, GAMEPLAY_DIMENTIONS.YSTART+690), text: `0`});
		this.points.size.set(30, 30);
		this.points.fontSize = 30;
		this.points.font = "Courier";
		this.points.textColor = Color.WHITE;
		//

		//health button
		const healthButton = <Button> this.add.uiElement(UIElementType.BUTTON, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+150, GAMEPLAY_DIMENTIONS.YSTART+740), text: "HEALTH"});
        healthButton.size.set(200, 50);
        healthButton.borderWidth = 0.5;
        healthButton.borderColor = Color.BLACK;
		healthButton.fontSize = 30;
        healthButton.backgroundColor = Color.fromStringHex("#07E3D6");
		healthButton.onClick
		healthButton.onClickEventId = Events.HEALTH;

		//increase max health button
		const maxHealthButton = <Button> this.add.uiElement(UIElementType.BUTTON, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+150, GAMEPLAY_DIMENTIONS.YSTART+800), text: "UPGRADE HEALTH (WIP)"});
        maxHealthButton.size.set(200, 50);
        maxHealthButton.borderWidth = 0.5;
        maxHealthButton.borderColor = Color.BLACK;
		maxHealthButton.fontSize = 18;
        maxHealthButton.backgroundColor = Color.fromStringHex("#07E3D6");
		maxHealthButton.onClickEventId = Events.UPGRADE_HEALTH;

		//upgrade weapon button
		const upgradeWeaponButton = <Button> this.add.uiElement(UIElementType.BUTTON, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+150, GAMEPLAY_DIMENTIONS.YSTART+860), text: "UPGRADE WEAPON (WIP)"});
        upgradeWeaponButton.size.set(200, 50);
        upgradeWeaponButton.borderWidth = 0.5;
        upgradeWeaponButton.borderColor = Color.BLACK;
		upgradeWeaponButton.fontSize = 18;
        upgradeWeaponButton.backgroundColor = Color.fromStringHex("#07E3D6");
		upgradeWeaponButton.onClickEventId = Events.UPGRADE_WEAPON;

		// initail PAUSE SCENE
		this.initPauseScene();
	}
	/**
	 * Initializes the background image sprites for the game.
	 */
	protected initBackground(): void {
		this.bg1 = this.add.sprite(this.BACKGROUND.KEY, Layers.BACKGROUND);
		this.bg1.scale.set(this.BACKGROUND.SCALE.X, this.BACKGROUND.SCALE.Y);
		this.bg1.position.copy(this.viewport.getCenter());

		this.bg2 = this.add.sprite(this.BACKGROUND.KEY, Layers.BACKGROUND);
		this.bg2.scale.set(this.BACKGROUND.SCALE.X, this.BACKGROUND.SCALE.Y);
		this.bg2.position = this.bg1.position.clone();
		this.bg2.position.add(this.bg1.sizeWithZoom.scale(0, -2));
	}

	protected initPauseScene():void{
		const center = this.viewport.getCenter();
		const cont = <Button> this.add.uiElement(UIElementType.LABEL, Layers.PAUSE, {position: new Vec2(center.x-100, center.y), text: ""});
		cont.backgroundColor= Color.YELLOW
		cont.text="CONTINUE"
		cont.onClick = ()=>{this.emitter.fireEvent(Events.PAUSE, {pausing:false})};

		const controls = <Button> this.add.uiElement(UIElementType.LABEL, Layers.PAUSE, {position: new Vec2(center.x-100, center.y+50), text: ""});
		controls.backgroundColor= Color.YELLOW
		controls.text="CONTROLS"
		controls.onClickEventId=Events.CONTROLS;

	}

	protected initControlScene():void{
		const bg3 = this.add.sprite(this.BACKGROUND.KEY, Layers.CONTROLS_BACKGROUND);
		bg3.scale.set(this.BACKGROUND.SCALE.X, this.BACKGROUND.SCALE.Y);
		bg3.position.copy(this.viewport.getCenter());

		const center = this.viewport.getCenter();
        const header = <Label>this.add.uiElement(UIElementType.LABEL, Layers.CONTROLS, {position: new Vec2(center.x, center.y - 250), text: "Controls"});
        header.textColor = Color.YELLOW;
        header.fontSize = 50;

        const w = <Label>this.add.uiElement(UIElementType.LABEL, Layers.CONTROLS, {position: new Vec2(center.x, center.y - 150), text: "W - Move Up"});
        w.textColor = Color.YELLOW;
        w.fontSize = 50;
        const a = <Label>this.add.uiElement(UIElementType.LABEL, Layers.CONTROLS, {position: new Vec2(center.x, center.y - 100), text: "A - Move Left"});
        a.textColor = Color.YELLOW;
        a.fontSize = 50;
        const s = <Label>this.add.uiElement(UIElementType.LABEL, Layers.CONTROLS, {position: new Vec2(center.x, center.y - 50), text: "S - Move Down"});
        s.textColor = Color.YELLOW;
        s.fontSize = 50;
        const d = <Label>this.add.uiElement(UIElementType.LABEL, Layers.CONTROLS, {position: new Vec2(center.x, center.y ), text: "D - Move Right"});
        d.textColor = Color.YELLOW
        d.fontSize = 50;
        const space = <Label>this.add.uiElement(UIElementType.LABEL, Layers.CONTROLS, {position: new Vec2(center.x, center.y + 50), text: "Left Click - Shoot"});
        space.textColor = Color.YELLOW;
        space.fontSize = 50;
        const E = <Label>this.add.uiElement(UIElementType.LABEL, Layers.CONTROLS, {position: new Vec2(center.x, center.y + 100), text: "E - Activate Shield"});
        E.textColor = Color.YELLOW;
        E.fontSize = 50;
        const R = <Label>this.add.uiElement(UIElementType.LABEL, Layers.CONTROLS, {position: new Vec2(center.x, center.y + 150), text: "R - Activate Booster"});
        R.textColor = Color.YELLOW;
        R.fontSize = 50;
        const ESC = <Label>this.add.uiElement(UIElementType.LABEL, Layers.CONTROLS, {position: new Vec2(center.x, center.y + 200), text: "ESC - Pause/Unpasue the Game"});
        ESC.textColor = Color.YELLOW;
        ESC.fontSize = 50;

        const back = this.add.uiElement(UIElementType.BUTTON, Layers.CONTROLS, {position: new Vec2(center.x-400, center.y - 400), text: "Back"});
        back.size.set(200, 50);
        back.borderWidth = 2;
        back.borderColor = Color.YELLOW;
        back.backgroundColor = Color.TRANSPARENT;
		back.onClickEventId = Events.BACK_TO_PAUSE;
	}

	/**
	 * To create the illusion of an endless background, we maintain two identical background sprites and move them as the game 
     * progresses. When one background is moved completely offscreen at the bottom, it will get moved back to the top to 
     * continue the cycle.
	 */
	protected moveBackgrounds(deltaT: number): void {
		let move = this.backgroundSpeed;
		this.bg1.position.sub(move.clone().scaled(deltaT));
		this.bg2.position.sub(move.clone().scaled(deltaT));

		let edgePos = this.viewport.getCenter().clone().add(this.bg1.sizeWithZoom.clone().scale(0, 2));

		if (this.bg1.position.y >= edgePos.y){
			this.bg1.position = this.viewport.getCenter().clone().add(this.bg1.sizeWithZoom.clone().scale(0, -2))
		}
		if (this.bg2.position.y >= edgePos.y){
			this.bg2.position = this.viewport.getCenter().clone().add(this.bg2.sizeWithZoom.clone().scale(0, -2))
		}
	}

	protected lockPlayer(player: CanvasNode, viewportCenter: Vec2, viewportHalfSize: Vec2): void {
		let left = GAMEPLAY_DIMENTIONS.XSTART;
		let right = GAMEPLAY_DIMENTIONS.XEND;
		let top = GAMEPLAY_DIMENTIONS.YSTART;
		let bottom = GAMEPLAY_DIMENTIONS.YEND;
		if(player.boundary.center.x-player.boundary.halfSize.x<left){player.position.x = left+player.boundary.halfSize.x;}
		if(player.boundary.center.x+player.boundary.halfSize.x>right){player.position.x = right-player.boundary.halfSize.x;}
		if(player.boundary.center.y-player.boundary.halfSize.y<top){player.position.y = top+player.boundary.halfSize.y;}
		if(player.boundary.center.y+player.boundary.halfSize.y>bottom){player.position.y = bottom-player.boundary.halfSize.y;}
	}

	public set player(value: PlayerActor) {this._player = value;}
	public get enemyDamageMulti():number {return this.statMods.enemydamage_multi?this.statMods.enemydamage_multi:1}
	public get playerDamageMulti():number {return this.player?this.player.damageMulti:1}

	/**Abstracted */
	public get player(): PlayerActor {return this._player;}
	public get isScreenCleared(): boolean {return this.entities.countInUse((x)=>{return x.PHYSICS == PhysicGroups.ENEMY}) <= 0}
	public get TravelSpeed():Vec2 {return this.backgroundSpeed}
	public get collectScrap():number {return RandUtils.randInt(10,21)}
	public get isPaused():boolean{return this.paused}

	public getEnemy(id: number): HPActor {return <HPActor>this.entities.getEntityById(id, PhysicGroups.ENEMY)}
	public getShot(id: number): DamageActor {return <DamageActor>this.entities.getEntityById(id, PhysicGroups.PLAYER_WEAPON)}
	public getEnemyShot(id: number): DamageActor {return <DamageActor>this.entities.getEntityById(id, PhysicGroups.ENEMY_WEAPON)}
	public getPlayerDamage(key: String): number{return this.damages.get(key)*this.playerDamageMulti}
	public getEnemyDamage(key: String): number{return this.damages.get(key)*this.enemyDamageMulti}
	public getClosestEnemy(pos: Vec2): HPActor {return <HPActor>this.entities.findClosestEntity(pos, (x)=>{return x.PHYSICS == PhysicGroups.ENEMY})}
	
	protected handleHealthChange(currentHealth: number, maxHealth: number): void {
		let unit = this.healthBarBg.size.y / maxHealth;

		this.healthBar.size.set(this.healthBarBg.size.x, this.healthBarBg.size.y - unit * (maxHealth - currentHealth));
		this.healthBar.position.set(this.healthBarBg.position.x, this.healthBarBg.position.y + (unit / 2) * (maxHealth - currentHealth));

		this.healthBar.backgroundColor = currentHealth < maxHealth * 1/4 ? Color.RED: currentHealth < maxHealth * 3/4 ? Color.YELLOW : Color.fromStringHex("#07E3D6");
	}
	
	protected handleShieldChange(currentShield: number): void {
		for (let i = 0; i < currentShield && i < this.shieldBars.length; i++) {
			this.shieldBars[i].backgroundColor = Color.fromStringHex("#07E3D6");
		}
		for (let i = currentShield; i < this.shieldBars.length; i++) {
			this.shieldBars[i].backgroundColor = Color.fromStringHex("#f74134");
		}
	}
	
	protected handleBoosterChange(currentBooster: number): void {
		for (let i = 0; i < currentBooster && i < this.boostBars.length; i++) {
			this.boostBars[i].backgroundColor = Color.fromStringHex("#07E3D6");
		}
		for (let i = currentBooster; i < this.boostBars.length; i++) {
			this.boostBars[i].backgroundColor = Color.fromStringHex("#f74134");
		}
	}

	
}