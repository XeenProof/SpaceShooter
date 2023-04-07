import { LoadProjectiles } from "../load";
import { LoadEnemyProjectile } from "../load";
import { PhysicGroups } from "../physics";

export const PlayerProjectileKeys = {
    BEAM:"BEAM",
}

export const EnemyProjectileKeys = {
    ENEMY_BEAM: "ENEMY_BEAM"
}

export const AllProjectileKeys = {
    ...PlayerProjectileKeys,
    ...EnemyProjectileKeys
}

export const AllProjectileData = {
    BEAM:{
        KEY: AllProjectileKeys.BEAM,
        DAMAGE: 2,
        SPEED: 500,
        LOAD:[LoadProjectiles.BEAM],
        PHYSICS: PhysicGroups.PLAYER_WEAPON
    },
    ENEMY_BEAM:{
        KEY: AllProjectileKeys.ENEMY_BEAM,
        DAMAGE: 2,
        SPEED: 500,
        LOAD:[LoadEnemyProjectile.ENEMY_BEAM],
        PHYSICS: PhysicGroups.ENEMY_WEAPON
    }
}