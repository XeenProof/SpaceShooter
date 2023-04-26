import Spritesheet from "../../../Wolfie2D/DataTypes/Spritesheet";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Scene from "../../../Wolfie2D/Scene/Scene";
import RandUtils from "../../../Wolfie2D/Utils/RandUtils";
import { Events } from "../../../constants/events";
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
    private _points: number;
    public get points(): number {return this._points;}
    public set points(value: number) {this._points = value;}

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
        let damaged = super.takeDamage(damage)
        if(damaged){this.playSoundFX(0)}
        return damaged
    }

    dying(): void {
        console.log(this.dropRate)
        this.emitter.fireEvent(Events.ENEMY_DIED, {points: this.points})
        if(RandUtils.randomChance(this.dropRate)){
            this.emitter.fireEvent(Events.DROP_SCRAP, {src: this.position.clone()})
        }
        super.dying()
    }

    //Targetable Interface Functions
    // public getTargeting(): TargetingEntity[] {return this.targetable.getTargeting();}
    // public addTargeting(targeting: TargetingEntity): void {this.targetable.addTargeting(targeting);}
    // public removeTargeting(targeting: TargetingEntity): void {this.targetable.removeTargeting(targeting);}
}