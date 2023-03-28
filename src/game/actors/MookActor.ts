import Spritesheet from "../../Wolfie2D/DataTypes/Spritesheet";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Scene from "../../Wolfie2D/Scene/Scene";
import BasicTargetable from "../../utils/Targeting/BasicTargetable";
import { TargetableEntity } from "../../utils/Targeting/TargetableEntity";
import { TargetingEntity } from "../../utils/Targeting/TargetingEntity";
import BaseScene from "../scenes/BaseScene";
import HPActor from "./HPActor";


export default class MookActor extends HPActor{
    protected scene: BaseScene


    public constructor(sheet: Spritesheet){
        super(sheet)
        //this.targetable = new BasicTargetable(this)
    }

    //Targetable Interface Functions
    // public getTargeting(): TargetingEntity[] {return this.targetable.getTargeting();}
    // public addTargeting(targeting: TargetingEntity): void {this.targetable.addTargeting(targeting);}
    // public removeTargeting(targeting: TargetingEntity): void {this.targetable.removeTargeting(targeting);}
}