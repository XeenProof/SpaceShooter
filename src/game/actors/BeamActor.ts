import Spritesheet from "../../Wolfie2D/DataTypes/Spritesheet";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Scene from "../../Wolfie2D/Scene/Scene";
import BasicTargetable from "../../utils/Targeting/BasicTargetable";
import { TargetableEntity } from "../../utils/Targeting/TargetableEntity";
import { TargetingEntity } from "../../utils/Targeting/TargetingEntity";
import BaseScene from "../scenes/BaseScene";
import SpawnableActor from "./abastractActors/SpawnableActor";


export default class BeamActor extends SpawnableActor{
    
    protected scene: BaseScene

    public constructor(sheet: Spritesheet){
        super(sheet)
    }

    despawnConditions(options: Record<string, any>): boolean {
        return this.offScreenDown || this.offScreenUp
    }
}