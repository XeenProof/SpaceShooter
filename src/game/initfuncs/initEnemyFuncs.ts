import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB"
import Vec2 from "../../Wolfie2D/DataTypes/Vec2"
import FactoryManager from "../../Wolfie2D/Scene/Factories/FactoryManager"
import { AllEnemyData } from "../../constants/enemies/enemyData"
import { Layers } from "../../constants/layers"
import { PhysicGroups } from "../../constants/physics"
import MookActor from "../actors/EnemyActors/MookActor"
import TargetedMookActor from "../actors/EnemyActors/TargetedMookActor"
import MookBehavior from "../ai/enemyAI/MookBehavior"
import TargetedMookBehavior from "../ai/enemyAI/TargetedMookBehavior"
import ActorScene from "../scenes/GameplayScenes/ActorScene"
import HealthbarHUD from "../../utils/HUD/HealthbarHUD"
import ShieldMookActor from "../actors/EnemyActors/ShieldMookActor"
import ShieldMookBehavior from "../ai/enemyAI/ShieldedMookBehavior"
import HPShield from "../actors/miscActors/HPShield"
import Color from "../../Wolfie2D/Utils/Color"
import HoarderActor from "../actors/EnemyActors/HoarderActor"
import HoarderBehavior from "../ai/enemyAI/HoarderBehavior"


export const initEnemyFunc = {
    COMMON_MOOK: initCommomMookFunc,
    TARGETED_MOOK: initTargetedMookFunc,
    SHIELDED_MOOK: initShieldedMookFunc,
    HOARDER: initHoarderFunc,
    PERSON_MOOK: initPersonMookFunc,
}

function initCommomMookFunc(add: FactoryManager, scene: ActorScene):MookActor{
    let info = AllEnemyData.COMMON_MOOK
    let AUDIO = info.AUDIO?info.AUDIO:[]
    let audioKeys = AUDIO.map((x)=>{return x.KEY})
    let {X, Y} = info.LOAD[0].SCALE
    let entity = add.animatedSprite(MookActor, info.LOAD[0].KEY, Layers.PRIMARY)
    let healthBar = new HealthbarHUD(scene, entity, Layers.HEALTHBARS, {size: new Vec2(entity.size.x, 5), offset: entity.size.clone().scaled(0, -1/2)})
    entity.position.set(1200,1200)
    entity.healthBar = healthBar;
    entity.setScene(scene)
    entity.visible = false;
    entity.scale.set(X, Y);
    entity.addAI(MookBehavior)
    entity.audioKeys = audioKeys
    let center = entity.position.clone()
    let halfSize = entity.boundary.getHalfSize().clone().scale(0.9,0.6);
    entity.addPhysics(new AABB(center, halfSize));
    entity.setGroup(PhysicGroups.ENEMY);
    return entity;
}

function initTargetedMookFunc(add: FactoryManager, scene: ActorScene):TargetedMookActor{
    let info = AllEnemyData.TARGETED_MOOK
    let AUDIO = info.AUDIO?info.AUDIO:[]
    let audioKeys = AUDIO.map((x)=>{return x.KEY})
    let {X, Y} = info.LOAD[0].SCALE
    let entity = add.animatedSprite(TargetedMookActor, info.LOAD[0].KEY, Layers.PRIMARY)
    let healthBar = new HealthbarHUD(scene, entity, Layers.HEALTHBARS, {size: new Vec2(entity.size.x, 5), offset: entity.size.clone().scaled(0, -1/2)})
    entity.position.set(1200,1200)
    entity.healthBar = healthBar;
    entity.setScene(scene)
    entity.visible = false;
    entity.scale.set(X, Y);
    entity.addAI(TargetedMookBehavior)
    entity.audioKeys = audioKeys
    let center = entity.position.clone()
    let halfSize = entity.boundary.getHalfSize().clone();
    entity.addPhysics(new AABB(center, halfSize));
    entity.setGroup(PhysicGroups.ENEMY);
    return entity;
}

function initShieldedMookFunc(add: FactoryManager, scene: ActorScene):ShieldMookActor{
    let info = AllEnemyData.SHIELDED_MOOK
    let AUDIO = info.AUDIO?info.AUDIO:[]
    let audioKeys = AUDIO.map((x)=>{return x.KEY})
    let {X, Y} = info.LOAD[0].SCALE
    let entity = add.animatedSprite(ShieldMookActor, info.LOAD[0].KEY,Layers.PRIMARY)
    let hbsize = new Vec2(entity.size.x, 5)
    let hbOffset = entity.size.clone().scaled(0, -1/2)
    let healthBar =  new HealthbarHUD(scene, entity, Layers.HEALTHBARS, {size: hbsize.clone(), offset: hbOffset.clone()})
    entity.healthBar = healthBar
    entity.setScene(scene)
    entity.visible = false
    entity.scale.set(X, Y);
    entity.position.set(1200,1200)

    let shieldSprite = add.sprite(info.LOAD[1].KEY, Layers.PRIMARY)
    shieldSprite.scale.set(info.LOAD[1].SCALE.X, info.LOAD[1].SCALE.Y);
    let shield = new HPShield(shieldSprite, entity)
    let shieldBar = new HealthbarHUD(scene, shield, Layers.HEALTHBARS, {size: hbsize.clone(), offset: hbOffset.clone().sub(new Vec2(0, -5)), color: Color.BLUE})
    shield.shieldBar = shieldBar
    shield.visible = false
    entity.shield = shield

    entity.addAI(ShieldMookBehavior)
    entity.audioKeys = audioKeys
    let center = entity.position.clone()
    let halfSize = entity.boundary.getHalfSize().clone();
    entity.addPhysics(new AABB(center, halfSize));
    entity.setGroup(PhysicGroups.ENEMY);
    return entity
}

function initHoarderFunc(add: FactoryManager, scene: ActorScene):MookActor{
    let info = AllEnemyData.HOARDER
    let AUDIO = info.AUDIO?info.AUDIO:[]
    let audioKeys = AUDIO.map((x)=>{return x.KEY})
    let {X, Y} = info.LOAD[0].SCALE
    let entity = add.animatedSprite(HoarderActor, info.LOAD[0].KEY, Layers.PRIMARY)
    let healthBar = new HealthbarHUD(scene, entity, Layers.HEALTHBARS, {size: new Vec2(entity.size.x, 5), offset: entity.size.clone().scaled(0, -1/2)})
    entity.position.set(1200,1200)
    entity.healthBar = healthBar;
    entity.setScene(scene)
    entity.visible = false;
    entity.scale.set(X, Y);
    entity.addAI(HoarderBehavior)
    entity.audioKeys = audioKeys
    let center = entity.position.clone()
    let halfSize = entity.boundary.getHalfSize().clone().scale(0.9,0.6);
    entity.addPhysics(new AABB(center, halfSize));
    entity.setGroup(PhysicGroups.ENEMY);
    return entity;
}

function initPersonMookFunc(add: FactoryManager, scene: ActorScene):MookActor {
    let info = AllEnemyData.PERSON_MOOK
    let AUDIO = info.AUDIO?info.AUDIO:[]
    let audioKeys = AUDIO.map((x)=>{return x.KEY})
    let {X, Y} = info.LOAD[0].SCALE
    let entity = add.animatedSprite(MookActor, info.LOAD[0].KEY, Layers.PRIMARY)
    let healthBar = new HealthbarHUD(scene, entity, Layers.HEALTHBARS, {size: new Vec2(entity.size.x, 5), offset: entity.size.clone().scaled(0, -1/2)})
    entity.position.set(1200,1200)
    entity.healthBar = healthBar;
    entity.setScene(scene)
    entity.visible = false;
    entity.scale.set(X, Y);
    entity.addAI(MookBehavior)
    entity.audioKeys = audioKeys
    let center = entity.position.clone()
    let halfSize = entity.boundary.getHalfSize().clone().scale(0.9,0.6);
    entity.addPhysics(new AABB(center, halfSize));
    entity.setGroup(PhysicGroups.ENEMY);
    return entity;
}
