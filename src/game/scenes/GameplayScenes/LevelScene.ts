import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import CanvasNode from "../../../Wolfie2D/Nodes/CanvasNode";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { PhysicGroups} from "../../../constants/physics";
import { Events, LevelEndConst } from "../../../constants/events";
import BaseScene from "./BaseScene";
import { initfuncs } from "../../initfuncs/initfuncs";
import { AllItemKey } from "../../../constants/items/itemData";
import { AllPlayerData } from "../../../constants/player/playerData";
import PlayerActor from "../../actors/PlayerActor";
import { initPlayerFunc } from "../../initfuncs/initPlayerFunc";
import SelectionScence from "../MenuScenes/SelectionScene";
import { AllEnemyData } from "../../../constants/enemies/enemyData";
import { generateRandomPathFuncList, spawnRandomizer } from "../../../utils/Pathing/CreatePaths";
import ScriptScene from "./ScriptScene";

import { level1 } from "../../../constants/scripts/level1script";
import { level2 } from "../../../constants/scripts/level2script";
import { level3 } from "../../../constants/scripts/level3script";
import { level4 } from "../../../constants/scripts/level4script";
import { level5 } from "../../../constants/scripts/level5script";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";

const audioDefaults = {
	loop: true,
	holdReference: true
}
/**
 * This is the level scene for our game
 * It handles all the interactions
 */
export default class LevelScene extends BaseScene {
	protected currentAudio:string

	protected endLevelTimer:Timer
	protected endType:string
	protected levelEnded:boolean

	public override initScene(options: Record<string, any>): void {
		this.endLevelTimer = new Timer(5000, ()=>{this.endLevel()})
	}

	public override startScene(): void {
		super.startScene()

		this.receiver.subscribe(Events.PLAYER_SHOOTS);
		this.receiver.subscribe(Events.ENEMY_SHOOTS);
		this.receiver.subscribe(Events.DROP_SCRAP);
		this.receiver.subscribe(Events.LEVEL_ENDS);
		this.receiver.subscribe(Events.ENEMY_SUMMONS);
	}

	/**
	 * @see Scene.updateScene 
	 */
	public override updateScene(deltaT: number){
		super.updateScene(deltaT)
	}

	protected handleEvent(event: GameEvent){
		super.handleEvent(event)
		switch(event.type) {
			case Events.PLAYER_SHOOTS: {
				this.handleAttackList(event.data.get("projectiles"))
				break;
			}
			case Events.ENEMY_SHOOTS: {
				this.handleAttackList(event.data.get("projectiles"))
				break;
			}
			case Events.DROP_SCRAP:{
				this.handleSpawnScrap(event.data.get("src"))
				break;
			}
			case Events.LEVEL_ENDS:{
				this.handleLevelEnds(event.data.get("endtype"));
				break;
			}
			case Events.ENEMY_SUMMONS:{
				this.handleSummoning(event.data.get("id"), event.data.get("summons"))
				break;
			}
		}
	}

	public unloadScene(): void {
		// if(this.currentAudio){
		// 	//this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.currentAudio})
		// }
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

	protected handleAttackList(list: Record<string, any>[]): void{
		for(let data of list){
			this.handleAttack(data);
		}
	}

	protected handleAttack(data: Record<string, any>): void{
		let projectile: CanvasNode = this.entities.getEntity(data.key)
		if(projectile){
			projectile.visible = true
			projectile.setAIActive(true, data)
		}
	}

	protected handleSummoning(id:number, options: Record<string, any>[]):void{
		let minions:{key:string, minion:CanvasNode}[] = []
		for(let op of options){
			let summoned = this.handleSpawnEnemy(op)
			minions.push({key:op.summonKey, minion:summoned})
		}
		this.emitter.fireEvent(Events.SUMMONING_COMPLETED, {
			id: id,
			summoned: minions
		})
	}

	protected handleSpawnEnemy(options: Record<string, any>):CanvasNode{
        let mook:CanvasNode = this.entities.getEntity(options.enemyType)
		console.log(options)
		let rpsd = options.rpsd?options.rpsd:{}
		let rpsl = options.rpsl?options.rpsl:(options.src)?[{}]:[spawnRandomizer, {}]
		let path = (options.path)?options.path:generateRandomPathFuncList(rpsl, rpsd)
		if(mook){
			mook.visible = true;
			mook.setAIActive(true, {...options,
				path: path,
                stats: AllEnemyData[options.enemyType].STATS,
                mods:this.statMods})
        }
		return mook
    }

	protected handleSpawnScrap(src: Vec2):void{
		let scrap: CanvasNode = this.entities.getEntity(AllItemKey.SCRAP)
		if(scrap){
			scrap.visible = true
			scrap.setAIActive(true, {src: src})
		}
	}

	protected handleLevelEnds(type: string):void{
		this.endType = type;
		this.levelEnded = true
		this.endLevelTimer.start();
		console.log(type)
	}

	protected handlePlayAudio(options: Record<string, any>):void{
		let key = options.key
		if(!key){return;}
		let settings = {...audioDefaults, ...options}
		this.emitter.fireEvent(GameEventType.PLAY_SOUND, settings)
		this.currentAudio = key
	}

	protected endLevel():void{
		if(this.currentAudio){
			this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.currentAudio})
		}

		// this.
		// console.log("level ends")
		// console.log(this.endType)
		// if(this.endType!=LevelEndConst.GAME_OVER){
		// 	if (ScriptScene.NAME == level1.NAME){
		// 		SelectionScence.level2_Open=true;
		// 	}

		// 	if (ScriptScene.NAME == level2.NAME){
		// 		SelectionScence.level3_Open=true;
		// 	}

		// 	if (ScriptScene.NAME == level3.NAME){
		// 		SelectionScence.level4_Open=true;
		// 	}

		// 	if (ScriptScene.NAME == level4.NAME){
		// 		SelectionScence.level5_Open=true;
		// 	}

		// 	if (ScriptScene.NAME == level5.NAME){
		// 		SelectionScence.level6_Open=true;
		// 	}
		// }

		this.sceneManager.changeToScene(SelectionScence)
	}
}