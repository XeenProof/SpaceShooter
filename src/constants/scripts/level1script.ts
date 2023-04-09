import { AllEnemyKeys, AllEnemyData} from "../enemies/enemyData";

import { recRoute } from "../formations/RectangleForm";
import { diagonalRoute } from "../formations/DiagonalForm";
import { TriangleRoute } from "../formations/TriangleForm";
import { VtypeRoute } from "../formations/VtypeForm";
import { DiamondRoute } from "../formations/DiamondForm";

import { LoadBackground} from "../load";
import { AllPlayerData } from "../player/playerData";
import { AllProjectileKeys, AllProjectileData} from "../projectiles/projectileData";
import { generateRoundRobinScriptPart } from "./scriptGenerator";
import { Script_Type } from "./scriptTypes";
import { AllItemData } from "../items/itemData";

export const level1 = {
    NAME: "Level 1",
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
        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-300}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK, AllEnemyKeys.COMMON_MOOK], [recRoute.NORMAL, recRoute.REVERSE], 300, 2, 10),
        {type: Script_Type.WAIT, options: {wait_time: -1}},
        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-450}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK, AllEnemyKeys.COMMON_MOOK], [DiamondRoute.NORMAL, DiamondRoute.REVERSE], 300, 2, 10),
        {type: Script_Type.WAIT, options: {wait_time: -1}},
        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-450}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK, AllEnemyKeys.COMMON_MOOK, AllEnemyKeys.TARGETED_MOOK, AllEnemyKeys.TARGETED_MOOK], [diagonalRoute.NORMAL, diagonalRoute.REVERSE], 300, 2, 10)

    ]
}