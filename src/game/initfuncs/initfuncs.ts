import FactoryManager from "../../Wolfie2D/Scene/Factories/FactoryManager"
import { Events } from "../../constants/events"
import { Layers } from "../../constants/layers"
import { PhysicGroups } from "../../constants/physics"
import ActorScene from "../scenes/GameplayScenes/ActorScene"
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite"
import { AllItemData } from "../../constants/items/itemData"
import ScrapBehavior from "../ai/ScrapBehavior"
import { initEnemyFunc } from "./initEnemyFuncs"
import { initBeamFuncs } from "./initBeamFunc"
import { initEnemyBeamFuncs } from "./initEnemyBeamFuncs"
import { initBossFunc } from "./initBossFunc"

export const initfuncs = {
    ...initEnemyFunc,
    ...initBeamFuncs,
    ...initEnemyBeamFuncs,
    ...initBossFunc,
    SCRAP: initScrapFunc,
}


function initScrapFunc(add: FactoryManager, scene: ActorScene):Sprite{
    let info = AllItemData.SCRAP
    let {X, Y} = info.LOAD[0].SCALE
    let item = add.sprite(info.LOAD[0].KEY, Layers.PRIMARY)
    item.scale.set(X,Y)
    item.position.set(1200,1200)
    item.addAI(ScrapBehavior, {speed: scene.TravelSpeed})
    item.addPhysics();
    item.disablePhysics()
    item.setScene(scene)
    item.setGroup(PhysicGroups.DROPS)
    item.setTrigger(PhysicGroups.PLAYER, Events.PLAYER_SCRAP_COLLISION, null)
    item.visible = false;
    return item;
}