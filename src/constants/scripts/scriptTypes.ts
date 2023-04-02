export interface scriptFormat{
    type: string,
    options: Record<string, any>
}

export const Script_Type = {
    SPAWN: "SPAWN",
    /**
     * options: {
     * enemy type: The type of enemy to spawn
     * path: The path the enemy is following
     * }
     */
    WAIT: "WAIT",
    /**
     * options: {
     * wait_time: number
     * }
     */
    WAVE: "WAVE",
    /**
     * options: {wavenum: wave number}
     */
    UPDATE_TRAVEL_SPEED: "UPDATE_TRAVEL_SPEED"
    /**
     * options: {bg_speed: the rate that the background moves}
     */
}