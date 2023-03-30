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
    UNDERWATER: {KEY: "UNDERWATER", TYPE: LoadType.IMAGE, PATH: "hw2_assets/sprites/WavyBlueLines.png"},
    SPACE: {KEY: "SPACE", TYPE: LoadType.IMAGE, PATH: "assets/sprites/space_5.png"},

    SUBMARINE: {KEY: "SUBMARINE", TYPE: LoadType.SPRITESHEET, PATH: "hw2_assets/spritesheets/AYellowBarrelWithWindows.json"},

    MINE: {KEY: "MINE", TYPE: LoadType.SPRITESHEET, PATH: "hw2_assets/spritesheets/SpikyMineThing.json"},
    PLACEHOLDER: {KEY: "PLACEHOLDER", TYPE: LoadType.SPRITESHEET, PATH: "demo_assets/spritesheets/platformer/player.json"}
    

}

export const LoadBackground = {
    UNDERWATER: {...Loads.UNDERWATER, SCALE:{X:0.75, Y:0.75}},
    SPACE: {...Loads.SPACE, SCALE:{X:0.75, Y:0.75}}
} as const

export const LoadPlayer = {
    PLAYER: {...Loads.SUBMARINE, SCALE:{X:0.4, Y:0.4}}
} as const

export const LoadEnemy = {
    MINE: {...Loads.MINE, SCALE:{X:0.3, Y:0.3}},
    COMMON_MOOK: {...Loads.PLACEHOLDER, SCALE:{X:10, Y:10}}
}

export const LoadProjectiles = {
    BEAM: {...Loads.PLACEHOLDER, SCALE: {X:1, Y:1}},
}

export const LoadEnemyProjectile = {
    ENEMY_BEAM: {...Loads.PLACEHOLDER, SCALE: {X:1, Y:1}}
}