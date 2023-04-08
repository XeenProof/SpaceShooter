/**
 * An enum for the HW2 key-binding
 */
export const Controls = {
	MOVE_UP: "MOVE_UP",
	MOVE_DOWN: "MOVE_DOWN",
	MOVE_RIGHT: "MOVE_RIGHT",
	MOVE_LEFT: "MOVE_LEFT",
    SHOOT: "SHOOT",
    SHIELD: "SHIELD",
    BOOST: "BOOST",
    PAUSE: "PAUSE"
} as const;

export const Inputs = [
    {name:Controls.MOVE_UP, keys: ["w"] },
    {name:Controls.MOVE_DOWN, keys: ["s"] },
    {name:Controls.MOVE_RIGHT, keys: ["d"] },
    {name:Controls.MOVE_LEFT, keys: ["a"] },
    {name:Controls.SHOOT, keys: ["Space"] },
    {name:Controls.SHIELD, keys: ['e']},
    {name:Controls.BOOST, keys: ['r']},
    {name:Controls.PAUSE, keys: ['esc']}
]

export const cheats = {
    INVINSIBLE: "INVINSIBLE",
    OHKO: "OHKO"
}