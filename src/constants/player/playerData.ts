import { LoadPlayer } from "../load"
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
            FLAMES: LoadPlayer.FLAMES
        },
        PHYSICS: PhysicGroups.PLAYER
    }
}