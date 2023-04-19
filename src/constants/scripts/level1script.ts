import { AllEnemyKeys, AllEnemyData} from "../enemies/enemyData";

import { recRoute } from "../formations/RectangleForm";
import { diagonalRoute } from "../formations/DiagonalForm";
import { TriangleRoute } from "../formations/TriangleForm";
import { VtypeRoute } from "../formations/VtypeForm";
import { DiamondRoute } from "../formations/DiamondForm";

import { LoadBackground} from "../load";
import { AllPlayerData } from "../player/playerData";
import { AllProjectileKeys, AllProjectileData} from "../projectiles/projectileData";
import { applyRandomPathSettings, duplicateEnemyKeys, generateRoundRobinScriptPart } from "./scriptGenerator";
import { Script_Type } from "./scriptTypes";
import { AllItemData } from "../items/itemData";
import { LevelEndConst } from "../events";
import { spawnRandomizer } from "../../utils/Pathing/CreatePaths";

const RandomizedSettings = {
    speed:{min: 600},
    repeat:{min:-1},
    generateAmount: 20,
}

const RandomHoarderScript = {
    type: Script_Type.SPAWN,
    options: {
        enemyType: AllEnemyKeys.HOARDER,
        rpsl: [spawnRandomizer, RandomizedSettings]
    },
    chance: 0.01,
    repeat: 19,
}

export const level1 = {
    NAME: "Level 1",
    LOAD: {
        BACKGROUND: LoadBackground.SPACE,
        PLAYER: AllPlayerData.PLAYER_V1.LOAD,
        OTHERS: [
            {DATA: AllProjectileData.ENEMY_BEAM, AMMOUNT: 20},
            {DATA: AllProjectileData.BEAM, AMMOUNT: 200},
            {DATA: AllProjectileData.TARGETED_BEAM, AMMOUNT: 20},

            {DATA: AllEnemyData.COMMON_MOOK, AMMOUNT: 20},
            {DATA: AllEnemyData.TARGETED_MOOK, AMMOUNT: 20},
            {DATA: AllEnemyData.SHIELDED_MOOK, AMMOUNT: 20},
            {DATA: AllEnemyData.HOARDER, AMMOUNT: 20},

            {DATA: AllEnemyData.MEGAMOOK, AMMOUND: 1},

            {DATA: AllItemData.SCRAP, AMMOUNT: 20},
        ]
    },
    SCRIPT: [
        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-150}},
        {type: Script_Type.SPAWN, options: {
            enemyType: AllEnemyKeys.MEGAMOOK,
            rpsl: [spawnRandomizer, {
                speed:{min: 300},
                repeat:{min:-1},
                generateAmount: 20
            }]
        }},
        {type: Script_Type.WAIT, options: {wait_time: -1}},
        {type: Script_Type.WAVE, options: {wavenum: 1, mods:{droprate_multi: 10}}},
        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-150}},
        ...applyRandomPathSettings([AllEnemyKeys.COMMON_MOOK], [spawnRandomizer, RandomizedSettings], {}, 1, 200, 2, 20),
        {type: Script_Type.WAIT, options: {wait_time: -1}},
        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-300}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK], [recRoute.NORMAL, recRoute.REVERSE], 600, 2, 10),
        {type: Script_Type.WAIT, options: {wait_time: -1}},
        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-300}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK], [DiamondRoute.NORMAL, DiamondRoute.REVERSE], 600, 2, 10),
        {type: Script_Type.WAIT, options: {wait_time: -1}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK], [diagonalRoute.NORMAL, diagonalRoute.REVERSE], 600, 2, 10),
        {type: Script_Type.WAIT, options: {wait_time: -1}},
        ...generateRoundRobinScriptPart(duplicateEnemyKeys([AllEnemyKeys.COMMON_MOOK, AllEnemyKeys.TARGETED_MOOK], 2), [TriangleRoute.NORMAL, TriangleRoute.REVERSE], 600, 2, 10),
        {type: Script_Type.WAIT, options: {wait_time: -1}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK, AllEnemyKeys.TARGETED_MOOK, AllEnemyKeys.SHIELDED_MOOK], [VtypeRoute.NORMAL, VtypeRoute.REVERSE], 600, 2, 10),
        {type: Script_Type.WAIT, options: {wait_time: -1}},
        {type: Script_Type.LEVEL_ENDS, options: {endtype: LevelEndConst.LEVEL_CLEARED}}
    ],
    RANDOMSPAWN: [
        RandomHoarderScript
    ]
}