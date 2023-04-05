import Spritesheet from "../../../Wolfie2D/DataTypes/Spritesheet";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Scene from "../../../Wolfie2D/Scene/Scene";
import BasicTargetable from "../../../utils/Targeting/BasicTargetable";
import { TargetableEntity } from "../../../utils/Targeting/TargetableEntity";
import { TargetingEntity } from "../../../utils/Targeting/TargetingEntity";
import BaseScene from "../../scenes/BaseScene";
import HPActor from "../abstractActors/HPActor";

const animations = {
    IDLE: "IDLE",
    TAKING_DAMAGE: "TAKING_DAMAGE"
}

export default class MookActor extends HPActor{

    public constructor(sheet: Spritesheet){
        super(sheet)
    }

    despawnConditions(options: Record<string, any>): boolean {
        if(this.offScreen){return true;}
        return super.despawnConditions(options);
    }

    despawn(): void {
        console.log("Mook despawned")
        super.despawn()

    }

    takeDamage(damage: number): void {
        this.animation.playIfNotAlready(animations.TAKING_DAMAGE, false)
        super.takeDamage(damage)
    }

    //Targetable Interface Functions
    // public getTargeting(): TargetingEntity[] {return this.targetable.getTargeting();}
    // public addTargeting(targeting: TargetingEntity): void {this.targetable.addTargeting(targeting);}
    // public removeTargeting(targeting: TargetingEntity): void {this.targetable.removeTargeting(targeting);}
}