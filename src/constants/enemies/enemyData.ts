import { LoadAudio, LoadEnemy } from "../load";
import { PhysicGroups } from "../physics";
import { STATS } from "./enemieStats";

const basicAudioList = [LoadAudio.ENEMY_TAKINGDAMAGE, LoadAudio.ENEMY_DEAD]
const attackingAudioList = [...basicAudioList, LoadAudio.ENEMY_ATTACK]

export const AllEnemyKeys = {
    COMMON_MOOK: "COMMON_MOOK",
    TARGETED_MOOK: "TARGETED_MOOK",
    SHIELDED_MOOK: "SHIELDED_MOOK",
    PERSON_MOOK: "PERSON_MOOK",
    HOARDER: "HOARDER",
    MEGAMOOK: "MEGAMOOK",
    SUMMONER: "SUMMONER",
    LEVEL1MOOK: "LEVEL1MOOK",
    LEVEL3MOOK: "LEVEL3MOOK",
    STAR: "STAR",
    LEVEL5MOOK: "LEVEL5MOOK"
}

export const AllEnemyData = {
    COMMON_MOOK:{
        KEY: AllEnemyKeys.COMMON_MOOK,
        STATS:STATS.COMMON_MOOK,
        LOAD:[LoadEnemy.COMMON_MOOK],
        AUDIO:attackingAudioList,
        PHYSICS: PhysicGroups.ENEMY
    },
    STAR:{
        KEY: AllEnemyKeys.STAR,
        STATS:STATS.STAR,
        LOAD:[LoadEnemy.STAR],
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
    },
    LEVEL5MOOK:{
        KEY: AllEnemyKeys.LEVEL5MOOK,
        STATS: STATS.LEVEL5MOOK,
        LOAD: [LoadEnemy.SUMMONER],
        AUDIO: attackingAudioList,
        PHYSICS: PhysicGroups.ENEMY
    },
    PERSON_MOOK:{
        KEY: AllEnemyKeys.PERSON_MOOK,
        STATS: STATS.PERSON_MOOK,
        LOAD: [LoadEnemy.PERSON_MOOK],
        AUDIO: attackingAudioList,
        PHYSICS: PhysicGroups.ENEMY
    },
    LEVEL1MOOK:{
        KEY: AllEnemyKeys.LEVEL1MOOK,
        STATS: STATS.LEVEL1MOOK,
        LOAD: [LoadEnemy.LEVEL1MOOK],
        AUDIO: attackingAudioList,
        PHYSICS: PhysicGroups.ENEMY
    },
    LEVEL3MOOK:{
        KEY: AllEnemyKeys.LEVEL3MOOK,
        STATS: STATS.LEVEL3MOOK,
        LOAD: [LoadEnemy.LEVEL3MOOK],
        AUDIO: attackingAudioList,
        PHYSICS: PhysicGroups.ENEMY
    },
}