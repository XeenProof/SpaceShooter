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

import { LoadData, LoadType, LoadBackground, LoadPlayer, LoadEnemy } from "../../constants/load";
import { PhysicGroups, Physics } from "../../constants/physics";
import { Events } from "../../constants/events";
import BeamAI from "../ai/weaponAI/BeamBehavior";
import BaseScene from "./BaseScene";
import PathNode from "../../utils/Pathing/PathNode";
import { recRoute } from "../../constants/formations/RectangleForm";
import { generatePathFromList } from "../../utils/Pathing/CreatePaths";
import { AllProjectileKeys } from "../../constants/projectiles/projectileData";
import { AllEnemyData, AllEnemyKeys } from "../../constants/enemies/enemyData";
import Spawnable from "../../utils/Interface/Spawnable";
import BeamActor from "../actors/WeaponActors/BeamActor";
import { initfuncs } from "../initfuncs";
import { AllItemKey } from "../../constants/items/itemData";
import { AllPlayerData } from "../../constants/player/playerData";
import PlayerActor from "../actors/PlayerActor";
import { Layers } from "../../constants/layers";
import { initPlayerFunc } from "../initPlayerFunc";



export const HW2Layers = {
	PRIMARY: "PRIMARY",
	BACKGROUND: "BACKGROUND", 
	UI: "UI"
} as const;

const GameInsideEvent = {
    HEALTH: "HEALTH",
	UPGRADE_HEALTH: "UPGRADE_HEALTH",
	UPGRADE_WEAPON: "UPGRADE_WEAPON",
} as const;

/**
 * This is the level scene for our game
 * It handles all the interactions
 */
export default class LevelScene extends BaseScene {

	public override initScene(options: Record<string, any>): void {
	}

	/**
	 * @see Scene.updateScene 
	 */
	public override updateScene(deltaT: number){
		super.updateScene(deltaT)
		//this.spawnCommomMook(generatePathFromList(recRoute.NORMAL, 300));
	}

	protected handleEvent(event: GameEvent){
		super.handleEvent(event);
		switch(event.type) {
			case Events.PLAYER_SHOOTS: {
				this.handleAttack(event.data.record)
				break;
			}
			case Events.ENEMY_SHOOTS: {
				this.handleAttack(event.data.record)
				break;
			}
			case Events.DROP_SCRAP:{
				this.handleSpawnScrap(event.data.get("src"))
				break;
			}
			case GameInsideEvent.HEALTH:{
				if(super.player.canAfford(100)){
					super.player.usedScrap(100);
					super.player.health = super.player.maxHealth;
				}
				break;
			}
			default: {
				throw new Error(`Unhandled event with type ${event.type} caught in ${this.constructor.name}`);
			}
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
	protected initPlayer(info:Record<string, any> = AllPlayerData.PLAYER_V1): void {
		let func = () => {return initPlayerFunc(this.add, this, info)}
		this.entities.initEntity(info.KEY, 1, func, info)
		this.player = <PlayerActor>this.entities.findOneEntity(()=>{return true}, (value: any) => {return value.PHYSICS == PhysicGroups.PLAYER})
		this.player.spawn({})
	}

	protected initEntities(initlist:(Record<string, any>)[]): void {
        initlist.forEach((x)=>{this.initfunc(x)})
    }

    protected initfunc(initdata: Record<string, any>): void {
        let {DATA, AMMOUNT} = initdata
		console.log("initalizing...", DATA.KEY)
        let KEY = DATA.KEY
        let func = ()=>{return initfuncs[KEY](this.add, this)}
        if(DATA.PHYSICS == PhysicGroups.PLAYER_WEAPON || DATA.PHYSICS == PhysicGroups.ENEMY_WEAPON){
            this.damages.set(KEY, DATA.DAMAGE)
        }
        this.entities.initEntity(KEY, AMMOUNT, func, DATA)
    }

	protected handleAttack(data: Record<string, any>): void{
		let projectile: CanvasNode = this.entities.getEntity(data.key)
		if(projectile){
			projectile.visible = true
			projectile.setAIActive(true, data)
		}
	}

	protected handleSpawnScrap(src: Vec2):void{
		let scrap: CanvasNode = this.entities.getEntity(AllItemKey.SCRAP)
		if(scrap){
			scrap.visible = true
			scrap.setAIActive(true, {src: src})
		}
	}
}