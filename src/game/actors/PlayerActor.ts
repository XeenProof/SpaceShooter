import Spritesheet from "../../Wolfie2D/DataTypes/Spritesheet";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Scene from "../../Wolfie2D/Scene/Scene";
import Timer from "../../Wolfie2D/Timing/Timer";
import BasicTargetable from "../../utils/Targeting/BasicTargetable";
import { TargetableEntity } from "../../utils/Targeting/TargetableEntity";
import { TargetingEntity } from "../../utils/Targeting/TargetingEntity";
import BaseScene from "../scenes/BaseScene";
import HPActor from "./abstractActors/HPActor";


const animations = {
    IDLE: "IDLE",
    TAKING_DAMAGE: "TAKING_DAMAGE"
}

export default class PlayerActor extends HPActor{

    //private iframe:boolean = false
    private iTimer:Timer = new Timer(500, ()=>{this.handleIframeEnds()}, false);
    

    public constructor(sheet: Spritesheet){
        super(sheet)
        console.log("player ", this.id)
    }

    spawn(options: Record<string, any> = {}): void {
        //super.spawn(options)
        this.animation.playIfNotAlready(animations.IDLE, true)
    }

    takeDamage(damage: number): void {
        //if(this.iframe){return;}
        super.takeDamage(0)
        //this.iframe = true
        this.animation.playIfNotAlready(animations.TAKING_DAMAGE)
        this.iTimer.reset()
        this.iTimer.start()
        console.log("player hp", this.health, damage)
    }

    public handleIframeEnds(): void {
        //this.iframe = false
        this.animation.playIfNotAlready(animations.IDLE, true)
    }
}