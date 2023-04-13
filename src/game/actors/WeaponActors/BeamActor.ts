import Spritesheet from "../../../Wolfie2D/DataTypes/Spritesheet";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Scene from "../../../Wolfie2D/Scene/Scene";
import BasicTargetable from "../../../utils/Targeting/BasicTargetable";
import { TargetableEntity } from "../../../utils/Targeting/TargetableEntity";
import { TargetingEntity } from "../../../utils/Targeting/TargetingEntity";
import BaseScene from "../../scenes/GameplayScenes/BaseScene";
import DamageActor from "../abstractActors/DamageActor";
import SpawnableActor from "../abstractActors/SpawnableActor";


export default class BeamActor extends DamageActor{

    public constructor(sheet: Spritesheet){
        super(sheet)
    }

    despawnConditions(options: Record<string, any>): boolean {
        return this.offScreen
    }
}