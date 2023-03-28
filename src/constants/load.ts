export const LoadType = {
    IMAGE: "IMAGE",
    SPRITESHEET: "SPRITESHEET",
    AUDIO: "AUDIO"
} as const

export interface LoadData{
    KEY: string,
    TYPE: string,
    PATH: string,
    SCALE: {X:number, Y:number}
}

export const LoadBackground = {
    UNDERWATER: {KEY: "UNDERWATER", TYPE: LoadType.IMAGE, PATH: "hw2_assets/sprites/WavyBlueLines.png", SCALE:{X:0.75, Y:0.75}},
    SPACE: {KEY: "SPACE", TYPE: LoadType.IMAGE, PATH: "assets/sprites/space_5.png", SCALE:{X:0.75, Y:0.75}}
} as const

export const LoadPlayer = {
    PLAYER: {KEY: "PLAYER", TYPE: LoadType.SPRITESHEET, PATH: "hw2_assets/spritesheets/AYellowBarrelWithWindows.json", SCALE:{X:0.4, Y:0.4}}
} as const

export const LoadEnemy = {
    MINE: {KEY: "MINE", TYPE: LoadType.SPRITESHEET, PATH: "hw2_assets/spritesheets/SpikyMineThing.json", SCALE:{X:0.3, Y:0.3}},
    COMMON_MOOK: {KEY: "COMMON_MOOK", TYPE: LoadType.SPRITESHEET, PATH: "demo_assets/spritesheets/platformer/player.json", SCALE:{X:10, Y:10}}
}

export const LoadProjectiles = {
    BEAM: {KEY: "BEAM", TYPE: LoadType.SPRITESHEET, PATH: "demo_assets/spritesheets/platformer/player.json", SCALE: {X:1, Y:1}},
}

export const LoadEnemyProjectile = {
    ENEMY_BEAM: {KEY: "ENEMY_BEAM", TYPE: LoadType.SPRITESHEET, PATH: "demo_assets/spritesheets/platformer/player.json", SCALE: {X:1, Y:1}}
}