import { LoadItem } from "../load"
import { PhysicGroups } from "../physics"


export const AllItemKey = {
    SCRAP: "SCRAP"
}

export const AllItemData = {
    SCRAP:{
        KEY: AllItemKey.SCRAP,
        LOAD:[LoadItem.SCRAP],
        PHYSICS: PhysicGroups.DROPS
    }
}