import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import CanvasNode from "../../Wolfie2D/Nodes/CanvasNode";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import Timer from "../../Wolfie2D/Timing/Timer";
import { PhysicGroups} from "../../constants/physics";
import { Events } from "../../constants/events";
import BaseScene from "./BaseScene";
import { initfuncs } from "../initfuncs";
import { AllItemKey } from "../../constants/items/itemData";
import { AllPlayerData } from "../../constants/player/playerData";
import PlayerActor from "../actors/PlayerActor";
import { initPlayerFunc } from "../initPlayerFunc";
import SelectionScence from "./SelectionScene";

/**
 * This is the level scene for our game
 * It handles all the interactions
 */
export default class LevelScene extends BaseScene {

	protected endLevelTimer:Timer
	protected endType:string
	protected levelEnded:boolean

	public override initScene(options: Record<string, any>): void {
		this.endLevelTimer = new Timer(5000, ()=>{this.endLevel()})
	}

	/**
	 * @see Scene.updateScene 
	 */
	public override updateScene(deltaT: number){
		super.updateScene(deltaT)
		//this.spawnCommomMook(generatePathFromList(recRoute.NORMAL, 300));
	}

	protected handleEvent(event: GameEvent){
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
			case Events.HEALTH:{
				this.handleHealPlayer();
				break;
			}
			case Events.LEVEL_ENDS:{
				this.handleLevelEnds(event.data.get("endtype"));
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

	protected handleHealPlayer():void{
		if(this.player.canAfford(10)){
			this.player.usedScrap(10);
			this.player.health = this.player.maxHealth;
		}
	}

	protected handleLevelEnds(type: string):void{
		this.endType = type;
		this.levelEnded = true
		this.endLevelTimer.start();
		console.log(type)
	}

	protected endLevel():void{
		console.log("level ends")
		this.sceneManager.changeToScene(SelectionScence)
	}
}