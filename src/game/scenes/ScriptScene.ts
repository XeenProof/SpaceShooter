import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import CanvasNode from "../../Wolfie2D/Nodes/CanvasNode";
import Timer from "../../Wolfie2D/Timing/Timer";
import { AllEnemyData } from "../../constants/enemies/enemyData";
import { Events } from "../../constants/events";
import { LoadData } from "../../constants/load";
import { PhysicGroups } from "../../constants/physics";
import { Script_Type, scriptFormat } from "../../constants/scripts/scriptTypes";
import { generatePathFromList } from "../../utils/Pathing/CreatePaths";
import ScriptNode from "../../utils/ScriptQueue/ScriptNode";
import ScriptQueue, { generateScriptQueue } from "../../utils/ScriptQueue/ScriptQueue";
import { initfuncs } from "../initfuncs";
import LevelScene from "./LevelScene";

/**
 * This scene handles the scripted events
 */
export default class ScriptScene extends LevelScene{
    /**Base Variables */
    private levelData:Record<string, any>
    private NAME:String
    private LOAD:Record<string, any>
    private SCRIPT:scriptFormat[]
    private scriptQueue: ScriptQueue

    private timer:Timer
    private wait:boolean

    public initScene(options: Record<string, any>): void {
        this.levelData = options.levelData;
        this.cheatcodes = options.cheatcodes?options.cheatcodes:{}
        let {NAME, LOAD, SCRIPT} = this.levelData
        this.NAME = NAME;
        this.LOAD = LOAD;
        this.SCRIPT = SCRIPT;
        this.scriptQueue = generateScriptQueue(SCRIPT)
        console.log(this.levelData)

        this.timer = new Timer(1000, ()=>{this.stopWaiting()})
        this.wait = false
    }

    public loadScene(): void {
        super.loadScene()
        this.loadBackground(this.LOAD.BACKGROUND)
        let {PLAYER, OTHERS} = this.LOAD
        let {SHIP, FLAMES, SHIELD} = PLAYER
        let otherlist:LoadData[][] = OTHERS.map((x)=>{return x.DATA.LOAD})
        let reducedlist = otherlist.reduce((x,y)=>{return [...x, ...y]}, [])
        console.log(reducedlist)
        let list:LoadData[] = [SHIP, FLAMES, SHIELD, ...reducedlist]
        this.loadList(list)
    }

    public startScene(): void {
        super.startScene()
        //this.initLayers()
        this.initBackground()
        this.initPlayer()
        this.initEntities(this.LOAD.OTHERS)
    }

    public updateScene(deltaT: number): void {
        super.updateScene(deltaT)
        if(this.isScreenCleared && this.timer.isActive()){
            console.log("stopped waiting by force")
            this.stopWaiting();
        }
        while(!this.wait && this.scriptQueue.hasNextNode){
            let node:ScriptNode = this.scriptQueue.getNextNode();
            if(node){this.handleScript(node)}
        }
    }

    protected handleScript(node: ScriptNode){
        console.log("Performing...", node.type)
        switch(node.type){
            case Script_Type.UPDATE_TRAVEL_SPEED:{
                this.handleBackgroundSpeedUpdate(node.options)
                break;
            }
            case Script_Type.SPAWN:{
                this.handleSpawnEnemy(node.options)
                break;
            }
            case Script_Type.WAIT:{
                this.handleWait(node.options)
                break;
            }
        }
    }

    protected handleSpawnEnemy(options: Record<string, any>):void{
        let mook:CanvasNode = this.entities.getEntity(options.enemyType)
		if(mook){
			mook.visible = true;
			mook.setAIActive(true, {...options, path: generatePathFromList(options.path), stats: AllEnemyData[options.enemyType].STATS})}
    }

    protected handleBackgroundSpeedUpdate(options: Record<string, number>){
        let {X, Y} = options
        this.backgroundSpeed.x = (X != undefined)?X:this.backgroundSpeed.x;
        this.backgroundSpeed.y = (Y != undefined)?Y:this.backgroundSpeed.y;
        this.emitter.fireEvent(Events.TRAVEL_SPEED_CHANGE, {speed: this.backgroundSpeed})
    }

    protected handleWait(options: Record<string, number>){
        let {wait_time} = options
        this.wait = true;
        if(this.timer.isActive()){this.timer.pause()}
        if(wait_time == -1){return;}
        this.timer.reset()
        this.timer.reinit(wait_time, ()=>{this.stopWaiting()})
        this.timer.start()
    }

    protected stopWaiting(){
        this.wait = false;
        if(this.timer.isActive()){
            this.timer.pause();
        }
        this.timer.reset()
    }
}