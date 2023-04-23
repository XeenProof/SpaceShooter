
const COMMON_MOOK = {
    hp: 10,
    droprate: 0.15,
    speed: 100,
    attack: 1,
    points: 10
}

const TARGETED_MOOK = {
    hp: 10,
    droprate: 0.15,
    speed: 100,
    attack: 1,
    points: 15
}

const SHIELDED_MOOK = {
    hp: 10,
    droprate: 0.15,
    shieldhp: 5,
    speed: 100,
    attack: 1,
    points: 15
}
const HOARDER = {
    hp: 100,
    droprate: 1,
    speed: 500,
    points: 50
}
const MEGAMOOK = {
    hp:300,
    droprate: 1,
    speed: 300,
    points: 100
}
const SUMMONER = {
    hp: 500,
    droprate: 1,
    speed: 150,
    points: 100
}

export const STATS = {
    COMMON_MOOK: COMMON_MOOK,
    TARGETED_MOOK: TARGETED_MOOK,
    SHIELDED_MOOK: SHIELDED_MOOK,
    HOARDER: HOARDER,
    MEGAMOOK: MEGAMOOK,
    SUMMONER: SUMMONER
}