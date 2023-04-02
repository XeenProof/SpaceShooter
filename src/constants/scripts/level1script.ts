import { AllEnemyKeys } from "../enemies/enemyData";
import { recRoute } from "../formations/RectangleForm";
import { LoadBackground } from "../load";
import { AllPlayerData } from "../player/playerData";
import { AllProjectileKeys } from "../projectiles/projectileData";
import { generateRoundRobinScriptPart } from "./scriptGenerator";

export const level1 = {
    NAME: "Level 1",
    LOAD: {
        BACKGROUND: LoadBackground.SPACE,
        PLAYER: AllPlayerData.PLAYER_V1.LOAD,
        OTHERS: [
            {KEY: AllProjectileKeys.ENEMY_BEAM, AMMOUNT: 20},
            {KEY: AllProjectileKeys.BEAM, AMMOUNT: 20},

            {KEY: AllEnemyKeys.COMMON_MOOK, AMMOUNT: 20}
        ]
    },
    SCRIPT: [
        ...generateRoundRobinScriptPart([AllEnemyKeys.COMMON_MOOK], [recRoute.NORMAL, recRoute.REVERSE], 100, 2, 10)
    ]
}