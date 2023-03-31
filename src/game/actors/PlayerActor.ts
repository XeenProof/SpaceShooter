import Spritesheet from "../../Wolfie2D/DataTypes/Spritesheet";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Scene from "../../Wolfie2D/Scene/Scene";
import BasicTargetable from "../../utils/Targeting/BasicTargetable";
import { TargetableEntity } from "../../utils/Targeting/TargetableEntity";
import { TargetingEntity } from "../../utils/Targeting/TargetingEntity";
import BaseScene from "../scenes/BaseScene";
import HPActor from "./abstractActors/HPActor";


export default class PlayerActor extends HPActor{

    public constructor(sheet: Spritesheet){
        super(sheet)
        console.log("player ", this.id)
    }

    takeDamage(damage: number): void {
        super.takeDamage(0)
        console.log("player hp", this.health, damage)
    }
}