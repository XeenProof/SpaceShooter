
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
    hp: 50,
    droprate: 1,
    speed: 500,
    points: 50
}
const LEVEL1MOOK = {
    hp: 300,
    droprate: 1,
    speed: 300,
    attack: 5,
    points: 100
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
const PERSON_MOOK ={
    hp: 10,
    droprate: 0.15,
    speed: 150,
    attack: 1,
    points: 15
}

const LEVEL3MOOK ={
    hp: 500,
    droprate: 1,
    speed: 150,
    attack: 5,
    points: 100
}

const STAR ={
    hp: 40,
    droprate: 0.5,
    speed: 400,
    points: 50,
    attack: 5,
}

const LEVEL5MOOK = {
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
    SUMMONER: SUMMONER,
    LEVEL1MOOK:LEVEL1MOOK,
    LEVEL3MOOK:LEVEL3MOOK,
    PERSON_MOOK:PERSON_MOOK,
    STAR:STAR,
    LEVEL5MOOK:LEVEL5MOOK,
}