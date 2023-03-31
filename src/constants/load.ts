export const LoadType = {
    IMAGE: "IMAGE",
    SPRITESHEET: "SPRITESHEET",
    AUDIO: "AUDIO"
} as const

export interface LoadData{
    KEY: string,
    TYPE: string,
    PATH: string,
    SCALE?: {X:number, Y:number}
}

const Loads = {
    UNDERWATER: {KEY: "UNDERWATER", TYPE: LoadType.IMAGE, PATH: "hw2_assets/sprites/WavyBlueLines.png", SCALE:{X:1, Y:1}},
    SPACE: {KEY: "SPACE", TYPE: LoadType.IMAGE, PATH: "assets/sprites/space_5.png", SCALE:{X:1, Y:1}},

    SUBMARINE: {KEY: "SUBMARINE", TYPE: LoadType.SPRITESHEET, PATH: "hw2_assets/spritesheets/AYellowBarrelWithWindows.json", SCALE:{X:1, Y:1}},

    MINE: {KEY: "MINE", TYPE: LoadType.SPRITESHEET, PATH: "hw2_assets/spritesheets/SpikyMineThing.json", SCALE:{X:1, Y:1}},
    PLACEHOLDER: {KEY: "PLACEHOLDER", TYPE: LoadType.SPRITESHEET, PATH: "demo_assets/spritesheets/platformer/player.json", SCALE:{X:1, Y:1}},

    PLANE: {KEY: "PLANE", TYPE: LoadType.SPRITESHEET, PATH: "assets/spritesheets/Plane/Plane.json", SCALE:{X:1, Y:1}},
    
    ENEMY_1: {KEY: "ENEMY_1", TYPE: LoadType.SPRITESHEET, PATH: "assets/spritesheets/Enemy_First/Enemy_First.json", SCALE:{X:1, Y:1}},
    ENEMY_2: {KEY: "ENEMY_2", TYPE: LoadType.SPRITESHEET, PATH: "assets/spritesheets/Enemy_Second/Enemy_Second.json", SCALE:{X:1, Y:1}},
    ENEMY_3: {KEY: "ENEMY_3", TYPE: LoadType.SPRITESHEET, PATH: "assets/spritesheets/Enemy_Third/Enemy_Third.json", SCALE:{X:1, Y:1}},
}

export const LoadBackground = {
    UNDERWATER: {...Loads.UNDERWATER, SCALE:{X:0.75, Y:0.75}},
    SPACE: {...Loads.SPACE, SCALE:{X:0.75, Y:0.75}}
} as const

export const LoadPlayer = {
    PLAYER: {...Loads.PLANE, SCALE:{X:1.5, Y:1.5}}
} as const

export const LoadEnemy = {
    MINE: {...Loads.MINE, SCALE:{X:0.3, Y:0.3}},
    COMMON_MOOK: {...Loads.ENEMY_1, SCALE:{X:1, Y:1}}
}

export const LoadProjectiles = {
    BEAM: {...Loads.PLACEHOLDER, SCALE: {X:1, Y:1}},
}

export const LoadEnemyProjectile = {
    ENEMY_BEAM: {...Loads.PLACEHOLDER, SCALE: {X:1, Y:1}}
}