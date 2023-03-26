export const LoadType = {
    IMAGE: "IMAGE",
    SPRITESHEET: "SPRITESHEET",
    AUDIO: "AUDIO"
} as const

export interface LoadData{
    KEY: string,
    TYPE: string,
    PATH: string
}

export const LoadBackground = {
    UNDERWATER: {KEY: "UNDERWATER", TYPE: LoadType.IMAGE, PATH: "hw2_assets/sprites/WavyBlueLines.png"},
    SPACE: {KEY: "SPACE", TYPE: LoadType.IMAGE, PATH: "assets/sprites/space_5.png"}
} as const

export const LoadPlayer = {
    PLAYER: {KEY: "PLAYER", TYPE: LoadType.SPRITESHEET, PATH: "hw2_assets/spritesheets/AYellowBarrelWithWindows.json"}
} as const

export const LoadEnemy = {
    MINE: {KEY: "MINE", TYPE: LoadType.SPRITESHEET, PATH: "hw2_assets/spritesheets/SpikyMineThing.json"}
} as const