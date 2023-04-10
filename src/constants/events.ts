export const Events = {
    TRAVEL_SPEED_CHANGE: "TRAVEL_SPEED_CHANGE",
    /**{
     * speed: the travel speed
    * }*/

    ENEMY_SHOOTS: "ENEMY_SHOOTS", 
    /**{
     * src: source the shot is coming from
     * dir: direction the shot is going
     * id: id of shooter
     * key: the type of bullet shot
     * } */
    PLAYER_SHOOTS:"PLAYER_SHOOTS",
    /**{
     * src: source of the shot
     * dir: direction of the shot
     * id: id  of the shooter
     * key: Type of bullet shot
     * } */
    DROP_SCRAP:"DROP_SCRAP",
    /**
     * {
     * src: source of where the enemy died
     * }
     */
    HEALTH: "HEALTH",
	UPGRADE_HEALTH: "UPGRADE_HEALTH",
	UPGRADE_WEAPON: "UPGRADE_WEAPON",

    /**Set Trigger Calls */
    PLAYER_ENEMY_COLLISION: "PLAYER_ENEMY_COLLISION",
    /**
     * node: target id
     * other: self id
     */
    WEAPON_ENEMY_COLLISION: "WEAPON_ENEMY_COLLISION",
    /**
     * node: target id
     * other: self id
     */
    WEAPON_PLAYER_COLLISION: "WEAPON_PLAYER_COLLISION",
    /**
     * node: target id
     * other: self id
     */
    PLAYER_SCRAP_COLLISION: "PLAYER_SCRAP_COLLISION",
    /**
     * node: target id
     * other: self id
     */

    /**Cheat code events*/
    NUKE: "NUKE"
}