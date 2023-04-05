import { AllEnemyKeys, AllEnemyData} from "../enemies/enemyData";
import { recRoute } from "../formations/RectangleForm";
import { LoadBackground } from "../load";
import { AllPlayerData } from "../player/playerData";
import { AllProjectileKeys, AllProjectileData} from "../projectiles/projectileData";
import { generateRoundRobinScriptPart } from "./scriptGenerator";
import { Script_Type } from "./scriptTypes";

export const level1 = {
    NAME: "Level 1",
    LOAD: {
        BACKGROUND: LoadBackground.SPACE,
        PLAYER: AllPlayerData.PLAYER_V1.LOAD,
        OTHERS: [
            {DATA: AllProjectileData.ENEMY_BEAM, AMMOUNT: 20},
            {DATA: AllProjectileData.BEAM, AMMOUNT: 20},

            {DATA: AllEnemyData.COMMON_MOOK, AMMOUNT: 20},
            {DATA: AllEnemyData.TARGETED_MOOK, AMMOUNT: 20}
        ]
    },
    SCRIPT: [
        {type: Script_Type.UPDATE_TRAVEL_SPEED, options: {X:0, Y:-300}},
        ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK, AllEnemyKeys.TARGETED_MOOK], [recRoute.NORMAL, recRoute.REVERSE], 300, 2, 10),
    ]
}