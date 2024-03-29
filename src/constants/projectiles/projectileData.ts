import { LoadProjectiles } from "../load";
import { LoadEnemyProjectile } from "../load";
import { PhysicGroups } from "../physics";

export const PlayerProjectileKeys = {
    BEAM:"BEAM",
    TARGETED_BEAM:"TARGETED_BEAM"
}

export const EnemyProjectileKeys = {
    ENEMY_BEAM_GREEN: "ENEMY_BEAM_GREEN",
    ENEMY_BEAM_PURPLE:"ENEMY_BEAM_PURPLE",
    ENEMY_BEAM_BLUE: "ENEMY_BEAM_BLUE",
    ENEMY_BEAM_CYAN:"ENEMY_BEAM_CYAN",
    ENEMY_BEAM_ORANGE: "ENEMY_BEAM_ORANGE",
    LEVEL3_BOSS_BEAM: "LEVEL3_BOSS_BEAM",
    LEVEL3_BOSS_LARGEBEAM: "LEVEL3_BOSS_LARGEBEAM",
}

export const AllProjectileKeys = {
    ...PlayerProjectileKeys,
    ...EnemyProjectileKeys,
}

export const AllProjectileData = {
    BEAM:{
        KEY: AllProjectileKeys.BEAM,
        DAMAGE: 2,
        SPEED: 500,
        LOAD:[LoadProjectiles.BEAM],
        PHYSICS: PhysicGroups.PLAYER_WEAPON
    },
    TARGETED_BEAM:{
        KEY: AllProjectileKeys.TARGETED_BEAM,
        DAMAGE: 2,
        SPEED: 500,
        LOAD: [LoadProjectiles.TARGETED_BEAM],
        PHYSICS: PhysicGroups.PLAYER_WEAPON
    },
    ENEMY_BEAM_GREEN:{
        KEY: AllProjectileKeys.ENEMY_BEAM_GREEN,
        DAMAGE: 2,
        SPEED: 500,
        LOAD:[LoadEnemyProjectile.ENEMY_BEAM_GREEN],
        PHYSICS: PhysicGroups.ENEMY_WEAPON
    },
    ENEMY_BEAM_PURPLE:{
        KEY: AllProjectileKeys.ENEMY_BEAM_PURPLE,
        DAMAGE: 2,
        SPEED: 500,
        LOAD:[LoadEnemyProjectile.ENEMY_BEAM_PURPLE],
        PHYSICS: PhysicGroups.ENEMY_WEAPON
    },
    ENEMY_BEAM_BLUE:{
        KEY: AllProjectileKeys.ENEMY_BEAM_BLUE,
        DAMAGE: 2,
        SPEED: 500,
        LOAD:[LoadEnemyProjectile.ENEMY_BEAM_BLUE],
        PHYSICS: PhysicGroups.ENEMY_WEAPON
    },
    ENEMY_BEAM_CYAN:{
        KEY: AllProjectileKeys.ENEMY_BEAM_CYAN,
        DAMAGE: 2,
        SPEED: 500,
        LOAD:[LoadEnemyProjectile.ENEMY_BEAM_CYAN],
        PHYSICS: PhysicGroups.ENEMY_WEAPON
    },
    ENEMY_BEAM_ORANGE:{
        KEY: AllProjectileKeys.ENEMY_BEAM_ORANGE,
        DAMAGE: 2,
        SPEED: 500,
        LOAD:[LoadEnemyProjectile.ENEMY_BEAM_ORANGE],
        PHYSICS: PhysicGroups.ENEMY_WEAPON
    },
    LEVEL3_BOSS_BEAM:{
        KEY: AllProjectileKeys.LEVEL3_BOSS_BEAM,
        DAMAGE: 5,
        SPEED: 300,
        LOAD:[LoadEnemyProjectile.LEVEL3_BOSS_BEAM],
        PHYSICS: PhysicGroups.ENEMY_WEAPON
    },
    LEVEL3_BOSS_LARGEBEAM:{
        KEY: AllProjectileKeys.LEVEL3_BOSS_LARGEBEAM,
        DAMAGE: 10,
        SPEED: 150,
        LOAD:[LoadEnemyProjectile.LEVEL3_BOSS_LARGEBEAM],
        PHYSICS: PhysicGroups.ENEMY_WEAPON
    }

}