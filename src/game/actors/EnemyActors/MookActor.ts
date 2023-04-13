import Spritesheet from "../../../Wolfie2D/DataTypes/Spritesheet";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Scene from "../../../Wolfie2D/Scene/Scene";
import { Layers } from "../../../constants/layers";
import HealthbarHUD from "../../../utils/HUD/HealthbarHUD";
import BasicTargetable from "../../../utils/Targeting/BasicTargetable";
import { TargetableEntity } from "../../../utils/Targeting/TargetableEntity";
import { TargetingEntity } from "../../../utils/Targeting/TargetingEntity";
import BaseScene from "../../scenes/GameplayScenes/BaseScene";
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
        return false//super.despawnConditions(options);
    }

    despawn(): void {
        console.log("Mook despawned")
        super.despawn()
    }

    takeDamage(damage: number): boolean {
        return super.takeDamage(damage)
    }

    //Targetable Interface Functions
    // public getTargeting(): TargetingEntity[] {return this.targetable.getTargeting();}
    // public addTargeting(targeting: TargetingEntity): void {this.targetable.addTargeting(targeting);}
    // public removeTargeting(targeting: TargetingEntity): void {this.targetable.removeTargeting(targeting);}
}