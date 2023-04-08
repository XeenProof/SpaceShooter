import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Graphic from "../../Wolfie2D/Nodes/Graphic";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import RandUtils from "../../Wolfie2D/Utils/RandUtils";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import CanvasNode from "../../Wolfie2D/Nodes/CanvasNode";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import Timer from "../../Wolfie2D/Timing/Timer";
import Circle from "../../Wolfie2D/DataTypes/Shapes/Circle";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";

import PlayerController from "../ai/PlayerController";

import GameOver from "./GameOver";

import BubbleShaderType from "../shaders/BubbleShaderType";
import LaserShaderType from "../shaders/LaserShaderType";

import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
//import BasicRecording from "../../Wolfie2D/Playback/BasicRecording";

import { HW2Events } from "../Events";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";

import { LoadData, LoadType, LoadBackground, LoadPlayer, LoadEnemy, LoadProjectiles, LoadEnemyProjectile } from "../../constants/load";
import { PhysicGroups, Physics } from "../../constants/physics";
import { Events } from "../../constants/events";
import BeamAI from "../ai/weaponAI/BeamBehavior";
import MookActor from "../actors/EnemyActors/MookActor";
import MookBehavior from "../ai/enemyAI/MookBehavior";
import BasicTargetable from "../../utils/Targeting/BasicTargetable";
import Position from "../../utils/Targeting/Position";
import BeamActor from "../actors/WeaponActors/BeamActor";
import PlayerActor from "../actors/PlayerActor";
import EntityManager from "../../utils/EntityManager/EntityManager";
import { AllEnemyData } from "../../constants/enemies/enemyData";
import { AllProjectileData } from "../../constants/projectiles/projectileData";
import { AllPlayerData } from "../../constants/player/playerData";
import Spawnable from "../../utils/Interface/Spawnable";
import ActorScene from "./ActorScene";
import HPActor from "../actors/abstractActors/HPActor";
import DamageActor from "../actors/abstractActors/DamageActor";
import { Layers } from "../../constants/layers";
import { GAMEPLAY_DIMENTIONS } from "../../constants/dimenstions";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";

/**
 * This is the base scene for our game.
 * It handles all the initializations 
 */
export default class BaseScene extends ActorScene{
	protected BACKGROUND: LoadData;
	protected PLAYER: LoadData;

	protected _player: PlayerActor;
	protected backgroundSpeed:Vec2;

	// Sprites for the background images
	protected bg1: Sprite;
	protected bg2: Sprite;
	protected bg3: Sprite;
	protected bg4: Sprite;

	protected entities: EntityManager<CanvasNode>;
	protected damages: Map<String, number>;
	protected cheatcodes: Record<string, boolean>

	// shield labels
	protected shieldLabel: Label;
	protected shieldBar: Label;
	protected shieldBarBg: Label;

	// boost labels
	protected boostLabel: Label;
	protected boostBar: Label;
	protected boostBarBg: Label;

	// Health labels
	protected healthLabel: Label;
	protected healthBar: Label;
	protected healthBarBg: Label;

	// wave, scrap iron, points lables
	protected waveLabel: Label;
	protected scrapIronLabel: Label;
	protected pointsLabel: Label;

	protected informationBackground: Label;

	// Timers for spawning rocks and bubbles
	protected mineSpawnTimer: Timer;
	protected bubbleSpawnTimer: Timer;
	protected gameOverTimer: Timer;

	// Keeps track of mines destroyed, bubbles popped, amount of time passed
	protected bubblesPopped: number = 0;
	protected minesDestroyed: number = 0;
	protected timePassed: number = 0;

	// The padding of the world
	protected worldPadding: Vec2;

	public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, {...options, physics: Physics});
		this.entities = new EntityManager<CanvasNode>();
		this.damages = new Map<String, number>();
		this.backgroundSpeed = new Vec2(0, -150);
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

		// Subscribe to laser events
		this.receiver.subscribe(Events.PLAYER_SHOOTS);
		this.receiver.subscribe(Events.ENEMY_SHOOTS);
		this.receiver.subscribe(Events.DROP_SCRAP);
	}
	/**
	 * @see Scene.updateScene 
	 */
	public override updateScene(deltaT: number){
		super.updateScene(deltaT)
		this.timePassed += deltaT;
		// Handle events
		while (this.receiver.hasNextEvent()) {
			this.handleEvent(this.receiver.getNextEvent());
		}
		this.moveBackgrounds(deltaT);
		this.lockPlayer(this.player, this.viewport.getCenter(), this.viewport.getHalfSize())
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
	}

	protected initLayers():void{
		this.addLayer(Layers.BACKGROUND, 0);
		this.addLayer(Layers.PRIMARY, 5);
		this.addLayer(Layers.HEALTHBARS, 6);
		this.addLayer(Layers.EXTRABARS, 7);
		this.addLayer(Layers.INFORMATION_BACKGROUND, 8);
		this.addLayer(Layers.STATES, 9);
		this.addUILayer(Layers.UI);
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
		// information background
		this.informationBackground = <Label>this.add.uiElement(UIElementType.LABEL, Layers.INFORMATION_BACKGROUND, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+150, GAMEPLAY_DIMENTIONS.YSTART+450), text: ""});
		this.informationBackground.size = new Vec2(295, 895);
		this.informationBackground.backgroundColor = Color.fromStringHex("#364558");
		this.informationBackground.borderColor = Color.WHITE;
		this.informationBackground.borderWidth = 4;

		// HP Label
		this.healthLabel = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+60, GAMEPLAY_DIMENTIONS.YSTART+30), text: "HP"});
		this.healthLabel.size.set(24, 24);
		this.healthLabel.fontSize = 24;
		this.healthLabel.font = "Courier";
		this.healthLabel.textColor = Color.WHITE;

		//healthbar
		this.healthBar = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+60, GAMEPLAY_DIMENTIONS.YSTART+325), text: ""});
		this.healthBar.size = new Vec2(60, 450);
		this.healthBar.backgroundColor = Color.fromStringHex("#07E3D6");

		// HealthBar Border
		this.healthBarBg = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+60, GAMEPLAY_DIMENTIONS.YSTART+325), text: ""});
		this.healthBarBg.size = new Vec2(60, 450);
		this.healthBarBg.borderColor = Color.BLACK;
		this.healthBarBg.borderWidth = 1;

		// shield Label
		this.shieldLabel = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+150, GAMEPLAY_DIMENTIONS.YSTART+30), text: "SHIELD"});
		this.shieldLabel.size.set(24, 24);
		this.shieldLabel.fontSize = 24;
		this.shieldLabel.font = "Courier";
		this.shieldLabel.textColor = Color.WHITE;

		//shield
		this.shieldBar = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+150, GAMEPLAY_DIMENTIONS.YSTART+325), text: ""});
		this.shieldBar.size = new Vec2(60, 450);
		this.shieldBar.backgroundColor = Color.fromStringHex("#07E3D6");

		// shield Border
		this.shieldBarBg = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+150, GAMEPLAY_DIMENTIONS.YSTART+325), text: ""});
		this.shieldBarBg.size = new Vec2(60, 450);
		this.shieldBarBg.borderColor = Color.BLACK;
		this.shieldBarBg.borderWidth = 1;

		// boost Label
		this.boostLabel = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+240, GAMEPLAY_DIMENTIONS.YSTART+30), text: "BOOST"});
		this.boostLabel.size.set(24, 24);
		this.boostLabel.fontSize = 24;
		this.boostLabel.font = "Courier";
		this.boostLabel.textColor = Color.WHITE;

		// boost
		this.boostBar = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+240, GAMEPLAY_DIMENTIONS.YSTART+325), text: ""});
		this.boostBar.size = new Vec2(60, 450);
		this.boostBar.backgroundColor = Color.fromStringHex("#07E3D6");

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

		//scrap iron
		this.scrapIronLabel = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+125, GAMEPLAY_DIMENTIONS.YSTART+640), text: "SCRAP IRON: "});
		this.scrapIronLabel.size.set(30, 30);
		this.scrapIronLabel.fontSize = 30;
		this.scrapIronLabel.font = "Courier";
		this.scrapIronLabel.textColor = Color.WHITE;

		//points
		this.pointsLabel = <Label>this.add.uiElement(UIElementType.LABEL, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+90, GAMEPLAY_DIMENTIONS.YSTART+690), text: "POINTS: "});
		this.pointsLabel.size.set(30, 30);
		this.pointsLabel.fontSize = 30;
		this.pointsLabel.font = "Courier";
		this.pointsLabel.textColor = Color.WHITE;

		//health button
		const healthButton = <Button> this.add.uiElement(UIElementType.BUTTON, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+150, GAMEPLAY_DIMENTIONS.YSTART+740), text: "HEALTH"});
        healthButton.size.set(200, 50);
        healthButton.borderWidth = 0.5;
        healthButton.borderColor = Color.BLACK;
		healthButton.fontSize = 30;
        healthButton.backgroundColor = Color.fromStringHex("#07E3D6");
		// healthButton.onClickEventId = MainMenuEvent.CONTROLS;

		//increase max health button
		const maxHealthButton = <Button> this.add.uiElement(UIElementType.BUTTON, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+150, GAMEPLAY_DIMENTIONS.YSTART+800), text: "UPGRADE HEALTH"});
        maxHealthButton.size.set(200, 50);
        maxHealthButton.borderWidth = 0.5;
        maxHealthButton.borderColor = Color.BLACK;
		maxHealthButton.fontSize = 18;
        maxHealthButton.backgroundColor = Color.fromStringHex("#07E3D6");
		// healthButton.onClickEventId = MainMenuEvent.CONTROLS;

		//upgrade weapon button
		const upgradeWeaponButton = <Button> this.add.uiElement(UIElementType.BUTTON, Layers.STATES, {position: new Vec2(GAMEPLAY_DIMENTIONS.XEND+150, GAMEPLAY_DIMENTIONS.YSTART+860), text: "UPGRADE WEAPON"});
        upgradeWeaponButton.size.set(200, 50);
        upgradeWeaponButton.borderWidth = 0.5;
        upgradeWeaponButton.borderColor = Color.BLACK;
		upgradeWeaponButton.fontSize = 18;
        upgradeWeaponButton.backgroundColor = Color.fromStringHex("#07E3D6");
		// upgradeWeaponButton.onClickEventId = MainMenuEvent.CONTROLS;
	}
	/**
	 * Initializes the timer objects for the game.
	 */
	protected initTimers(): void {
		this.mineSpawnTimer = new Timer(500);
		this.mineSpawnTimer.start();

		this.bubbleSpawnTimer = new Timer(2500);
		this.bubbleSpawnTimer.start();

		this.gameOverTimer = new Timer(3000);
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

	/** 
	 * This method initializes the player.
	 * 
	 * @remarks 
	 * 
	 * This method should add the player to the scene as an animated sprite. The player
	 * should be added to the primary layer of the scene. The player's position should 
	 * initially be set to the center of the viewport. The player should also be given
	 * a collision shape and PlayerController AI.
	 */ 
	protected initPlayer(): void {
		let info = AllPlayerData.PLAYER_V1
		let {SHIP, FLAMES, SHIELD} = info.LOAD
		let func = () => {
			let player = this.add.animatedSprite(PlayerActor, SHIP.KEY, Layers.PRIMARY);
			player.setScene(this)

			player.position.set(450, 750);
			player.scale.set(SHIP.SCALE.X, SHIP.SCALE.Y);

			let booster = this.add.animatedSprite(AnimatedSprite, FLAMES.KEY, Layers.PRIMARY);
			booster.position.copy(player.position)
			booster.scale.set(FLAMES.SCALE.X, FLAMES.SCALE.Y);
			player.booster = booster
			console.log(booster)

			let shield = this.add.sprite(SHIELD.KEY, Layers.PRIMARY);
			shield.position.copy(player.position)
			shield.scale.set(SHIELD.SCALE.X, SHIELD.SCALE.Y)
			shield.visible = false
			player.shield = shield

			player.addAI(PlayerController, {stats: info.STATS});

			let center = player.position.clone();
			let halfSize = player.boundary.getHalfSize().clone();
			player.addPhysics(new AABB(center, halfSize));
			player.setGroup(PhysicGroups.PLAYER)
			player.setTrigger(PhysicGroups.ENEMY, Events.PLAYER_ENEMY_COLLISION, null)

			return player
		}
		this.entities.initEntity(info.KEY, 1, func, info)
		this.player = <PlayerActor>this.entities.findOneEntity(()=>{return true}, (value: any) => {return value.PHYSICS == PhysicGroups.PLAYER})
		this.player.spawn({})
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

	/**Abstracted */
	public get player(): PlayerActor {return this._player;}
	public get isScreenCleared(): boolean {return this.entities.countInUse((x)=>{return x.PHYSICS == PhysicGroups.ENEMY}) <= 0}
	public get TravelSpeed():Vec2 {return this.backgroundSpeed}
	public getEnemy(id: number): HPActor {return <HPActor>this.entities.getEntityById(id, PhysicGroups.ENEMY)}
	public getShot(id: number): DamageActor {return <DamageActor>this.entities.getEntityById(id, PhysicGroups.PLAYER_WEAPON)}
	public getEnemyShot(id: number): DamageActor {return <DamageActor>this.entities.getEntityById(id, PhysicGroups.ENEMY_WEAPON)}
	public getDamage(key: String): number{return this.damages.get(key)}
	public getCheat(key: string): boolean {return (this.cheatcodes[key])?this.cheatcodes[key]:false}

	//TO-BE-REMOVED-----------------------------------------------------------------------------
	/**
	 * This method handles updating the player's healthbar in the UI.
	 * 
	 * @param currentHealth the current health of the player
	 * @param maxHealth the maximum amount of health the player can have
	 * 
	 * @remarks
	 * 
	 * The player's healthbar in the UI is updated to reflect the current health
	 * of the player. The method should be called in response to a player health
	 * change event.
	 * 
	 * The player's healthbar has two components:
	 * 
	 * 1.) The actual healthbar (the colored portion)
	 * 2.) The healthbar background
	 * 
	 * The size of the healthbar background should reflect the maximum amount of
	 * health the player can have. The size of the colored healthbar should reflect
	 * the current health of the player.
	 * 
	 * If the players health is less then 1/4 of the player's maximum health, the
	 * healthbar should be colored red. If the players health is less then 3/4 of
	 * the player's maximum health but no less than 1/4e the player's maximum health, 
	 * then the healthbar should appear yellow. If the player's health is greater 
	 * than 3/4 of the player's maximum health, then the healthbar should appear green.
	 * 
	 * @see Color for more information about colors
	 * @see Label for more information about labels 
	 */
	protected handleHealthChange(currentHealth: number, maxHealth: number): void {
		let unit = this.healthBarBg.size.x / maxHealth;

		this.healthBar.size.set(this.healthBarBg.size.x - unit * (maxHealth - currentHealth), this.healthBarBg.size.y);
		this.healthBar.position.set(this.healthBarBg.position.x - (unit / 2) * (maxHealth - currentHealth), this.healthBarBg.position.y);

		this.healthBar.backgroundColor = currentHealth < maxHealth * 1/4 ? Color.RED: currentHealth < maxHealth * 3/4 ? Color.YELLOW : Color.GREEN;
	}
	/**
	 * This method handles updating the player's air-bar in the UI.
	 * 
	 * @param currentAir the current amount of air the player has
	 * @param maxAir the maximum amount of air the player can have
	 * 
	 * @remarks
	 * 
	 * This method functions very similarly to how handleHealthChange function. The
	 * method should update the UI in response to a player-air-change event to 
	 * reflect the current amount of air the player has left.
	 * 
	 * The air-bar has two components:
	 * 
	 * 1.) The actual air-bar (the colored portion)
	 * 2.) The air-bar background
	 * 
	 * The size of the air-bar background should reflect the maximum amount of
	 * air the player can have. The size of the colored air-bar should reflect
	 * the current amount of air the player has.
	 * 
	 * Unlike the healthbar, the color of the air-bar should be a constant cyan.
	 * 
	 * @see Label for more information about labels
	 */
	protected handleAirChange(currentAir: number, maxAir: number): void {
		// let unit = this.airBarBg.size.x / maxAir;
		// this.airBar.size.set(this.airBarBg.size.x - unit * (maxAir - currentAir), this.airBarBg.size.y);
		// this.airBar.position.set(this.airBarBg.position.x - (unit / 2) * (maxAir - currentAir), this.airBarBg.position.y);
	}
	/**
	 * This method handles updating the charge of player's laser in the UI.
	 * 
	 * @param currentCharge the current number of charges the player's laser has
	 * @param maxCharge the maximum amount of charges the player's laser can have
	 * 
	 * @remarks
	 * 
	 * This method updates the UI to reflect the latest state of the charge
	 * of the player's laser-beam. 
	 * 
	 * Unlike the the health and air bars, the charge bar is broken up into multiple 
	 * "bars". If the player can have a maximum of N-lasers (or charges) at a time, 
	 * then the charge-bar will have N seperate components. Each component representing 
	 * a single charge of the player's laser.
	 * 
	 * Each of the N components will be colored green or red. The green components will 
	 * reflect how many charges the player's laser has available. The red components will
	 * reflect the number of bars that need to be charged.
	 * 
	 * When a player fires a laser, the rightmost green component should become red. When 
	 * the player's laser recharges, the leftmost red component should become green.
	 * 
	 * @example
	 * 
	 * Maxcharges = 4
	 * 
	 * Before firing a laser:
	 *  _______ _______ _______ _______
	 * | GREEN | GREEN | GREEN | GREEN |
	 * |_______|_______|_______|_______|
	 * 
	 * After firing a laser:
	 *  _______ _______ _______ _______
	 * | GREEN | GREEN | GREEN |  RED  |
	 * |_______|_______|_______|_______|
	 * 
	 * After firing a second laser:
	 *  _______ _______ _______ _______
	 * | GREEN | GREEN |  RED  |  RED  |
	 * |_______|_______|_______|_______|
	 * 
	 * After waiting for a recharge
	 *  _______ _______ _______ _______
	 * | GREEN | GREEN | GREEN |  RED  |
	 * |_______|_______|_______|_______|
	 * 
	 * @see Color for more information about color
	 * @see Label for more information about labels
	 */
	protected handleChargeChange(currentCharge: number, maxCharge: number): void {
		// for (let i = 0; i < currentCharge && i < this.chrgBarLabels.length; i++) {
		// 	this.chrgBarLabels[i].backgroundColor = Color.GREEN;
		// }
		// for (let i = currentCharge; i < this.chrgBarLabels.length; i++) {
		// 	this.chrgBarLabels[i].backgroundColor = Color.RED;
		// }
	}

	
}