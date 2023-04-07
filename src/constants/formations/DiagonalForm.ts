
// {
//     x: number,
//     y: number,
//     repeat?: number,
//     speed?: number,
//     thresh?: number
// }

import { GAMEPLAY_DIMENTIONS } from "../dimenstions"

const regularDiagonalRoute = [
    {x: 0, y: 100, speed: 200},
    {x: 250, y: 200, speed: 200, repeat:5, wait:0},
    {x: 500, y: 300, speed: 200, repeat:5, wait:0},
    {x: 800, y: 450, speed: 200, repeat:5, wait:0},
    {x: 500, y: 300, speed: 200, repeat:5, wait:0},
    {x: 250, y: 200, speed: 200, repeat:5, wait:0},
    {x: 0, y: 100, speed: 200, repeat:5, wait:0},
]

const reverseDiagonalRoute = regularDiagonalRoute.map((node)=>{
    let clone = JSON.parse(JSON.stringify(node))
    let half = GAMEPLAY_DIMENTIONS.XEND/2
    clone.x = ((clone.x-half)*-1)+half
    return clone
})

export const diagonalRoute = {
    NORMAL: regularDiagonalRoute,
    REVERSE: reverseDiagonalRoute
}