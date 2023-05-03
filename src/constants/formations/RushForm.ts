import { GAMEPLAY_DIMENTIONS } from "../dimenstions"

const regularRushRoute = [
    {x: 80, y: 80, speed: 400, thresh: 300,repeat:500},
    {x: 400, y: 700, speed: 400, thresh: 300, wait:0},
    {x: 900, y: 80, speed: 200, thresh: 300, wait:300},
    {x: 400, y: 700, speed: 400, thresh: 300, wait:0},
    {x: 80, y: 80, speed: 500, thresh: 300,repeat: 1},
    {x: 80, y: 80, speed: 1, thresh: 300,repeat: 300},
    // {x: 400, y: 700, speed: 400, tresh: 300, wait:0},
    // {x: 800, y: 50, speed: 400, tresh: 300, wait:0},
    // {x: 50, y: 50, speed: 500, repeat:300},
    // {x: 400, y: 700, speed: 400, tresh: 300, wait:0},
    // {x: 800, y: 50, speed: 400, tresh: 300, wait:0},
    // {x: 225, y: 250, speed: 200, repeat:5, wait:0},
    // {x: 275, y: 225, speed: 200, repeat:5, wait:0},
    // {x: 300, y: 175, speed: 200, repeat:5, wait:0},
    // {x: 350, y: 150, speed: 200, repeat:5, wait:0},
    // // {x: 375, y: 125, speed: 200, repeat:5, wait:0},
    // {x: 400, y: 100, speed: 200, repeat:5, wait:0},
    // {x: 650, y: 300, speed: 200, repeat:5, wait:0},
    // {x: 400, y: 600, speed: 200, repeat:5, wait:0},
    // {x: 0, y: 500, speed: 200, repeat:5, wait:0},
    // {x: 800, y: 500, speed: 200, repeat:5, wait:0},
    // {x: 200, y: 300, speed: 200, repeat:5, wait:0},
]

const reverseRushRoute = regularRushRoute.map((node)=>{
    let clone = JSON.parse(JSON.stringify(node))
    let half = GAMEPLAY_DIMENTIONS.XEND/2
    clone.x = ((clone.x-half)*-1)+half
    return clone
})

export const RushRoute = {
    NORMAL: regularRushRoute,
    REVERSE: reverseRushRoute,
}