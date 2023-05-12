import { LoadAudio, LoadPlayer } from "../load"
import { PhysicGroups } from "../physics"
import { PLAYER_STATS } from "./playerStats"


export const AllPlayerKeys = {
    PLAYER_V1: "PLAYER_V1"
}

export const AllPlayerData = {
    PLAYER_V1: {
        KEY: AllPlayerKeys.PLAYER_V1,
        STATS:PLAYER_STATS.PLAYER_V1,
        LOAD: {
            SHIP: LoadPlayer.PLAYER,
            SHIELD: LoadPlayer.SHIELD,
            FLAMES: LoadPlayer.FLAMES,
            AUDIO: [LoadAudio.PLAYER_ATTACK, //0
                LoadAudio.PLAYER_TAKINGDAMAGE, //1
                LoadAudio.PLAYER_DEAD, //2
                LoadAudio.PICK_ITEM, //3
                LoadAudio.HEAL, //4
                LoadAudio.UPGRADE_HEALTH, //5 
                LoadAudio.UPGRADE_WEAPON], //6
            UPGRADES: [LoadPlayer.UPGRADE_HEALTH, LoadPlayer.UPGRADE_DAMAGE]
        },
        PHYSICS: PhysicGroups.PLAYER
    }
}