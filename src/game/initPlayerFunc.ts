import AABB from "../Wolfie2D/DataTypes/Shapes/AABB";
import AnimatedSprite from "../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import FactoryManager from "../Wolfie2D/Scene/Factories/FactoryManager";
import { Events } from "../constants/events";
import { Layers } from "../constants/layers";
import { PhysicGroups } from "../constants/physics";
import RechargableStat from "../utils/HUD/RechargableStat";
import PlayerActor from "./actors/PlayerActor";
import PlayerController from "./ai/PlayerController";
import ActorScene from "./scenes/ActorScene";


export function initPlayerFunc(add: FactoryManager, scene: ActorScene, info:Record<string, any>):PlayerActor{
    let {SHIP, FLAMES, SHIELD} = info.LOAD
    let player = add.animatedSprite(PlayerActor, SHIP.KEY, Layers.PRIMARY);
    player.setScene(scene)

    player.position.set(450, 750);
    player.scale.set(SHIP.SCALE.X, SHIP.SCALE.Y);

    let booster = add.animatedSprite(AnimatedSprite, FLAMES.KEY, Layers.PRIMARY);
    booster.position.copy(player.position)
    booster.scale.set(FLAMES.SCALE.X, FLAMES.SCALE.Y);
    let boosterCharge = new RechargableStat(5,5,10000)
    player.booster = booster
    player.boosterCharge = boosterCharge
    console.log(booster)

    let shield = add.sprite(SHIELD.KEY, Layers.PRIMARY);
    shield.position.copy(player.position)
    shield.scale.set(SHIELD.SCALE.X, SHIELD.SCALE.Y)
    shield.visible = false
    let shieldCharge = new RechargableStat(5,5,10000)
    player.shield = shield
    player.shieldCharge = shieldCharge

    player.addAI(PlayerController, {stats: info.STATS});

    let center = player.position.clone();
    let halfSize = player.boundary.getHalfSize().clone();
    player.addPhysics(new AABB(center, halfSize));
    player.setGroup(PhysicGroups.PLAYER)
    player.setTrigger(PhysicGroups.ENEMY, Events.PLAYER_ENEMY_COLLISION, null)

    return player
}