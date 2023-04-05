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

import MineBehavior, { MineAnimations } from "../ai/MineBehavior";
import BubbleAI from "../ai/BubbleBehavior";
import LaserBehavior from "../ai/LaserBehavior";

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
import MookActor from "../actors/MookActor";
import MookBehavior from "../ai/enemyAI/MookBehavior";
import BasicTargetable from "../../utils/Targeting/BasicTargetable";
import Position from "../../utils/Targeting/Position";
import BeamActor from "../actors/BeamActor";
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
	protected cheatcodes: Record<string, number>

	

	// Laser/Charge labels
	protected chrgLabel: Label;
	protected chrgBarLabels: Array<Label>;

	// Air labels
	protected airLabel: Label;
	protected airBar: Label;
	protected airBarBg: Label;

	// Health labels
	protected healthLabel: Label;
	protected healthBar: Label;
	protected healthBarBg: Label;

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
	/**
	 * @see Scene.loadScene()
	 */
	public override loadScene(){
		// These Loaders are fine
		this.loadPlayer(LoadPlayer.PLAYER);
		this.autoloader(LoadPlayer.FLAMES);
		this.autoloader(LoadPlayer.SHIELD)

		this.loadBackground(LoadBackground.SPACE);

		this.autoloader(LoadEnemy.MINE);
		this.autoloader(LoadEnemy.COMMON_MOOK);
		this.autoloader(LoadProjectiles.BEAM);
		this.autoloader(LoadEnemyProjectile.ENEMY_BEAM);
	}

	protected loadList(list:LoadData[]){
		for(let data of list){this.autoloader(data);}
	}

	protected loadBackground(data: LoadData){
		this.autoloader(data)
		this.BACKGROUND = data;
	}

	protected loadPlayer(data: LoadData){
		this.autoloader(data)
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
		//this.initBackground();
		this.initUI();
		// Create a layer to serve as our main game - Feel free to use this for your own assets
		// It is given a depth of 5 to be above our background
		
		// Initialize the player
		//this.initPlayer();
		// Initialize the Timers
		//this.initTimers();
		// Initialize the UI
		

		// Initialize object pools
		//this.initObjectPools();

		// Subscribe to player events
		this.receiver.subscribe(HW2Events.CHARGE_CHANGE);
		this.receiver.subscribe(HW2Events.SHOOT_LASER);
		this.receiver.subscribe(HW2Events.DEAD);
		this.receiver.subscribe(HW2Events.UPDATE_GUI);

		// Subscribe to laser events
		this.receiver.subscribe(HW2Events.FIRING_LASER);
		this.receiver.subscribe(Events.ENEMY_SHOOTS);

		//Subscribe to mine events
		this.receiver.subscribe(HW2Events.PLAYER_MINE_COLLISION)
	}
	/**
	 * @see Scene.updateScene 
	 */
	public override updateScene(deltaT: number){
		this.timePassed += deltaT;
		// Handle events
		while (this.receiver.hasNextEvent()) {
			this.handleEvent(this.receiver.getNextEvent());
		}
		
		// Move the backgrounds
		this.moveBackgrounds(deltaT);
		this.wrapPlayer(this.player, this.viewport.getCenter(), this.viewport.getHalfSize())
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
		switch(event.type) {
			case HW2Events.SHOOT_LASER: {
				//this.spawnLaser(event.data.get("src"));
				break;
			}
			case HW2Events.DEAD: {
				console.log("Player has died")
				this.handleDeath();
				break;
			}
			case HW2Events.CHARGE_CHANGE: {
				this.handleChargeChange(event.data.get("curchrg"), event.data.get("maxchrg"));
				break;
			}
			case HW2Events.FIRING_LASER: {
				//this.minesDestroyed += this.handleMineLaserCollisions(event.data.get("laser"), this.mines);
				break;
			}
			case HW2Events.PLAYER_BUBBLE_COLLISION: {
				break;
			}
			case HW2Events.PLAYER_MINE_COLLISION: {
				break;
			}
			case HW2Events.UPDATE_GUI: {
				this.handleHealthChange(event.data.get("currentHealth"), event.data.get("maxHealth"))
				this.handleAirChange(event.data.get("currentAir"), event.data.get("maxAir"))
				break;
			}
			case Events.TEST:{
				console.log(event)
				break;
			}
			default: {}
		}
	}

	protected initLayers():void{
		this.addLayer(Layers.BACKGROUND, 0);
		this.addLayer(Layers.PRIMARY, 5);
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
		// UILayer stuff
		

		// HP Label
		this.healthLabel = <Label>this.add.uiElement(UIElementType.LABEL, Layers.UI, {position: new Vec2(50, 50), text: "HP "});
		this.healthLabel.size.set(300, 30);
		this.healthLabel.fontSize = 24;
		this.healthLabel.font = "Courier";

		// Air Label
		this.airLabel = <Label>this.add.uiElement(UIElementType.LABEL, Layers.UI, {position: new Vec2(50, 100), text: "Air"});
		this.airLabel.size.set(300, 30);
		this.airLabel.fontSize = 24;
		this.airLabel.font = "Courier";

		// Charge Label
		this.chrgLabel = <Label>this.add.uiElement(UIElementType.LABEL, Layers.UI, {position: new Vec2(475, 50), text: "Lasers"});
		this.chrgLabel.size.set(300, 30);
		this.chrgLabel.fontSize = 24;
		this.chrgLabel.font = "Courier";

		// Charge airBars
		this.chrgBarLabels = new Array(4);
		for (let i = 0; i < this.chrgBarLabels.length; i++) {
			let pos = new Vec2(500 + (i + 1)*(300 / this.chrgBarLabels.length), 50)
			this.chrgBarLabels[i] = <Label>this.add.uiElement(UIElementType.LABEL, Layers.UI, {position: pos, text: ""});
			this.chrgBarLabels[i].size = new Vec2(300 / this.chrgBarLabels.length, 25);
			this.chrgBarLabels[i].backgroundColor = Color.GREEN;
			this.chrgBarLabels[i].borderColor = Color.BLACK;
		}

		// HealthBar
		this.healthBar = <Label>this.add.uiElement(UIElementType.LABEL, Layers.UI, {position: new Vec2(225, 50), text: ""});
		this.healthBar.size = new Vec2(300, 25);
		this.healthBar.backgroundColor = Color.GREEN;

		// AirBar
		this.airBar = <Label>this.add.uiElement(UIElementType.LABEL, Layers.UI, {position: new Vec2(225, 100), text: ""});
		this.airBar.size = new Vec2(300, 25);
		this.airBar.backgroundColor = Color.CYAN;

		// HealthBar Border
		this.healthBarBg = <Label>this.add.uiElement(UIElementType.LABEL, Layers.UI, {position: new Vec2(225, 50), text: ""});
		this.healthBarBg.size = new Vec2(300, 25);
		this.healthBarBg.borderColor = Color.BLACK;

		// AirBar Border
		this.airBarBg = <Label>this.add.uiElement(UIElementType.LABEL, Layers.UI, {position: new Vec2(225, 100), text: ""});
		this.airBarBg.size = new Vec2(300, 25);
		this.airBarBg.borderColor = Color.BLACK;

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

			player.position.set(this.viewport.getCenter().x, this.viewport.getCenter().y);
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

	protected initObjectPools(): void {
		this.initBeams();
		this.initMooks(1);
		this.initEnemyBeam();
	}

	protected initEnemyBeam(c:number = 20):void{
		let info = AllProjectileData.ENEMY_BEAM
		this.damages.set(info.KEY, info.DAMAGE)
		let func = () => {
			let entity = this.add.animatedSprite(BeamActor, info.LOAD.KEY, Layers.PRIMARY)
			entity.damage_key = info.KEY
			entity.setScene(this)
			entity.visible = false;

			entity.addAI(BeamAI, {pos: Vec2.ZERO, dir: Vec2.DOWN})
			entity.addPhysics();
			entity.setGroup(PhysicGroups.ENEMY_WEAPON)
			entity.setTrigger(PhysicGroups.PLAYER, Events.WEAPON_PLAYER_COLLISION, null)
			return entity;
		}
		this.entities.initEntity(info.KEY, c, func, info)
	}

	protected initBeams(c:number = 20):void {
		let info = AllProjectileData.BEAM
		this.damages.set(info.KEY, info.DAMAGE)
		let func = () => {
			let entity = this.add.animatedSprite(BeamActor, info.LOAD.KEY, Layers.PRIMARY)
			entity.damage_key = info.KEY
			entity.setScene(this)
			entity.visible = false;
			entity.addAI(BeamAI, {pos: Vec2.ZERO})
			entity.addPhysics();
			entity.setGroup(PhysicGroups.PLAYER_WEAPON)
			entity.setTrigger(PhysicGroups.ENEMY, Events.WEAPON_ENEMY_COLLISION, null)
			return entity;
		}
		this.entities.initEntity(info.KEY, c, func, info)
	}

	protected initMooks(c:number = 20):void {
		let info = AllEnemyData.COMMON_MOOK
		let {X, Y} = info.LOAD.SCALE
		let func = () => {
			let entity = this.add.animatedSprite(MookActor, info.LOAD.KEY, Layers.PRIMARY)
			entity.setScene(this)

			entity.visible = false;
			entity.scale.set(X, Y);

			entity.addAI(MookBehavior, {target: new BasicTargetable(new Position(0,0))})

			let center = entity.position.clone()
			let halfSize = entity.boundary.getHalfSize().clone().scale(0.9,0.6);
			entity.addPhysics(new AABB(center, halfSize));
			entity.setGroup(PhysicGroups.ENEMY);
			return entity;
		}
		this.entities.initEntity(info.KEY, c, func, info)
	}
	/** Methods for updating the UI */

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
		let unit = this.airBarBg.size.x / maxAir;
		this.airBar.size.set(this.airBarBg.size.x - unit * (maxAir - currentAir), this.airBarBg.size.y);
		this.airBar.position.set(this.airBarBg.position.x - (unit / 2) * (maxAir - currentAir), this.airBarBg.position.y);
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
		for (let i = 0; i < currentCharge && i < this.chrgBarLabels.length; i++) {
			this.chrgBarLabels[i].backgroundColor = Color.GREEN;
		}
		for (let i = currentCharge; i < this.chrgBarLabels.length; i++) {
			this.chrgBarLabels[i].backgroundColor = Color.RED;
		}
	}
    /** Methods for locking and wrapping nodes */

    /**
	 * This function wraps the player around the top/bottom of the viewport.
	 * 
	 * @param player - the GameNode associated with the player
	 * @param viewportCenter - the coordinates of the center of the viewport
	 * @param viewportHalfSize - the halfsize of the viewport
	 * 
	 * @remarks
	 * 
	 * Wrapping the player around the screen involves moving the player over from one side of the screen 
	 * to the other side of the screen once the player has ventured too far into the padded region. To do
	 * this, you will have to:
	 * 
	 * 1.) Check if the player has moved halfway off the top or bottom of the viewport
	 * 2.) Update the player's position to the opposite side of the visible region
	 * 
	 * @see {Viewport} for more information about the viewport
	 * 
	 * For reference, a visualization of the padded viewport is shown below. The o's represent locations 
	 * where the player should be wrapped. The O's represent locations where the player should be wrapped to. 
	 * The X's represent locations where the player shouldn't be wrapped
	 * 
	 * Ex. the player should be wrapped from o1 -> O1, from o2 -> O2, etc. 
	 * 
	 * 
	 * 					 X	 THIS IS OUT OF BOUNDS
	 * 			 _______________________________________________
	 * 			|	 THIS IS THE PADDED REGION (OFF SCREEN)		|
	 * 			|												|
	 * 			|											    |
	 * 			|		 ___o1_______________O2_________		|
	 * 			|		|								|		|
	 * 			|		|								|		|
	 *	 		|		|	  THIS IS THE VISIBLE		|		|
	 * 		X	|	X	|			 REGION				|	X	|   X 
	 * 			|		|								|		|
	 * 			|		|		X						|		|
	 * 			|		|___O1_______________o2_________|		|
	 * 			|		   										|
	 * 			|		   						   				|
	 * 			|_______________________________________________|
	 *
	 * 							X THIS IS OUT OF BOUNDS													
	 */
	protected wrapPlayer(player: CanvasNode, viewportCenter: Vec2, viewportHalfSize: Vec2): void {
		// TODO wrap the player around the top/bottom of the screen
		let top = viewportCenter.y - viewportHalfSize.y;
		let bottom = viewportCenter.y +  viewportHalfSize.y;
		if(player.position.y<top){player.position.y = 900;}
		if(player.position.y>bottom){player.position.y = 0;}
		//edit the player CanvasNode's position directly
	}

    /**
	 * A function for locking the player's coordinates. The player should not be able to move off the 
	 * left or right side of the screen.
     * 
     * @param player - the CanvasNode associated with the player
	 * @param viewportCenter - the coordinates of the center of the viewport
	 * @param viewportHalfSize - the halfsize of the viewport 
	 * 
	 * @see {Viewport} for more information about the viewport
     * 
     * @remarks
     * 
     * More specifically, the left edge of the player's sprite should not move beyond the left edge 
     * of the viewport and the right side of the player's sprite should not move outside the right 
     * edge of the viewport.
     * 
     * For reference, a visualization of the padded viewport is shown below. The o's represent valid
     * locations for the player and the X's represent invalid locations for the player.
     * 	  
	 * 					 X	 THIS IS OUT OF BOUNDS
	 * 			 _______________________________________________
	 * 			|	 THIS IS THE PADDED REGION (OFF SCREEN)		|
	 * 			|												|
	 * 			|						X					    |
	 * 			|		 ______o______________o_________		|
	 * 			|		|								|		|
	 * 			|		X								|	X	|
	 *	 	X	|		|	  THIS IS THE VISIBLE		|		|
	 * 			|		|o			 REGION			   o|		|   X
	 * 			|		|								|		|
	 * 			|	X   |		o						X		|
	 * 			|		|_____o_______________o_________|		|
	 * 			|		   										|
	 * 			|		   				X		   				|
	 * 			|_______________________________________________|
	 *
	 * 							X THIS IS OUT OF BOUNDS	
	 * 
	 */
	protected lockPlayer(player: CanvasNode, viewportCenter: Vec2, viewportHalfSize: Vec2): void {
		// TODO prevent the player from moving off the left/right side of the screen
		let left = viewportCenter.x - viewportHalfSize.x;
		let right = viewportCenter.x +  viewportHalfSize.x;
		if(player.boundary.center.x-player.boundary.halfSize.x<left){player.position.x = 0+player.boundary.halfSize.x;}
		if(player.boundary.center.x+player.boundary.halfSize.x>right){player.position.x = 900-player.boundary.halfSize.x;}
		//edit the player CanvasNode's position directly
	}

	protected handleDeath(): void {
		this.gameOverTimer.start();
	}

	public set player(value: PlayerActor) {this._player = value;}

	/**Abstracted */
	public get player(): PlayerActor {return this._player;}
	public get isScreenCleared(): boolean {return this.entities.countInUse((x)=>{return x.PHYSICS == PhysicGroups.ENEMY}) <= 0}
	public getEnemy(id: number): HPActor {return <HPActor>this.entities.getEntityById(id, PhysicGroups.ENEMY)}
	public getShot(id: number): DamageActor {return <DamageActor>this.entities.getEntityById(id, PhysicGroups.PLAYER_WEAPON)}
	public getEnemyShot(id: number): DamageActor {return <DamageActor>this.entities.getEntityById(id, PhysicGroups.ENEMY_WEAPON)}
	public getDamage(key: String): number{return this.damages.get(key)}
}