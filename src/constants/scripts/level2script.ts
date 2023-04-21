import { AllEnemyKeys, AllEnemyData} from "../enemies/enemyData";

import { recRoute } from "../formations/RectangleForm";
import { diagonalRoute } from "../formations/DiagonalForm";
import { TriangleRoute } from "../formations/TriangleForm";
import { VtypeRoute } from "../formations/VtypeForm";
import { DiamondRoute } from "../formations/DiamondForm";
import { ZRoute } from "../formations/ZForm";

import { LoadBackground} from "../load";
import { AllPlayerData } from "../player/playerData";
import { AllProjectileKeys, AllProjectileData} from "../projectiles/projectileData";
import { generateRoundRobinScriptPart } from "./scriptGenerator";
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
    chance: 0.05,
    repeat: 2,
}

export const level2 = {
    NAME: "Level 2",
    KEY: "LEVEL2",
    UNLOCK: ["LEVEL1"],
    LOAD: {
        BACKGROUND: LoadBackground.SPACE,
        PLAYER: AllPlayerData.PLAYER_V1.LOAD,
        OTHERS: [
            {DATA: AllProjectileData.ENEMY_BEAM, AMMOUNT: 20},
            {DATA: AllProjectileData.BEAM, AMMOUNT: 20},

            {DATA: AllEnemyData.COMMON_MOOK, AMMOUNT: 20},
            {DATA: AllEnemyData.TARGETED_MOOK, AMMOUNT: 20},
            {DATA: AllEnemyData.SHIELDED_MOOK, AMMOUNT: 20},

            {DATA: AllItemData.SCRAP, AMMOUNT: 20},
        ]
    },
    SCRIPT: [
        {type: Script_Type.WAVE, options: {wavenum: 1, mods:{droprate_multi: 10}}},
        {type: Script_Type.WAIT, options: {wait_time: -1}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.TARGETED_MOOK], [recRoute.NORMAL], 300, 2, 1),
        {type: Script_Type.WAIT, options: {wait_time: -1}},

        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-300}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.TARGETED_MOOK], [ZRoute.NORMAL, ZRoute.REVERSE], 300, 2, 2),
        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-300}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK], [recRoute.NORMAL, recRoute.REVERSE], 300, 2, 2),
        {type: Script_Type.WAIT, options: {wait_time: -1}},


        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-300}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.TARGETED_MOOK], [ZRoute.NORMAL, DiamondRoute.NORMAL, recRoute.REVERSE, ZRoute.REVERSE, DiamondRoute.REVERSE], 300, 2, 5),
        {type: Script_Type.WAIT, options: {wait_time: -1}},

        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-300}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.TARGETED_MOOK], [ZRoute.NORMAL, DiamondRoute.NORMAL, recRoute.REVERSE, ZRoute.REVERSE, DiamondRoute.REVERSE], 300, 2, 5),
        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-300}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK], [recRoute.NORMAL], 300, 2, 10),

        // {type: Script_Type.WAIT, options: {wait_time: -1}},
        // {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-300}},
        // ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK], [DiamondRoute.NORMAL, DiamondRoute.REVERSE], 300, 2, 2),
        // {type: Script_Type.WAIT, options: {wait_time: -1}},
        // ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK, AllEnemyKeys.COMMON_MOOK, AllEnemyKeys.TARGETED_MOOK, AllEnemyKeys.TARGETED_MOOK], [diagonalRoute.NORMAL, diagonalRoute.REVERSE], 300, 2, 10),
        // {type: Script_Type.WAIT, options: {wait_time: -1}},
        // ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK, AllEnemyKeys.COMMON_MOOK, AllEnemyKeys.TARGETED_MOOK, AllEnemyKeys.TARGETED_MOOK], [TriangleRoute.NORMAL, TriangleRoute.REVERSE], 300, 2, 10),
        // {type: Script_Type.WAIT, options: {wait_time: -1}},
        // ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK, AllEnemyKeys.TARGETED_MOOK, AllEnemyKeys.SHIELDED_MOOK], [VtypeRoute.NORMAL, VtypeRoute.REVERSE], 300, 2, 10),
        {type: Script_Type.WAIT, options: {wait_time: -1}},
        {type: Script_Type.LEVEL_ENDS, options: {endtype: LevelEndConst.LEVEL_CLEARED}}

    ],
    RANDOMSPAWN: [
        RandomHoarderScript
    ]
}