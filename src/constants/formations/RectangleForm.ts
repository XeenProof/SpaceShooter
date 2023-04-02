
// {
//     x: number,
//     y: number,
//     repeat?: number,
//     speed?: number,
//     thresh?: number
// }

import { GAMEPLAY_DIMENTIONS } from "../dimenstions"

const regularRecRoute = [
    {x: 100, y: -20, speed: 200},
    {x: 100, y: 100, speed: 200, repeat:5, wait:0},
    {x: 100, y: 450, speed: 200, repeat:5, wait:0},
    {x: 800, y: 450, speed: 200, repeat:5, wait:0},
    {x: 800, y: 100, speed: 200, repeat:5, wait:0},
]

const reverseRecRoute = regularRecRoute.map((node)=>{
    let clone = JSON.parse(JSON.stringify(node))
    let half = GAMEPLAY_DIMENTIONS.XEND/2
    clone.x = ((clone.x-half)*-1)+half
    return clone
})

export const recRoute = {
    NORMAL: regularRecRoute,
    REVERSE: reverseRecRoute
}