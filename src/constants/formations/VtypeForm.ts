
// {
//     x: number,
//     y: number,
//     repeat?: number,
//     speed?: number,
//     thresh?: number
// }

import { GAMEPLAY_DIMENTIONS } from "../dimenstions"

const regularVtypeRoute = [
    {x: 0, y: 200, speed: 200},
    {x: 150, y: 400, speed: 200, repeat:5, wait:0},
    {x: 300, y: 200, speed: 200, repeat:5, wait:0},
    {x: 450, y: 400, speed: 200, repeat:5, wait:0},
    {x: 600, y: 200, speed: 200, repeat:5, wait:0},
    {x: 750, y: 400, speed: 200, repeat:5, wait:0},
    {x: 850, y: 200, speed: 200, repeat:5, wait:0},
]

const reverseVtypeRoute = regularVtypeRoute.map((node)=>{
    let clone = JSON.parse(JSON.stringify(node))
    let half = GAMEPLAY_DIMENTIONS.XEND/2
    clone.x = ((clone.x-half)*-1)+half
    if(clone.y == 200){
        clone.y = 400
    }else{
        clone.y = 200
    }
    return clone
})

export const VtypeRoute = {
    NORMAL: regularVtypeRoute,
    REVERSE: reverseVtypeRoute
}