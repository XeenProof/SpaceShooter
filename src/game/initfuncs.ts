import AABB from "../Wolfie2D/DataTypes/Shapes/AABB"
import Vec2 from "../Wolfie2D/DataTypes/Vec2"
import FactoryManager from "../Wolfie2D/Scene/Factories/FactoryManager"
import { AllEnemyData } from "../constants/enemies/enemyData"
import { Events } from "../constants/events"
import { Layers } from "../constants/layers"
import { PhysicGroups } from "../constants/physics"
import { AllProjectileData } from "../constants/projectiles/projectileData"
import BeamActor from "./actors/WeaponActors/BeamActor"
import MookActor from "./actors/EnemyActors/MookActor"
import TargetedMookActor from "./actors/EnemyActors/TargetedMookActor"
import MookBehavior from "./ai/enemyAI/MookBehavior"
import TargetedMookBehavior from "./ai/enemyAI/TargetedMookBehavior"
import BeamBehavior from "./ai/weaponAI/BeamBehavior"
import ActorScene from "./scenes/ActorScene"
import HealthbarHUD from "../utils/HUD/HealthbarHUD"

const inactivePos = new Vec2(1200, 1200)

export const initfuncs = {
    BEAM: initBeamFunc,
    ENEMY_BEAM: initEnemyBeamFunc,
    COMMON_MOOK: initCommomMookFunc,
    TARGETED_MOOK: initTargetedMookFunc
}

function initEnemyBeamFunc(add: FactoryManager, scene:ActorScene):BeamActor{
    let info = AllProjectileData.ENEMY_BEAM
    let entity = add.animatedSprite(BeamActor, info.LOAD.KEY, Layers.PRIMARY)
    entity.damage_key = info.KEY
    entity.setScene(scene)
    entity.visible = false;
    entity.addAI(BeamBehavior, {src: inactivePos, dir: Vec2.DOWN})
    entity.addPhysics();
    entity.setGroup(PhysicGroups.ENEMY_WEAPON)
    entity.setTrigger(PhysicGroups.PLAYER, Events.WEAPON_PLAYER_COLLISION, null)
    return entity;
}

function initBeamFunc(add: FactoryManager, scene:ActorScene):BeamActor{
    let info = AllProjectileData.BEAM
    let entity = add.animatedSprite(BeamActor, info.LOAD.KEY, Layers.PRIMARY)
    entity.damage_key = info.KEY
    entity.setScene(scene)
    entity.visible = false;
    entity.addAI(BeamBehavior, {src: inactivePos})
    entity.addPhysics();
    entity.setGroup(PhysicGroups.PLAYER_WEAPON)
    entity.setTrigger(PhysicGroups.ENEMY, Events.WEAPON_ENEMY_COLLISION, null)
    return entity;
}

function initCommomMookFunc(add: FactoryManager, scene: ActorScene):MookActor{
    let info = AllEnemyData.COMMON_MOOK
    let {X, Y} = info.LOAD.SCALE
    let entity = add.animatedSprite(MookActor, info.LOAD.KEY, Layers.PRIMARY)
    let healthBar = new HealthbarHUD(scene, entity, Layers.PRIMARY, {size: entity.size.clone().scaled(1, 5/entity.size.y), offset: entity.size.clone().scaled(0, -1/2)})
    entity.healthBar = healthBar;
    entity.setScene(scene)
    entity.visible = false;
    entity.scale.set(X, Y);
    entity.addAI(MookBehavior)
    let center = entity.position.clone()
    let halfSize = entity.boundary.getHalfSize().clone().scale(0.9,0.6);
    entity.addPhysics(new AABB(center, halfSize));
    entity.setGroup(PhysicGroups.ENEMY);
    return entity;
}

function initTargetedMookFunc(add: FactoryManager, scene: ActorScene):TargetedMookActor{
    let info = AllEnemyData.TARGETED_MOOK
    let {X, Y} = info.LOAD.SCALE
    let entity = add.animatedSprite(TargetedMookActor, info.LOAD.KEY, Layers.PRIMARY)
    let healthBar = new HealthbarHUD(scene, entity, Layers.PRIMARY, {size: entity.size.clone().scaled(1, 5/entity.size.y), offset: entity.size.clone().scaled(0, -1/2)})
    entity.healthBar = healthBar;
    entity.setScene(scene)
    entity.visible = false;
    entity.scale.set(X, Y);
    entity.addAI(TargetedMookBehavior)
    let center = entity.position.clone()
    let halfSize = entity.boundary.getHalfSize().clone();
    entity.addPhysics(new AABB(center, halfSize));
    entity.setGroup(PhysicGroups.ENEMY);
    return entity;
}