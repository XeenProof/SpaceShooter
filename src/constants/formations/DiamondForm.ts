
// {
//     x: number,
//     y: number,
//     repeat?: number,
//     speed?: number,
//     thresh?: number
// }

import { GAMEPLAY_DIMENTIONS } from "../dimenstions"

const regularDiamondRoute = [
    {x: 0, y: 0, speed: 200},
    {x: 75, y: 75, speed: 200, repeat:5, wait:0},
    {x: 150, y: 150, speed: 200, repeat:5, wait:0},
    {x: 225, y: 225, speed: 200, repeat:5, wait:0},
    {x: 300, y: 300, speed: 200, repeat:5, wait:0},
    {x: 375, y: 375, speed: 200, repeat:5, wait:0},
    {x: 400, y: 400, speed: 200, repeat:5, wait:0},
    {x: 425, y: 425, speed: 200, repeat:5, wait:0},
    {x: 435, y: 435, speed: 200, repeat:5, wait:0},
    {x: 440, y: 445, speed: 200, repeat:5, wait:0},
    {x: 445, y: 450, speed: 200, repeat:5, wait:0},
    {x: 450, y: 445, speed: 200, repeat:5, wait:0},
    {x: 455, y: 440, speed: 200, repeat:5, wait:0},
    {x: 460, y: 435, speed: 200, repeat:5, wait:0},
    {x: 465, y: 430, speed: 200, repeat:5, wait:0},
    {x: 475, y: 425, speed: 200, repeat:5, wait:0},
    {x: 500, y: 400, speed: 200, repeat:5, wait:0},
    {x: 525, y: 375, speed: 200, repeat:5, wait:0},
    {x: 600, y: 300, speed: 200, repeat:5, wait:0},
    {x: 675, y: 225, speed: 200, repeat:5, wait:0},
    {x: 750, y: 150, speed: 200, repeat:5, wait:0},
    {x: 825, y: 75, speed: 200, repeat:5, wait:0},
]

const reverseDiamondRoute = regularDiamondRoute.map((node)=>{
    let clone = JSON.parse(JSON.stringify(node))
    let half = GAMEPLAY_DIMENTIONS.XEND/2
    clone.x = ((clone.x-half)*-1)+half
    clone.y = 500 - clone.y
    return clone
})

export const DiamondRoute = {
    NORMAL: regularDiamondRoute,
    REVERSE: reverseDiamondRoute
}