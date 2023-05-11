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
            AUDIO: [LoadAudio.PLAYER_ATTACK, LoadAudio.PLAYER_TAKINGDAMAGE, LoadAudio.PLAYER_DEAD, LoadAudio.PICK_ITEM],
            UPGRADES: [LoadPlayer.UPGRADE_HEALTH, LoadPlayer.UPGRADE_DAMAGE]
        },
        PHYSICS: PhysicGroups.PLAYER
    }
}