import { scriptFormat } from "../../constants/scripts/scriptTypes";
import ScriptQueue, { generateScriptQueue } from "../../utils/ScriptQueue/ScriptQueue";
import LevelScene from "./LevelScene";

/**
 * This scene handles the scripted events
 */
export default class ScriptScene extends LevelScene{
    private levelData:Record<string, any>
    private NAME:String
    private LOAD:Record<string, any>
    private SCRIPT:scriptFormat[]
    private scriptQueue: ScriptQueue

    public initScene(options: Record<string, any>): void {
        this.levelData = options.levelData;
        let {NAME, LOAD, SCRIPT} = this.levelData
        this.NAME = NAME;
        this.LOAD = LOAD;
        this.SCRIPT = SCRIPT;
        this.scriptQueue = generateScriptQueue(SCRIPT)
        console.log(this.levelData)
    }

}