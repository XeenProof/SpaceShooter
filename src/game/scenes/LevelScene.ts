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
import BeamActor from "../actors/BeamActor";



/**
 * A type for layers in the HW3Scene. It seems natural to want to use some kind of enum type to
 * represent the different layers in the HW3Scene, however, it is generally bad practice to use
 * Typescripts enums. As an alternative, I'm using a const object.
 * 
 * @author PeteyLumpkins
 * 
 * {@link https://www.typescriptlang.org/docs/handbook/enums.html#objects-vs-enums}
 */
export const HW2Layers = {
	PRIMARY: "PRIMARY",
	BACKGROUND: "BACKGROUND", 
	UI: "UI"
} as const;

/**
 * This is the main scene for our game. 
 * @see Scene for more information about the Scene class and Scenes in Wolfie2D
 */
export default class LevelScene extends BaseScene {

	/**
	 * @see Scene.updateScene 
	 */
	public override updateScene(deltaT: number){
		super.updateScene(deltaT)
		this.spawnCommomMook(generatePathFromList(recRoute, 300));
	}

	protected handleEvent(event: GameEvent){
		super.handleEvent(event)
		switch(event.type) {
			case HW2Events.SHOOT_LASER: {
				this.spawnBeam(event.data.get("src"));
				break;
			}
			case Events.ENEMY_SHOOTS: {
				this.spawnEnemyBeam(event.data.get("src"), event.data.get("dir"))
			}
			case HW2Events.DEAD: {
				break;
			}
			case HW2Events.CHARGE_CHANGE: {
				break;
			}
			case HW2Events.FIRING_LASER: {
				break;
			}
			case HW2Events.PLAYER_BUBBLE_COLLISION: {
				break;
			}
			case HW2Events.PLAYER_MINE_COLLISION: {
				break;
			}
			case HW2Events.UPDATE_GUI: {
				break;
			}
			default: {
				throw new Error(`Unhandled event with type ${event.type} caught in ${this.constructor.name}`);
			}
		}

	}

	protected spawnBeam(src: Vec2): void {
		let beam: Spawnable = this.entities.getEntity(AllProjectileKeys.BEAM);
		if(beam){beam.spawn({pos: src})}
	}

	protected spawnEnemyBeam(src: Vec2, dir?: Vec2):void{
		let ebeam: Spawnable = this.entities.getEntity(AllProjectileKeys.ENEMY_BEAM);
		if(ebeam){ebeam.spawn({pos:src, dir: dir})}
	}

	protected spawnCommomMook(path: PathNode[]): void {
		let mook:Spawnable = this.entities.getEntity(AllEnemyKeys.COMMON_MOOK)
		if(mook){mook.spawn({path: path})}
	}

	protected handleDeath(): void {
		this.gameOverTimer.start();
	}

}