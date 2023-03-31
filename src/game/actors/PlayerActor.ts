import Spritesheet from "../../Wolfie2D/DataTypes/Spritesheet";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
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

const booster_animations = {
    LOW: "LOW",
    HIGH: "HIGH"
}

export default class PlayerActor extends HPActor{

    //private iframe:boolean = false
    private iTimer:Timer = new Timer(500, ()=>{this.handleIframeEnds()}, false);

    private _booster: AnimatedSprite;
    public get booster(): AnimatedSprite {return this._booster;}
    public set booster(value: AnimatedSprite) {this._booster = value;}

    private _currentSpeed: number;
    public get currentSpeed(): number {return this._currentSpeed;}
    public set currentSpeed(value: number) {this._currentSpeed = value;}
    

    public constructor(sheet: Spritesheet){
        super(sheet)
        console.log("player ", this.id)
    }

    spawn(options: Record<string, any> = {}): void {
        //super.spawn(options)
        this.animation.playIfNotAlready(animations.IDLE, true)
        this.booster.animation.playIfNotAlready(booster_animations.LOW, true)
        this.booster.visible = true;
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

    move(velocity: Vec2): void {
        super.move(velocity)
        this.booster.position.copy(this.position)
    }

    public handleIframeEnds(): void {
        //this.iframe = false
        this.animation.playIfNotAlready(animations.IDLE, true)
    }
}