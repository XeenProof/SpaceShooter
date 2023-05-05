import { GAMEPLAY_DIMENTIONS } from "../dimenstions"

const regularRushRoute = [
    {x: 120, y: 80, speed: 400,repeat:200},
    {x: 400, y: 700, speed: 400, wait:0},
    {x: 900, y: 80, speed: 200, wait:0},
    {x: 400, y: 700, speed: 400, wait:0},
    {x: 120, y: 80, speed: 500,repeat: 1},
    {x: 120, y: 80, speed: 1,repeat: 10},
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