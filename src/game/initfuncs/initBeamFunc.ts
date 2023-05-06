import Vec2 from "../../Wolfie2D/DataTypes/Vec2"
import FactoryManager from "../../Wolfie2D/Scene/Factories/FactoryManager"
import { Events } from "../../constants/events"
import { Layers } from "../../constants/layers"
import { PhysicGroups } from "../../constants/physics"
import { AllProjectileData } from "../../constants/projectiles/projectileData"
import BeamActor from "../actors/WeaponActors/BeamActor"
import ActorScene from "../scenes/GameplayScenes/ActorScene"
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite"
import { AllItemData } from "../../constants/items/itemData"
import ScrapBehavior from "../ai/ScrapBehavior"
import BasicWeaponAI from "../ai/weaponAI/BasicWeaponAI"
import HomingWeaponAI from "../ai/weaponAI/HomingWeaponAI"
import { initEnemyFunc } from "./initEnemyFuncs"

const inactivePos = new Vec2(1200, 1200)

export const initBeamFuncs = {
    BEAM: initBeamFunc,
    TARGETED_BEAM: initTargetedBeamFunc,
}


function initBeamFunc(add: FactoryManager, scene:ActorScene):BeamActor{
    let info = AllProjectileData.BEAM
    let entity = add.animatedSprite(BeamActor, info.LOAD[0].KEY, Layers.PRIMARY)
    entity.position.set(1200,1200)
    entity.damage_key = info.KEY
    entity.setScene(scene)
    entity.visible = false;
    entity.addAI(BasicWeaponAI, {src: inactivePos, speed: info.SPEED})
    entity.addPhysics();
    entity.disablePhysics()
    entity.setGroup(PhysicGroups.PLAYER_WEAPON)
    entity.setTrigger(PhysicGroups.ENEMY, Events.WEAPON_ENEMY_COLLISION, null)
    return entity;
}

function initTargetedBeamFunc(add: FactoryManager, scene:ActorScene):BeamActor{
    let info = AllProjectileData.TARGETED_BEAM
    let entity = add.animatedSprite(BeamActor, info.LOAD[0].KEY, Layers.PRIMARY)
    entity.position.set(1200, 1200)
    entity.damage_key = info.KEY
    entity.setScene(scene)
    entity.visible = false;
    entity.addAI(HomingWeaponAI, {src: inactivePos, speed: info.SPEED})
    entity.addPhysics();
    entity.disablePhysics()
    entity.setGroup(PhysicGroups.PLAYER_WEAPON)
    entity.setTrigger(PhysicGroups.ENEMY, Events.WEAPON_ENEMY_COLLISION, null)
    return entity
}