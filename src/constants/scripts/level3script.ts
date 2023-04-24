import { AllEnemyKeys, AllEnemyData} from "../enemies/enemyData";

import { recRoute } from "../formations/RectangleForm";
import { diagonalRoute } from "../formations/DiagonalForm";
import { TriangleRoute } from "../formations/TriangleForm";
import { VtypeRoute } from "../formations/VtypeForm";
import { DiamondRoute } from "../formations/DiamondForm";
import { ZRoute } from "../formations/ZForm";

import { LoadBackground, LoadMusic} from "../load";
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
    repeat: 3,
}

export const level3 = {
    NAME: "Level 3",
    KEY: "LEVEL3",
    UNLOCK_CONDITION: ["LEVEL2"],
    LOAD: {
        BACKGROUND: LoadBackground.SPACE,
        PLAYER: AllPlayerData.PLAYER_V1.LOAD,
        OTHERS: [
            {DATA: AllProjectileData.ENEMY_BEAM_GREEN, AMMOUNT: 20},
            {DATA: AllProjectileData.ENEMY_BEAM_PURPLE, AMMOUNT: 20},
            {DATA: AllProjectileData.ENEMY_BEAM_BLUE, AMMOUNT: 20},
            {DATA: AllProjectileData.LEVEL3_BOSS_BEAM, AMMOUNT: 20},
            
            {DATA: AllProjectileData.BEAM, AMMOUNT: 200},
            {DATA: AllProjectileData.TARGETED_BEAM, AMMOUNT: 20},

            {DATA: AllEnemyData.COMMON_MOOK, AMMOUNT: 20},
            {DATA: AllEnemyData.TARGETED_MOOK, AMMOUNT: 20},
            {DATA: AllEnemyData.SHIELDED_MOOK, AMMOUNT: 20},
            {DATA: AllEnemyData.HOARDER, AMMOUNT: 20},

            {DATA: AllEnemyData.MEGAMOOK, AMMOUND: 1},
            {DATA: AllEnemyData.LEVEL3MOOK, AMMOUND: 1},

            {DATA: AllItemData.SCRAP, AMMOUNT: 20},
        ]
    },
    AUDIOLIST: [LoadMusic.SPACE_MUSIC],
    SCRIPT: [
        {type: Script_Type.PLAY_SOUND, options: {index: 0}},
        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-200}},

        {type: Script_Type.WAVE, options: {wavenum: 1, mods:{droprate_multi: 1}}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.SHIELDED_MOOK], [TriangleRoute.NORMAL,TriangleRoute.REVERSE], 1500, 2, 2),
        {type: Script_Type.WAIT, options: {wait_time: -1}},

        {type: Script_Type.WAVE, options: {wavenum: 2, mods:{droprate_multi: 1}}},
        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-200}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.SHIELDED_MOOK], [VtypeRoute.NORMAL, VtypeRoute.REVERSE], 500, 2, 2),
        ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK], [ZRoute.NORMAL, ZRoute.REVERSE], 500, 2, 2),
        {type: Script_Type.WAIT, options: {wait_time: -1}},

        {type: Script_Type.WAVE, options: {wavenum: 3, mods:{droprate_multi: 1}}},
        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-250}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.SHIELDED_MOOK], [recRoute.NORMAL, recRoute.REVERSE], 500, 2, 2),
        ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK], [ZRoute.NORMAL, ZRoute.REVERSE], 500, 2, 2),
        ...generateRoundRobinScriptPart([AllEnemyKeys.TARGETED_MOOK], [VtypeRoute.NORMAL, VtypeRoute.REVERSE], 500, 2, 2),
        {type: Script_Type.WAIT, options: {wait_time: -1}},

        {type: Script_Type.WAVE, options: {wavenum: 4, mods:{droprate_multi: 1}}},
        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-300}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.SHIELDED_MOOK], [recRoute.NORMAL, recRoute.REVERSE], 500, 2, 4),
        ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK], [diagonalRoute.NORMAL, diagonalRoute.REVERSE], 500, 2, 2),
        ...generateRoundRobinScriptPart([AllEnemyKeys.TARGETED_MOOK], [VtypeRoute.NORMAL, VtypeRoute.REVERSE], 500, 2, 2),
        {type: Script_Type.WAIT, options: {wait_time: -1}},

        {type: Script_Type.WAVE, options: {wavenum: 5, mods:{droprate_multi: 1}}},
        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-350}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.SHIELDED_MOOK], [recRoute.NORMAL, recRoute.REVERSE], 500, 2, 4),
        ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK], [diagonalRoute.NORMAL, diagonalRoute.REVERSE], 500, 2, 4),
        ...generateRoundRobinScriptPart([AllEnemyKeys.TARGETED_MOOK], [DiamondRoute.NORMAL, DiamondRoute.REVERSE], 500, 2, 2),
        {type: Script_Type.WAIT, options: {wait_time: -1}},

        {type: Script_Type.WAVE, options: {wavenum: 6, mods:{droprate_multi: 1}}},
        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-400}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.SHIELDED_MOOK], [recRoute.NORMAL, recRoute.REVERSE], 500, 2, 4),
        ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK], [DiamondRoute.NORMAL, DiamondRoute.REVERSE], 500, 2, 4),
        ...generateRoundRobinScriptPart([AllEnemyKeys.TARGETED_MOOK], [diagonalRoute.NORMAL, diagonalRoute.REVERSE], 500, 2, 4),
        {type: Script_Type.WAIT, options: {wait_time: -1}},

        {type: Script_Type.WAVE, options: {wavenum: 7, mods:{droprate_multi: 1}}},
        {type: Script_Type.SPAWN, options: {
            enemyType: AllEnemyKeys.LEVEL3MOOK,
            rpsl: [spawnRandomizer, {
                speed:{min: 300},
                repeat:{min:-1},
                generateAmount: 20
            }]
        }},
        {type: Script_Type.WAIT, options: {wait_time: -1}},

        {type: Script_Type.LEVEL_ENDS, options: {endtype: LevelEndConst.LEVEL_CLEARED}}

    ],
    RANDOMSPAWN: [
        RandomHoarderScript
    ]
}