import { LoadEnemy } from "../load";
import { PhysicGroups } from "../physics";
import { STATS } from "./enemieStats";

export const AllEnemyKeys = {
    COMMON_MOOK: "COMMON_MOOK",
    TARGETED_MOOK: "TARGETED_MOOK",
    SHIELDED_MOOK: "SHIELDED_MOOK"
}

export const AllEnemyData = {
    COMMON_MOOK:{
        KEY: AllEnemyKeys.COMMON_MOOK,
        STATS:STATS.COMMON_MOOK,
        LOAD:[LoadEnemy.COMMON_MOOK],
        PHYSICS: PhysicGroups.ENEMY
    },
    TARGETED_MOOK:{
        KEY: AllEnemyKeys.TARGETED_MOOK,
        STATS:STATS.TARGETED_MOOK,
        LOAD: [LoadEnemy.TARGETED_MOOK],
        PHYSICS: PhysicGroups.ENEMY
    },
    SHIELDED_MOOK:{
        KEY: AllEnemyKeys.SHIELDED_MOOK,
        STATS:STATS.SHIELDED_MOOK,
        LOAD: [LoadEnemy.SHIELDED_MOOK, LoadEnemy.SHIELD],
        PHYSICS: PhysicGroups.ENEMY
    }
}