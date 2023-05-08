import GameEvent from "./GameEvent";


export function CollisionDetectionFilter(id:number):(event:GameEvent) => boolean {
    return (event:GameEvent) => {return event.data.get("node") == id || event.data.get("other") == id}
}