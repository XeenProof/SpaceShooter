import { Script_Type, scriptFormat } from "./scriptTypes";
import { Positions, RandomizeVariables, generateRandomPathFuncList } from "../../utils/Pathing/CreatePaths";

export function duplicateEnemyKeys(enemyKeys:string[], amount):string[]{
    let list = []
    for(let key of enemyKeys){
        for(let i = 0; i < amount; i++){
            list.push(key)
        }
    }
    return list
}
/**
 * 
 * @param enemyKeys: the order of enemies
 * @param pathKeys: the paths they follow
 * @param waittime: the inbetween time before spawns
 * @param waitBetween: the number of enemies to wait inbetween
 * @param ammount: the amount of spawn scripts to generate
 * @returns 
 */
export function generateRoundRobinScriptPart(enemyKeys:string[], pathKeys:Positions[][], waittime: number = 0, waitBetween:number = pathKeys.length, ammount:number = enemyKeys.length, ):scriptFormat[]{
    if (enemyKeys.length == 0 || pathKeys.length == 0){return []}
    let waitactions = (waittime <= 0)?null:{type: Script_Type.WAIT, options: {wait_time: waittime}}
    let script:scriptFormat[] = []
    for(let i = 1; i <= ammount; i++){
        let options = {
            enemyType: enemyKeys[i%enemyKeys.length],
            path: pathKeys[i%pathKeys.length]
        }
        script.push({type: Script_Type.SPAWN, options:options})
        if(waitactions != null && i%(waitBetween) == 0){
            script.push(waitactions)
        }
    }
    return script;
}

/**
 * 
 * @param enemyKeys: the order of enemies
 * @param settingsList: the generate random paths setting
 * @param defaultsettings: default for the settingslist
 * @param repeatedpaths: number of enemies sharing a path
 * @param waittime: the inbetween time before spawns
 * @param waitBetween: the number of enemies to wait inbetween
 * @param ammount: the amount of spawn scripts to generate
 * @returns 
 */
export function applyRandomPathSettings(enemyKeys:string[], settingsList:RandomizeVariables[], defaultsettings:RandomizeVariables = {},repeatedpaths:number = 1, waittime: number = 0, waitBetween:number = repeatedpaths, ammount:number = enemyKeys.length){
    if(enemyKeys.length == 0 || settingsList.length == 0){return []}
    let waitactions = (waittime <= 0)?null:{type: Script_Type.WAIT, options: {wait_time: waittime}}
    let script:scriptFormat[] = []
    for(let i = 1; i <= ammount; i++){
        let options = {
            enemyType: enemyKeys[i%enemyKeys.length],
            rpsl: settingsList,
            rpsd: defaultsettings
        }
        script.push({type:Script_Type.SPAWN, options:options})
        if(waitactions != null && i%(waitBetween) == 0){
            script.push(waitactions)
        }
    }
    return script
}