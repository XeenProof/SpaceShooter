import { LoadEnemy } from "../load";
import { PhysicGroups } from "../physics";
import { STATS } from "./enemieStats";

export const AllEnemyKeys = {
    COMMON_MOOK: "COMMON_MOOK"
}

export const AllEnemyData = {
    COMMON_MOOK:{
        KEY: AllEnemyKeys.COMMON_MOOK,
        STATS:STATS.COMMON_MOOK,
        LOAD:LoadEnemy.COMMON_MOOK,
        PHYSICS: PhysicGroups.ENEMY
    }
}