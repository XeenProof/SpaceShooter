import Timer from "../../Wolfie2D/Timing/Timer";
import { LoadData } from "../../constants/load";
import { PhysicGroups } from "../../constants/physics";
import { scriptFormat } from "../../constants/scripts/scriptTypes";
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

        this.timer = new Timer(1000, ()=>{this.wait = false})
        this.wait = false
    }

    public loadScene(): void {
        this.loadBackground(this.LOAD.BACKGROUND)
        let {PLAYER, OTHERS} = this.LOAD
        let {SHIP, FLAMES, SHIELD} = PLAYER
        let otherlist = OTHERS.map((x)=>{return x.DATA.LOAD})
        let list:LoadData[] = [SHIP, FLAMES, SHIELD, ...otherlist]
        console.log(list)
        this.loadList(list)
    }

    public startScene(): void {
        super.startScene()
        //this.initLayers()
        this.initBackground()
        this.initPlayer()
        this.initEntities(this.LOAD.OTHERS)
    }

    protected initEntities(initlist:(Record<string, any>)[]): void {
        initlist.forEach((x)=>{this.initfunc(x)})
    }

    /**Move to base scene later */
    protected initfunc(initdata: Record<string, any>): void {
        let {DATA, AMMOUNT} = initdata
        let KEY = DATA.KEY
        let func = ()=>{return initfuncs[KEY](this.add, this)}
        if(DATA.PHYSICS == PhysicGroups.PLAYER_WEAPON || DATA.PHYSICS == PhysicGroups.ENEMY_WEAPON){
            this.damages.set(KEY, DATA.DAMAGE)
        }
        this.entities.initEntity(KEY, AMMOUNT, func, DATA)
    }

}