import { LoadProjectiles } from "../load";
import { LoadEnemyProjectile } from "../load";
import { PhysicGroups } from "../physics";

export const PlayerProjectileKeys = {
    BEAM:"BEAM",
    TARGETED_BEAM:"TARGETED_BEAM"
}

export const EnemyProjectileKeys = {
    ENEMY_BEAM_GREEN: "ENEMY_BEAM_GREEN",
    ENEMY_BEAM_ORANGE: "ENEMY_BEAM_ORANGE"
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
    ENEMY_BEAM_ORANGE:{
        KEY: AllProjectileKeys.ENEMY_BEAM_ORANGE,
        DAMAGE: 2,
        SPEED: 500,
        LOAD:[LoadEnemyProjectile.ENEMY_BEAM_ORANGE],
        PHYSICS: PhysicGroups.ENEMY_WEAPON
    }
}