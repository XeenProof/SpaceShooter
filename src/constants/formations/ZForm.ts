import { GAMEPLAY_DIMENTIONS } from "../dimenstions"

const regularZRoute = [
    {x: 0, y: 200, speed: 200},
    {x: 800, y: 200, speed: 200, repeat:5, wait:0},
    {x: 0, y: 500, speed: 200, repeat:5, wait:0},
    {x: 800, y: 500, speed: 200, repeat:5, wait:0},
    {x: 0, y: 200, speed: 200, repeat:5, wait:0},
]

const reverseZRoute = regularZRoute.map((node)=>{
    let clone = JSON.parse(JSON.stringify(node))
    let half = GAMEPLAY_DIMENTIONS.XEND/2
    clone.x = ((clone.x-half)*-1)+half
    return clone
})

export const ZRoute = {
    NORMAL: regularZRoute,
    REVERSE: reverseZRoute
}