export const PhysicGroups = {
    PLAYER: "PLAYER",
    ENEMY: "ENEMY",
    PLAYER_WEAPON: "PLAYER_WEAPON",
    ENEMY_WEAPON: "ENEMY_WEAPON",
    DROPS: "DROPS"
}

export const Physics = {
    groupNames: [PhysicGroups.PLAYER, PhysicGroups.PLAYER_WEAPON, PhysicGroups.ENEMY, PhysicGroups.ENEMY_WEAPON, PhysicGroups.DROPS],
    collisions: [
        [0,0,1,0,0],
        [0,0,0,0,0],
        [1,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ]
}