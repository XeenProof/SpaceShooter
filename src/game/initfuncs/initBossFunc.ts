import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB"
import Vec2 from "../../Wolfie2D/DataTypes/Vec2"
import FactoryManager from "../../Wolfie2D/Scene/Factories/FactoryManager"
import { AllEnemyData } from "../../constants/enemies/enemyData"
import { Layers } from "../../constants/layers"
import { PhysicGroups } from "../../constants/physics"
import HealthbarHUD from "../../utils/HUD/HealthbarHUD"
import MegaMookActor from "../actors/BossActors/MegaMookActor"
import SummonerActor from "../actors/BossActors/SummonerActor"
import MegaMookBehavior from "../ai/bossAI/MegaMook/MegaMookBehavior"
import SummonerBehavior from "../ai/bossAI/Summoner/SummonerBehavior"
import ActorScene from "../scenes/GameplayScenes/ActorScene"
import Level1MookActor from "../actors/BossActors/Level1MookActor"
import Level1MookBehavior from "../ai/bossAI/Level1Mook/Level1MookBehavior"
import Level3MookActor from "../actors/BossActors/Level3MookActor"
import Level3MookBehavior from "../ai/bossAI/Level3Mook/Level3MookBehavior"
import Level5MookActor from "../actors/BossActors/Level5MookActor"
import Level5MookBehavior from "../ai/bossAI/Level5Mook/Level5MookBehavior"
import Level6MookActor from "../actors/BossActors/Level6MookActor"
import Level6MookBehavior from "../ai/bossAI/Level6Mook/Level6MookBehavior"

export const initBossFunc = {
    MEGAMOOK: initMegaMookFunc,
    SUMMONER: initSummonerFunc,
    LEVEL1MOOK: initLevel1MookFunc,
    LEVEL3MOOK: initLevel3MookFunc,
    LEVEL5MOOK: initLevel5MookFunc,
    LEVEL6MOOK: initLevel6MookFunc,
}

function initMegaMookFunc(add: FactoryManager, scene: ActorScene):MegaMookActor{
    let info = AllEnemyData.MEGAMOOK
    let AUDIO = info.AUDIO?info.AUDIO:[]
    let audioKeys = AUDIO.map((x)=>{return x.KEY})
    let {X, Y} = info.LOAD[0].SCALE
    let entity = add.animatedSprite(MegaMookActor, info.LOAD[0].KEY, Layers.PRIMARY)
    let healthBar = new HealthbarHUD(scene, entity, Layers.HEALTHBARS, {size: new Vec2(entity.size.x, 5), offset: entity.size.clone().scaled(0, -1/2)})
    entity.position.set(1200,1200)
    entity.healthBar = healthBar;
    entity.setScene(scene)
    entity.visible = false;
    entity.scale.set(X, Y);
    entity.audioKeys = audioKeys
    let center = entity.position.clone()
    let halfSize = entity.boundary.getHalfSize().clone().scale(0.9,0.6);
    entity.addPhysics(new AABB(center, halfSize));
    entity.disablePhysics()
    entity.setGroup(PhysicGroups.ENEMY);
    entity.addAI(MegaMookBehavior)
    return entity;
}

function initSummonerFunc(add: FactoryManager, scene: ActorScene):SummonerActor{
    let info = AllEnemyData.SUMMONER
    let AUDIO = info.AUDIO?info.AUDIO:[]
    let audioKeys = AUDIO.map((x)=>{return x.KEY})
    let {X, Y} = info.LOAD[0].SCALE
    let entity = add.animatedSprite(SummonerActor, info.LOAD[0].KEY, Layers.PRIMARY)
    let healthBar = new HealthbarHUD(scene, entity, Layers.HEALTHBARS, {size: new Vec2(entity.size.x, 5), offset: entity.size.clone().scaled(0, -1/2)})
    entity.position.set(1200,1200)
    entity.healthBar = healthBar;
    entity.setScene(scene)
    entity.visible = false;
    entity.scale.set(X, Y);
    entity.audioKeys = audioKeys
    entity.addPhysics()
    entity.disablePhysics()
    entity.setGroup(PhysicGroups.ENEMY);
    entity.addAI(SummonerBehavior)
    return entity;
}

function initLevel1MookFunc(add: FactoryManager, scene: ActorScene):Level1MookActor{
    let info = AllEnemyData.LEVEL1MOOK
    let AUDIO = info.AUDIO?info.AUDIO:[]
    let audioKeys = AUDIO.map((x)=>{return x.KEY})
    let {X, Y} = info.LOAD[0].SCALE
    let entity = add.animatedSprite(Level1MookActor, info.LOAD[0].KEY, Layers.PRIMARY)
    let healthBar = new HealthbarHUD(scene, entity, Layers.HEALTHBARS, {size: new Vec2(entity.size.x, 5), offset: entity.size.clone().scaled(0, -1/2)})
    entity.position.set(1200,1200)
    entity.healthBar = healthBar;
    entity.setScene(scene)
    entity.visible = false;
    entity.scale.set(X, Y);
    entity.audioKeys = audioKeys
    let center = entity.position.clone()
    let halfSize = entity.boundary.getHalfSize().clone().scale(0.9,0.6);
    entity.addPhysics(new AABB(center, halfSize));
    entity.disablePhysics()
    entity.setGroup(PhysicGroups.ENEMY);
    entity.addAI(Level1MookBehavior)
    return entity;
}

function initLevel3MookFunc(add: FactoryManager, scene: ActorScene):Level3MookActor{
    let info = AllEnemyData.LEVEL3MOOK
    let AUDIO = info.AUDIO?info.AUDIO:[]
    let audioKeys = AUDIO.map((x)=>{return x.KEY})
    let {X, Y} = info.LOAD[0].SCALE
    let entity = add.animatedSprite(Level3MookActor, info.LOAD[0].KEY, Layers.PRIMARY)
    let healthBar = new HealthbarHUD(scene, entity, Layers.HEALTHBARS, {size: new Vec2(entity.size.x, 5), offset: entity.size.clone().scaled(0, -1/2)})
    entity.position.set(1200,1200)
    entity.healthBar = healthBar;
    entity.setScene(scene)
    entity.visible = false;
    entity.scale.set(X, Y);
    entity.audioKeys = audioKeys
    let center = entity.position.clone()
    let halfSize = entity.boundary.getHalfSize().clone().scale(0.9,0.6);
    entity.addPhysics(new AABB(center, halfSize));
    entity.disablePhysics()
    entity.setGroup(PhysicGroups.ENEMY);
    entity.addAI(Level3MookBehavior)
    return entity;
}

function initLevel5MookFunc(add: FactoryManager, scene: ActorScene):Level5MookActor{
    let info = AllEnemyData.LEVEL5MOOK
    let AUDIO = info.AUDIO?info.AUDIO:[]
    let audioKeys = AUDIO.map((x)=>{return x.KEY})
    let {X, Y} = info.LOAD[0].SCALE
    let entity = add.animatedSprite(Level5MookActor, info.LOAD[0].KEY, Layers.PRIMARY)
    let healthBar = new HealthbarHUD(scene, entity, Layers.HEALTHBARS, {size: new Vec2(entity.size.x, 5), offset: entity.size.clone().scaled(0, -1/2)})
    entity.position.set(1200,1200)
    entity.healthBar = healthBar;
    entity.setScene(scene)
    entity.visible = false;
    entity.scale.set(X, Y);
    entity.audioKeys = audioKeys
    entity.addPhysics()
    entity.disablePhysics()
    entity.setGroup(PhysicGroups.ENEMY);
    entity.addAI(Level5MookBehavior)
    return entity;
}

function initLevel6MookFunc(add: FactoryManager, scene: ActorScene):Level6MookActor{
    let info = AllEnemyData.LEVEL6MOOK
    let AUDIO = info.AUDIO?info.AUDIO:[]
    let audioKeys = AUDIO.map((x)=>{return x.KEY})
    let {X, Y} = info.LOAD[0].SCALE
    let entity = add.animatedSprite(Level6MookActor, info.LOAD[0].KEY, Layers.PRIMARY)
    let healthBar = new HealthbarHUD(scene, entity, Layers.HEALTHBARS, {size: new Vec2(entity.size.x, 5), offset: entity.size.clone().scaled(0, -1/2)})
    entity.position.set(1200,1200)
    entity.healthBar = healthBar;
    entity.setScene(scene)
    entity.visible = false;
    entity.scale.set(X, Y);
    entity.audioKeys = audioKeys
    entity.addPhysics()
    entity.disablePhysics()
    entity.setGroup(PhysicGroups.ENEMY);
    entity.addAI(Level6MookBehavior)
    return entity;
}