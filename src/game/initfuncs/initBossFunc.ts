import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB"
import Vec2 from "../../Wolfie2D/DataTypes/Vec2"
import FactoryManager from "../../Wolfie2D/Scene/Factories/FactoryManager"
import { AllEnemyData } from "../../constants/enemies/enemyData"
import { Layers } from "../../constants/layers"
import { PhysicGroups } from "../../constants/physics"
import HealthbarHUD from "../../utils/HUD/HealthbarHUD"
import MegaMookActor from "../actors/BossActors/MegaMookActor"
import MegaMookBehavior from "../ai/bossAI/MegaMook/MegaMookBehavior"
import ActorScene from "../scenes/GameplayScenes/ActorScene"


export const initBossFunc = {
    MEGAMOOK: initMegaMookFunc
}

function initMegaMookFunc(add: FactoryManager, scene: ActorScene):MegaMookActor{
    let info = AllEnemyData.MEGAMOOK
    let {X, Y} = info.LOAD[0].SCALE
    let entity = add.animatedSprite(MegaMookActor, info.LOAD[0].KEY, Layers.PRIMARY)
    let healthBar = new HealthbarHUD(scene, entity, Layers.HEALTHBARS, {size: new Vec2(entity.size.x, 5), offset: entity.size.clone().scaled(0, -1/2)})
    entity.position.set(1200,1200)
    entity.healthBar = healthBar;
    entity.setScene(scene)
    entity.visible = false;
    entity.scale.set(X, Y);
    entity.addAI(MegaMookBehavior)
    let center = entity.position.clone()
    let halfSize = entity.boundary.getHalfSize().clone().scale(0.9,0.6);
    entity.addPhysics(new AABB(center, halfSize));
    entity.setGroup(PhysicGroups.ENEMY);
    return entity;
}