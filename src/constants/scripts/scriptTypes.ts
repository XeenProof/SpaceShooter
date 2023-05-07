export interface scriptFormat{
    type: string,
    options: Record<string, any>,
    repeat?: number
    chance?: number
}

export const Script_Type = {
    PLAY_SOUND:"PLAY_SOUND",
    /**
     * options: {
     * type?: the type of sound to play (GameEventType.PLAY_MUSIC, GameEventType.PLAY_SOUND, GameEventType.PLAY_SFX)
     * index: the index of the audio in the AUDIO list
     * loop?: whether to infinitely loop or not
     * holdReference?: boolean
     * }
     */
    LEVEL_ENDS:"LEVEL_ENDS",
    /**
     * options: {endtype: the way the level ends}
     */
    SPAWN: "SPAWN",
    /**
     * options: {
     * enemyType: The type of enemy to spawn
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
     * reward: reward number
     * mods: {//holds the stat modifiers on enemies
     *  hp_multi: 1,
		droprate_multi: 1,
        enemydamage_multi: 1,
        points_multi: 1
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