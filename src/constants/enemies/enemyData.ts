import { LoadAudio, LoadEnemy } from "../load";
import { PhysicGroups } from "../physics";
import { STATS } from "./enemieStats";

const basicAudioList = [LoadAudio.ENEMY_TAKINGDAMAGE, LoadAudio.ENEMY_DEAD]
const attackingAudioList = [...basicAudioList, LoadAudio.ENEMY_ATTACK]

export const AllEnemyKeys = {
    COMMON_MOOK: "COMMON_MOOK",
    TARGETED_MOOK: "TARGETED_MOOK",
    SHIELDED_MOOK: "SHIELDED_MOOK",
    HOARDER: "HOARDER",
    MEGAMOOK: "MEGAMOOK",
    SUMMONER: "SUMMONER"
}

export const AllEnemyData = {
    COMMON_MOOK:{
        KEY: AllEnemyKeys.COMMON_MOOK,
        STATS:STATS.COMMON_MOOK,
        LOAD:[LoadEnemy.COMMON_MOOK],
        AUDIO:attackingAudioList,
        PHYSICS: PhysicGroups.ENEMY
    },
    TARGETED_MOOK:{
        KEY: AllEnemyKeys.TARGETED_MOOK,
        STATS:STATS.TARGETED_MOOK,
        LOAD: [LoadEnemy.TARGETED_MOOK],
        AUDIO:attackingAudioList,
        PHYSICS: PhysicGroups.ENEMY
    },
    SHIELDED_MOOK:{
        KEY: AllEnemyKeys.SHIELDED_MOOK,
        STATS:STATS.SHIELDED_MOOK,
        LOAD: [LoadEnemy.SHIELDED_MOOK, LoadEnemy.SHIELD],
        AUDIO: basicAudioList,
        PHYSICS: PhysicGroups.ENEMY
    },
    HOARDER:{
        KEY: AllEnemyKeys.HOARDER,
        STATS: STATS.HOARDER,
        LOAD: [LoadEnemy.HOARDER],
        AUDIO: basicAudioList,
        PHYSICS: PhysicGroups.ENEMY
    },
    MEGAMOOK:{
        KEY: AllEnemyKeys.MEGAMOOK,
        STATS: STATS.MEGAMOOK,
        LOAD: [LoadEnemy.MEGAMOOK],
        AUDIO: attackingAudioList,
        PHYSICS: PhysicGroups.ENEMY
    },
    SUMMONER:{
        KEY: AllEnemyKeys.SUMMONER,
        STATS: STATS.SUMMONER,
        LOAD: [LoadEnemy.SUMMONER],
        AUDIO: attackingAudioList,
        PHYSICS: PhysicGroups.ENEMY
    }
}