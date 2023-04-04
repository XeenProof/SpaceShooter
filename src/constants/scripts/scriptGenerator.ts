import { Script_Type, scriptFormat } from "./scriptTypes";
import { Positions } from "../../utils/Pathing/CreatePaths";

export function generateRoundRobinScriptPart(enemyKeys:string[], pathKeys:Positions[][], waittime: number = 0, waitBetween:number = pathKeys.length, ammount:number = enemyKeys.length, ):scriptFormat[]{
    if (enemyKeys.length == 0 || pathKeys.length == 0){return []}
    let waitactions = (waittime <= 0)?null:{type: Script_Type.WAIT, options: {wait_time: waittime}}
    let script:scriptFormat[] = []
    for(let i = 0; i < ammount; i++){
        let options = {
            enemyType: enemyKeys[i%enemyKeys.length],
            path: pathKeys[i%pathKeys.length]
        }
        script.push({type: Script_Type.SPAWN, options:options})
        if(waitactions != null && i%(waitBetween) == 0 && i != 0){
            script.push(waitactions)
        }
    }
    return script;
}