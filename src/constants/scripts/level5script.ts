import { AllEnemyKeys, AllEnemyData} from "../enemies/enemyData";

import { recRoute } from "../formations/RectangleForm";
import { RushRoute } from "../formations/RushForm";
import { diagonalRoute } from "../formations/DiagonalForm";
import { TriangleRoute } from "../formations/TriangleForm";
import { VtypeRoute } from "../formations/VtypeForm";
import { DiamondRoute } from "../formations/DiamondForm";

import { LoadBackground, LoadMusic} from "../load";
import { AllPlayerData } from "../player/playerData";
import { AllProjectileKeys, AllProjectileData} from "../projectiles/projectileData";
import { generateRoundRobinScriptPart } from "./scriptGenerator";
import { Script_Type } from "./scriptTypes";
import { AllItemData } from "../items/itemData";
import { LevelEndConst } from "../events";
import { spawnRandomizer } from "../../utils/Pathing/CreatePaths";
import { ZRoute } from "../formations/ZForm";

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
    chance: 0.001,
    repeat: 0.001,
}

export const level5 = {
    NAME: "Level 5",
    KEY: "LEVEL5",
    UNLOCK_CONDITION: ["LEVEL4"],
    LOAD: {
        BACKGROUND: LoadBackground.SPACE,
        PLAYER: AllPlayerData.PLAYER_V1.LOAD,
        OTHERS: [
            {DATA: AllProjectileData.ENEMY_BEAM_GREEN, AMMOUNT: 20},
            {DATA: AllProjectileData.ENEMY_BEAM_PURPLE, AMMOUNT: 20},
            {DATA: AllProjectileData.ENEMY_BEAM_BLUE, AMMOUNT: 20},
            {DATA: AllProjectileData.ENEMY_BEAM_CYAN, AMMOUNT: 20},

            {DATA: AllProjectileData.BEAM, AMMOUNT: 200},
            {DATA: AllProjectileData.TARGETED_BEAM, AMMOUNT: 20},

            {DATA: AllEnemyData.COMMON_MOOK, AMMOUNT: 20},
            {DATA: AllEnemyData.TARGETED_MOOK, AMMOUNT: 20},
            {DATA: AllEnemyData.SHIELDED_MOOK, AMMOUNT: 20},
            {DATA: AllEnemyData.HOARDER, AMMOUNT: 20},
            {DATA: AllEnemyData.STAR, AMMOUNT: 20},
            {DATA: AllEnemyData.PERSON_MOOK, AMMOUNT: 20},

            {DATA: AllEnemyData.MEGAMOOK, AMMOUND: 1},

            {DATA: AllItemData.SCRAP, AMMOUNT: 20},
            {DATA: AllEnemyData.LEVEL5MOOK, AMMOUND: 1},
        ]
    },
    AUDIOLIST: [LoadMusic.SPACE_MUSIC],
    SCRIPT: [
        {type: Script_Type.PLAY_SOUND, options: {index: 0}},

        {type: Script_Type.WAVE, options: {wavenum: 1, mods:{droprate_multi: 1}}},
        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-300}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.STAR], [RushRoute.NORMAL], 300, 2, 1),
        ...generateRoundRobinScriptPart([AllEnemyKeys.SHIELDED_MOOK,AllEnemyKeys.SHIELDED_MOOK], [recRoute.NORMAL,recRoute.REVERSE], 300, 2, 2),
        ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK,AllEnemyKeys.COMMON_MOOK, AllEnemyKeys.COMMON_MOOK], [DiamondRoute.NORMAL,DiamondRoute.REVERSE], 300, 2, 2),
        {type: Script_Type.WAIT, options: {wait_time: -1}},

        {type: Script_Type.WAVE, options: {wavenum: 2, mods:{droprate_multi: 1}}},
        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-300}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.STAR], [RushRoute.REVERSE], 300, 2, 1),
        ...generateRoundRobinScriptPart([AllEnemyKeys.SHIELDED_MOOK,AllEnemyKeys.SHIELDED_MOOK,AllEnemyKeys.SHIELDED_MOOK], [recRoute.NORMAL,recRoute.REVERSE], 300, 2, 3),
        ...generateRoundRobinScriptPart([AllEnemyKeys.TARGETED_MOOK,AllEnemyKeys.TARGETED_MOOK,AllEnemyKeys.TARGETED_MOOK,AllEnemyKeys.TARGETED_MOOK], [TriangleRoute.NORMAL,TriangleRoute.REVERSE,TriangleRoute.NORMAL,TriangleRoute.REVERSE], 300, 2, 4),
        {type: Script_Type.WAIT, options: {wait_time: -1}},

        {type: Script_Type.WAVE, options: {wavenum: 3, mods:{droprate_multi: 1}}},
        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-400}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.STAR], [RushRoute.NORMAL], 300, 2, 1),
        ...generateRoundRobinScriptPart([AllEnemyKeys.STAR], [RushRoute.REVERSE], 300, 2, 1),
        ...generateRoundRobinScriptPart([AllEnemyKeys.SHIELDED_MOOK,AllEnemyKeys.SHIELDED_MOOK,AllEnemyKeys.SHIELDED_MOOK], [ZRoute.NORMAL,ZRoute.REVERSE], 300, 2, 3),
        ...generateRoundRobinScriptPart([AllEnemyKeys.PERSON_MOOK,AllEnemyKeys.PERSON_MOOK,AllEnemyKeys.PERSON_MOOK,AllEnemyKeys.PERSON_MOOK], [diagonalRoute.NORMAL,diagonalRoute.NORMAL,diagonalRoute.REVERSE,,diagonalRoute.REVERSE], 300, 2, 4),
        {type: Script_Type.WAIT, options: {wait_time: -1}},

        {type: Script_Type.WAVE, options: {wavenum: 4, mods:{droprate_multi: 1}}},
        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-400}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.STAR], [RushRoute.NORMAL], 300, 2, 1),
        ...generateRoundRobinScriptPart([AllEnemyKeys.STAR], [RushRoute.REVERSE], 300, 2, 1),
        ...generateRoundRobinScriptPart([AllEnemyKeys.SHIELDED_MOOK,AllEnemyKeys.SHIELDED_MOOK,AllEnemyKeys.SHIELDED_MOOK,AllEnemyKeys.SHIELDED_MOOK], [ZRoute.NORMAL,ZRoute.REVERSE], 300, 2, 4),
        ...generateRoundRobinScriptPart([AllEnemyKeys.PERSON_MOOK,AllEnemyKeys.PERSON_MOOK,AllEnemyKeys.PERSON_MOOK,AllEnemyKeys.PERSON_MOOK], [diagonalRoute.NORMAL,diagonalRoute.NORMAL,diagonalRoute.REVERSE,,diagonalRoute.REVERSE], 300, 2, 4),
        {type: Script_Type.WAIT, options: {wait_time: -1}},

        {type: Script_Type.WAVE, options: {wavenum: 5, mods:{droprate_multi: 1}}},
        {type: Script_Type.SPAWN, options: {
            enemyType: AllEnemyKeys.LEVEL5MOOK,
            rpsl: [spawnRandomizer, {
                speed:{min: 150},
                thresh:{min:200},
                repeat:{min:-1},
                generateAmount: 20,
                y: {min: 0, max: 300}
            }]
        }},
        // {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-300}},
        // ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK, AllEnemyKeys.COMMON_MOOK], [DiamondRoute.NORMAL, DiamondRoute.REVERSE], 300, 2, 10),
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