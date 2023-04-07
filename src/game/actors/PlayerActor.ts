import Spritesheet from "../../Wolfie2D/DataTypes/Spritesheet";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
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
    private _boosted: boolean = false;
    private boostTimer: Timer;
    public get booster(): AnimatedSprite {return this._booster;}
    public set booster(value: AnimatedSprite) {this._booster = value;}
    public get boosted(): boolean {return this._boosted;}
    private set boosted(value: boolean) {this._boosted = value;}

    private _shield: Sprite;
    private shieldTimer: Timer;
    public get shield(): Sprite {return this._shield;}
    public set shield(value: Sprite) {this._shield = value;}
    public get shielded(): boolean {return (this.shield)?this.shield.visible:false}

    private _currentSpeed: number;
    public get currentSpeed(): number {return this._currentSpeed*((this.boosted)?2:1);}
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
        this.boostTimer = new Timer(2000, ()=>{this.deactivateBooster()});
        this.shieldTimer = new Timer(2000, ()=>{this.deactivateShield()});
    }

    takeDamage(damage: number, options:Record<string, any> = {}): boolean {
        //if(this.iframe){return;}
        let received = super.takeDamage(0)
        if(!received){return false}
        this.animation.playIfNotAlready(animations.TAKING_DAMAGE)
        this.iTimer.reset()
        this.iTimer.start()
        return true;
    }

    activateShield(){
        this.shield.visible = true;
        this.shieldTimer.reset();
        this.shieldTimer.start();
    }
    public deactivateShield(){
        this.shield.visible = false
        this.shieldTimer.pause();
        this.shieldTimer.reset();
    }

    activateBoost(){
        this.booster.animation.playIfNotAlready(booster_animations.HIGH, true)
        this.boosted = true
        this.boostTimer.reset()
        this.boostTimer.start()
    }
    private deactivateBooster(){
        this.booster.animation.playIfNotAlready(booster_animations.LOW, true)
        this.boosted = false
    }

    move(velocity: Vec2): void {
        super.move(velocity)
        this.booster.position.copy(this.position)
        if(this.shield.visible){this.shield.position.copy(this.position)}
    }

    public handleIframeEnds(): void {
        //this.iframe = false
        this.animation.playIfNotAlready(animations.IDLE, true)
    }
}