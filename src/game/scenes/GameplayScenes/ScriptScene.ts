import CanvasNode from "../../../Wolfie2D/Nodes/CanvasNode";
import Timer from "../../../Wolfie2D/Timing/Timer";
import RandUtils from "../../../Wolfie2D/Utils/RandUtils";
import { AllEnemyData } from "../../../constants/enemies/enemyData";
import { Events, LevelEndConst } from "../../../constants/events";
import { LoadData } from "../../../constants/load";
import { Script_Type, scriptFormat } from "../../../constants/scripts/scriptTypes";
import { generatePathFromList } from "../../../utils/Pathing/CreatePaths";
import ScriptNode from "../../../utils/ScriptQueue/ScriptNode";
import ScriptQueue, { generateScriptQueue } from "../../../utils/ScriptQueue/ScriptQueue";
import ProgressTracker from "../../../utils/Singletons/ProgressTracker";
import LevelScene from "./LevelScene";

/**
 * This scene handles the scripted events
 */
export default class ScriptScene extends LevelScene{
    /**Base Variables */
    private levelData:Record<string, any>
    static NAME:String
    private KEY:string
    private LOAD:Record<string, any>
    private SCRIPT:scriptFormat[]
    private AUDIOLIST:LoadData[]
    private scriptQueue: ScriptQueue
    private randomQueue: ScriptQueue

    private timer:Timer
    private wait:boolean
    private TimerWasActive:boolean

    public initScene(options: Record<string, any>): void {
        this.levelData = options.levelData;
        let {NAME, LOAD, SCRIPT, RANDOMSPAWN, AUDIOLIST, KEY} = this.levelData
        ScriptScene.NAME = NAME;
        this.KEY = KEY
        this.LOAD = LOAD;
        this.SCRIPT = SCRIPT;
        this.AUDIOLIST = (AUDIOLIST)?AUDIOLIST:[];
        this.scriptQueue = generateScriptQueue(SCRIPT)
        this.randomQueue = generateScriptQueue(RANDOMSPAWN)
        console.log(this.levelData)

        this.timer = new Timer(1000, ()=>{this.stopWaiting()})
        this.wait = false
        super.initScene(options);
    }

    public loadScene(): void {
        super.loadScene()
        this.loadBackground(this.LOAD.BACKGROUND)
        let {PLAYER, OTHERS} = this.LOAD
        let {SHIP, FLAMES, SHIELD, AUDIO} = PLAYER
        let otherlist:LoadData[][] = OTHERS.map((x)=>{return x.DATA.LOAD})
        let reducedlist = otherlist.reduce((x,y)=>{return [...x, ...y]}, [])
        let otheraudio:LoadData[][] = OTHERS.map((x)=>{return x.DATA.AUDIO?x.DATA.AUDIO:[]})
        let reducedaudio = otheraudio.reduce((x,y)=>{return [...x, ...y]}, [])
        console.log(reducedlist, reducedaudio)
        let list:LoadData[] = [SHIP, FLAMES, SHIELD,...AUDIO, ...reducedlist, ...this.AUDIOLIST, ...reducedaudio]
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
        if(this.paused){return}
        if(this.isScreenCleared && this.wait && !this.paused){
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
                this.handleScriptedSpawn(node.options)
                break;
            }
            case Script_Type.WAIT:{
                this.handleWait(node.options)
                break;
            }
            case Script_Type.WAVE:{
                this.HandleWave(node.options)
                break;
            }
            case Script_Type.LEVEL_ENDS:{
                this.handleScriptedLevelEnds(node.options.endtype)
                break;
            }
            case Script_Type.PLAY_SOUND:{
                this.handleScriptedAudio(node.options)
                break;
            }
        }
    }

    public handlePause():void{
        console.log("paused")
        if(!this.TimerWasActive){return;}
        if(this.paused){this.timer.pause()}
        if(!this.paused){this.timer.start()}
    }

    protected handleScriptedLevelEnds(type: string):void{
        this.handleLevelEnds(type)
        if(type == LevelEndConst.LEVEL_CLEARED){
            ProgressTracker.setProgress(this.KEY, 1)
        }
    }

    protected handleScriptedAudio(options: Record<string, any>){
        let index:number = options.index
        if(index < 0 || index >= this.AUDIOLIST.length){console.log("Audio not found")}
        let key:string = this.AUDIOLIST[index].KEY
        console.log("Playing...", key)
        this.handlePlayAudio({...options, key: key})
    }

    protected handleScriptedSpawn(options: Record<string, number>){
        this.handleSpawnEnemy(options)
        if(!this.randomQueue.hasNextNode){return;}
        let randomnode = this.randomQueue.peekNextNode()
        if(!RandUtils.randomChance(randomnode.chance)){return;}
        this.handleSpawnEnemy(randomnode.options)
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
        this.TimerWasActive = true
    }

    protected HandleWave(options: Record<string, any>){
        let {wavenum, mods} = options
        this.wavenum = wavenum;
        this.statMods = {...this.statMods, ...mods}
        console.log(wavenum)
    }

    protected stopWaiting(){
        console.log("stop watting called")
        this.wait = false;
        if(this.timer.isActive()){
            this.timer.pause();
        }
        this.TimerWasActive = false
        this.timer.reset()
    }
}