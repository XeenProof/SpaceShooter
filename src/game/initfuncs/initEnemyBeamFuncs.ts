import Vec2 from "../../Wolfie2D/DataTypes/Vec2"
import FactoryManager from "../../Wolfie2D/Scene/Factories/FactoryManager"
import { Events } from "../../constants/events"
import { Layers } from "../../constants/layers"
import { PhysicGroups } from "../../constants/physics"
import { AllProjectileData } from "../../constants/projectiles/projectileData"
import BeamActor from "../actors/WeaponActors/BeamActor"
import ActorScene from "../scenes/GameplayScenes/ActorScene"
import BasicWeaponAI from "../ai/weaponAI/BasicWeaponAI"

const inactivePos = new Vec2(1200, 1200)

export const initEnemyBeamFuncs = {
    ENEMY_BEAM_GREEN: initEnemyBeamGreenFunc,
    ENEMY_BEAM_PURPLE: initEnemyBeamPurpleFunc,
    ENEMY_BEAM_BLUE: initEnemyBeamBlueFunc,
    ENEMY_BEAM_CYAN: initEnemyBeamCyanFunc,
    ENEMY_BEAM_ORANGE: initEnemyBeamOrangeFunc,
    LEVEL3_BOSS_BEAM: initLevel3BOSSBeamFunc,
    LEVEL3_BOSS_LARGEBEAM: initLevel3BOSSLargeBeamFunc,
}

function initEnemyBeamGreenFunc(add: FactoryManager, scene:ActorScene):BeamActor{
    let info = AllProjectileData.ENEMY_BEAM_GREEN
    let entity = add.animatedSprite(BeamActor, info.LOAD[0].KEY, Layers.PRIMARY)
    entity.position.set(1200,1200)
    entity.damage_key = info.KEY
    entity.setScene(scene)
    entity.visible = false;
    entity.addAI(BasicWeaponAI, {src: inactivePos, dir: Vec2.DOWN, speed: info.SPEED})
    entity.addPhysics()
    entity.disablePhysics()
    entity.setGroup(PhysicGroups.ENEMY_WEAPON)
    entity.setTrigger(PhysicGroups.PLAYER, Events.WEAPON_PLAYER_COLLISION, null)
    return entity;
}

function initEnemyBeamBlueFunc(add: FactoryManager, scene:ActorScene):BeamActor{
    let info = AllProjectileData.ENEMY_BEAM_BLUE
    let entity = add.animatedSprite(BeamActor, info.LOAD[0].KEY, Layers.PRIMARY)
    entity.position.set(1200,1200)
    entity.damage_key = info.KEY
    entity.setScene(scene)
    entity.visible = false;
    entity.addAI(BasicWeaponAI, {src: inactivePos, dir: Vec2.DOWN, speed: info.SPEED})
    entity.addPhysics()
    entity.disablePhysics()
    entity.setGroup(PhysicGroups.ENEMY_WEAPON)
    entity.setTrigger(PhysicGroups.PLAYER, Events.WEAPON_PLAYER_COLLISION, null)
    return entity;
}

function initEnemyBeamPurpleFunc(add: FactoryManager, scene:ActorScene):BeamActor{
    let info = AllProjectileData.ENEMY_BEAM_PURPLE
    let entity = add.animatedSprite(BeamActor, info.LOAD[0].KEY, Layers.PRIMARY)
    entity.position.set(1200,1200)
    entity.damage_key = info.KEY
    entity.setScene(scene)
    entity.visible = false;
    entity.addAI(BasicWeaponAI, {src: inactivePos, dir: Vec2.DOWN, speed: info.SPEED})
    entity.addPhysics()
    entity.disablePhysics()
    entity.setGroup(PhysicGroups.ENEMY_WEAPON)
    entity.setTrigger(PhysicGroups.PLAYER, Events.WEAPON_PLAYER_COLLISION, null)
    return entity;
}

function initEnemyBeamOrangeFunc(add: FactoryManager, scene:ActorScene):BeamActor{
    let info = AllProjectileData.ENEMY_BEAM_ORANGE
    let entity = add.animatedSprite(BeamActor, info.LOAD[0].KEY, Layers.PRIMARY)
    entity.position.set(1200,1200)
    entity.damage_key = info.KEY
    entity.setScene(scene)
    entity.visible = false;
    entity.addAI(BasicWeaponAI, {src: inactivePos, dir: Vec2.DOWN, speed: info.SPEED})
    entity.addPhysics()
    entity.disablePhysics()
    entity.setGroup(PhysicGroups.ENEMY_WEAPON)
    entity.setTrigger(PhysicGroups.PLAYER, Events.WEAPON_PLAYER_COLLISION, null)
    return entity;
}

function initEnemyBeamCyanFunc(add: FactoryManager, scene:ActorScene):BeamActor{
    let info = AllProjectileData.ENEMY_BEAM_CYAN
    let entity = add.animatedSprite(BeamActor, info.LOAD[0].KEY, Layers.PRIMARY)
    entity.position.set(1200,1200)
    entity.damage_key = info.KEY
    entity.setScene(scene)
    entity.visible = false;
    entity.addAI(BasicWeaponAI, {src: inactivePos, dir: Vec2.DOWN, speed: info.SPEED})
    entity.addPhysics()
    entity.disablePhysics()
    entity.setGroup(PhysicGroups.ENEMY_WEAPON)
    entity.setTrigger(PhysicGroups.PLAYER, Events.WEAPON_PLAYER_COLLISION, null)
    return entity;
}

function initLevel3BOSSBeamFunc(add: FactoryManager, scene:ActorScene):BeamActor{
    let info = AllProjectileData.LEVEL3_BOSS_BEAM
    let entity = add.animatedSprite(BeamActor, info.LOAD[0].KEY, Layers.PRIMARY)
    let {X, Y} = info.LOAD[0].SCALE
    entity.position.set(1200,1200)
    entity.damage_key = info.KEY
    entity.scale.set(X, Y);
    entity.setScene(scene)
    entity.visible = false;
    entity.addAI(BasicWeaponAI, {src: inactivePos, dir: Vec2.DOWN, speed: info.SPEED})
    entity.addPhysics()
    entity.disablePhysics()
    entity.setGroup(PhysicGroups.ENEMY_WEAPON)
    entity.setTrigger(PhysicGroups.PLAYER, Events.WEAPON_PLAYER_COLLISION, null)
    return entity;
}

function initLevel3BOSSLargeBeamFunc(add: FactoryManager, scene:ActorScene):BeamActor{
    let info = AllProjectileData.LEVEL3_BOSS_LARGEBEAM
    let entity = add.animatedSprite(BeamActor, info.LOAD[0].KEY, Layers.PRIMARY)
    let {X, Y} = info.LOAD[0].SCALE
    entity.position.set(1200,1200)
    entity.damage_key = info.KEY
    entity.scale.set(X, Y);
    entity.setScene(scene)
    entity.visible = false;
    entity.addAI(BasicWeaponAI, {src: inactivePos, dir: Vec2.DOWN, speed: info.SPEED})
    entity.addPhysics()
    entity.disablePhysics()
    entity.setGroup(PhysicGroups.ENEMY_WEAPON)
    entity.setTrigger(PhysicGroups.PLAYER, Events.WEAPON_PLAYER_COLLISION, null)
    return entity;
}