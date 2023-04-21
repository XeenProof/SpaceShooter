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
    SPACE: {KEY: "SPACE", TYPE: LoadType.IMAGE, PATH: "assets/sprites/space_5.png", SCALE:{X:1, Y:1}},

    SCRAP: {KEY: "SCRAP", TYPE: LoadType.IMAGE, PATH: "assets/sprites/scrap.png", SCALE:{X:1, Y:1}},

    PLANE: {KEY: "PLANE", TYPE: LoadType.SPRITESHEET, PATH: "assets/spritesheets/Plane/Plane.json", SCALE:{X:1, Y:1}},
    FLAME: {KEY: "FLAME", TYPE: LoadType.SPRITESHEET, PATH: "assets/spritesheets/flame/flame.json", SCALE: {X:1, Y:1}},
    SHIELD: {KEY: "SHIELD", TYPE: LoadType.IMAGE, PATH: "assets/sprites/purple_shield.png", SCALE:{X:1, Y:1}},
    PLANE_BEAM: {KEY: "PLANE_BEAM", TYPE: LoadType.SPRITESHEET, PATH: "assets/spritesheets/Plane_Beam/Plane_Beam.json", SCALE:{X:1, Y:1}},
    
    ENEMY_1: {KEY: "ENEMY_1", TYPE: LoadType.SPRITESHEET, PATH: "assets/spritesheets/Enemy_First/Enemy_First.json", SCALE:{X:1, Y:1}},
    ENEMY_2: {KEY: "ENEMY_2", TYPE: LoadType.SPRITESHEET, PATH: "assets/spritesheets/Enemy_Second/Enemy_Second.json", SCALE:{X:1, Y:1}},
    ENEMY_3: {KEY: "ENEMY_3", TYPE: LoadType.SPRITESHEET, PATH: "assets/spritesheets/Enemy_Third/Enemy_Third.json", SCALE:{X:1, Y:1}},
    ENEMY_4: {KEY: "ENEMY_4", TYPE: LoadType.SPRITESHEET, PATH: "assets/spritesheets/Enemy_Fouth/Enemy_Fouth.json", SCALE:{X:1, Y:1}},
    ENEMY_5: {KEY: "ENEMY_5", TYPE: LoadType.SPRITESHEET, PATH: "assets/spritesheets/Enemy_Fifth/Enemy_Fifth.json", SCALE:{X:1, Y:1}},
    SPACE_THIEF: {KEY: "SPACE_THIEF", TYPE: LoadType.SPRITESHEET, PATH: "assets/spritesheets/Space_Thief/Space_Thief.json", SCALE:{X:1, Y:1}},

    ENEMY1_BEAM: {KEY: "ENEMY1_BEAM", TYPE: LoadType.SPRITESHEET, PATH: "assets/spritesheets/Enemy1_Beam/Enemy1_Beam.json", SCALE:{X:1, Y:1}},
    ENEMY2_BEAM: {KEY: "ENEMY2_BEAM", TYPE: LoadType.SPRITESHEET, PATH: "assets/spritesheets/Enemy2_Beam/Enemy2_Beam.json", SCALE:{X:1, Y:1}},


    WELCOME: {KEY: "WELCOME", TYPE: LoadType.IMAGE, PATH: "assets/sprites/welcome.png", SCALE:{X:1, Y:1}},

    MAINMENU: {KEY: "MAINMENU", TYPE: LoadType.IMAGE, PATH: "assets/sprites/space_blur.png", SCALE:{X:1, Y:1}},
    TEST: {KEY: "APPLE", TYPE: LoadType.IMAGE, PATH: "assets/sprites/welcome.png", SCALE:{X:1, Y:1}},
    
    /**Loading Music Test down here */
    SPACE_MUSIC: {KEY: "SPACE", TYPE:LoadType.AUDIO, PATH: "assets/music/spaceMusic.mp3"},
}

export const LoadBackground = {
    SPACE: {...Loads.SPACE, SCALE:{X:0.75, Y:0.75}}
} as const

export const LoadItem = {
    SCRAP: {...Loads.SCRAP, SCALE:{X:1.5, Y:1.5}}
}

export const LoadWelcome = {
    WELCOME: {...Loads.WELCOME, SCALE:{X:1, Y:1}}
} as const

export const LoadAPPLE = {
    APPLE: {...Loads.TEST, SCALE:{X:1, Y:1}}
} as const

export const LoadMainmenu = {
    MAINMENU: {...Loads.MAINMENU, SCALE:{X:0.70, Y:0.70}}
} as const

export const LoadPlayer = {
    PLAYER: {...Loads.PLANE, SCALE:{X:1.5, Y:1.5}},
    FLAMES: {...Loads.FLAME, SCALE:{X:1.5, Y:1.5}},
    SHIELD: {...Loads.SHIELD, SCALE:{X:1.5, Y:1.5}}
} as const

export const LoadEnemy = {
    COMMON_MOOK: {...Loads.ENEMY_1, SCALE:{X:1, Y:1}},
    TARGETED_MOOK: {...Loads.ENEMY_2},
    SHIELDED_MOOK: {...Loads.ENEMY_3},
    SHIELD: {...Loads.SHIELD, SCALE:{X:1.5, Y:1.5}},
    HOARDER: {...Loads.SPACE_THIEF},
    MEGAMOOK: {...Loads.ENEMY_1, SCALE:{X:3, Y:3}}
}

export const LoadProjectiles = {
    BEAM: {...Loads.PLANE_BEAM, SCALE: {X:1, Y:1}},
    TARGETED_BEAM: {...Loads.ENEMY2_BEAM}
}

export const LoadEnemyProjectile = {
    ENEMY_BEAM: {...Loads.ENEMY1_BEAM, SCALE: {X:1, Y:1}}
}

export const LoadMusic = {
    SPACE_MUSIC: {...Loads.SPACE_MUSIC}
}