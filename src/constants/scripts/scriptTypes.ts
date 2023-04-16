export interface scriptFormat{
    type: string,
    options: Record<string, any>
}

export const Script_Type = {
    LEVEL_ENDS:"LEVEL_ENDS",
    /**
     * options: {endtype: the way the level ends}
     */
    SPAWN: "SPAWN",
    /**
     * options: {
     * enemy type: The type of enemy to spawn
     * rpsl: "Randomized Path Settings List" if path doesn't exist, generate a random one
     * rpsd: "Randomized Path Settings Default" if path doesn't exist, this is the default settings
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
     * options: {
     * wavenum: wave number
     * mods: {//holds the staat modifiers on enemies
     *  hp_multi: 1,
		droprate_multi: 1,
        enemydamage_multi: 1
     * }
     * }
     */
    UPDATE_TRAVEL_SPEED: "UPDATE_TRAVEL_SPEED"
    /**
     * options: {
     *  x: speed of x movement
     *  y: speed of y movement
     * }
     */
}