import Spritesheet from "../../Wolfie2D/DataTypes/Spritesheet";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Timer from "../../Wolfie2D/Timing/Timer";
import { cheats } from "../../constants/gameoptions";
import RechargableStat from "../../utils/HUD/RechargableStat";
import UpgradableStat from "../../utils/HUD/UpgradableStat";
import CheatCodes from "../../utils/Singletons/CheatCodes";
import UpgradableSprites from "../../utils/UpgradableSprites/UpgradableSprites";
import HPActor from "./abstractActors/HPActor";

const booster_animations = {
    LOW: "LOW",
    HIGH: "HIGH"
}

export default class PlayerActor extends HPActor{

    /**The booster and all it's related functions */
    private _booster: AnimatedSprite;
    private _boosted: boolean = false;
    private boostTimer: Timer;
    public get booster(): AnimatedSprite {return this._booster;}
    public set booster(value: AnimatedSprite) {
        this._booster = value;
    }
    public get boosted(): boolean {return this._boosted;}
    private set boosted(value: boolean) {this._boosted = value;}

    /**The booster charge and all it's related functions */
    private _boosterCharge: RechargableStat;
    public get boosterCharge(): RechargableStat {return this._boosterCharge;}
    public set boosterCharge(value: RechargableStat) {this._boosterCharge = value;}
    public get boosterValue():number{return this.boosterCharge.value}
    public get maxBoosterValue():number{return this.boosterCharge.maxValue}
    public get canBoost():boolean{return !this.boosted && (this.boosterCharge.canUse || CheatCodes.getCheat(cheats.INFINITE_BOOSTER))}
    public useBooster():void{
        if(!this.canBoost){return;}
        this.activateBoost()
        if(CheatCodes.getCheat(cheats.INFINITE_BOOSTER)){return;}
        this.boosterCharge.useCharge()
        console.log(this.boosterValue, this.maxBoosterValue)
    }

    /**The shield and all it's related functions */
    private _shield: Sprite;
    private shieldTimer: Timer;
    public get shield(): Sprite {return this._shield;}
    public set shield(value: Sprite) {
        this._shield = value;
    }
    public get shielded(): boolean {return (this.shield)?this.shield.visible:false}

    /**The shield charge and all it's related functions */
    private _shieldCharge: RechargableStat;
    public get shieldCharge(): RechargableStat {return this._shieldCharge;}
    public set shieldCharge(value: RechargableStat) {this._shieldCharge = value;}
    public get shieldValue():number {return this.shieldCharge.value}
    public get maxShieldValue():number {return this.shieldCharge.maxValue}
    public get canShield():boolean{return !this.shielded && (this.shieldCharge.canUse || CheatCodes.getCheat(cheats.INFINITE_SHIELD))}
    public useShield():void{
        if(!this.canShield){return;}
        this.activateShield()
        if(CheatCodes.getCheat(cheats.INFINITE_SHIELD)){return;}
        this.shieldCharge.useCharge()
        console.log(this.shieldValue, this.maxShieldValue)
    }

    /**The current speed and all it's related functions */
    private _currentSpeed: number;
    public get currentSpeed(): number {return this._currentSpeed*((this.boosted)?2:1);}
    public set currentSpeed(value: number) {this._currentSpeed = value;}

    /**The scrap cost and all it's related functions */
    private _scrap: number;
    public get scrap(): number {return CheatCodes.getCheat(cheats.INFINITE_SCRAP)?Infinity:this._scrap;}
    public set scrap(value: number) {this._scrap = value;}
    public collectedScrap(value: number):void{if(this.scrap != -1){this.scrap+=value}}
    public useScrap(value: number):void{if(this.scrap != -1){this.scrap-=value}}
    public canAfford(cost: number):boolean{return (this.scrap >= cost || CheatCodes.getCheat(cheats.INFINITE_SCRAP))}

    /**Healing related */
    public get canHeal(): boolean {return this.canAfford(this.healCost) && this.health < this.maxHealth && this.health > 0}
    public heal(value: number = this.maxHealth){this.health = Math.min(this.health + value, this.maxHealth)}
    public handlePlayerHeal(): void {if(this.canHeal){
        this.useScrap(this.healCost)
        this.heal(this.healAmount)}
    }
    public get healCost():number{return 10}
    public get healAmount():number{return 10}

    /**Health Upgrade and all it's related stuff */
    private _basehealth: number;
    private _healthUpgrade: UpgradableStat;
    private _healthVisual: UpgradableSprites;
    public get basehealth(): number {return this._basehealth;}
    public set basehealth(value: number) {this._basehealth = value;}
    public get healthUpgrade(): UpgradableStat {return this._healthUpgrade;}
    public set healthUpgrade(value: UpgradableStat) {this._healthUpgrade = value;}
    public get healthVisual(): UpgradableSprites {return this._healthVisual;}
    public set healthVisual(value: UpgradableSprites) {this._healthVisual = value;}
    public get healthUpgradeLevel(): number {return this.healthUpgrade.level}
    public get healthUpgradeCost():number {return this.healthUpgrade.cost}
    public get canUpgradeHealth():boolean {return this.canAfford(this.healthUpgradeCost)}
    public handleUpgradeHealth(value:number = 1, ignoreCost:boolean = false){
        if(this.canUpgradeHealth || ignoreCost){
            this.useScrap((ignoreCost)?0:this.healthUpgradeCost)
            this.healthUpgrade.upgrade(value)
            if(this.healthVisual){this.healthVisual.updateSprite(this.healthUpgradeLevel)}
            let currentMax = (this.healthUpgradeLevel*10)+this.basehealth
            let prevMax = this.maxHealth
            let difference = currentMax - prevMax
            this.maxHealth+=difference
            this.health+=difference
        }
    }

    /**Attack Upgrade and all it's related stuff */
    private _damageMulti: number = 1;
    private _attackUpgrade: UpgradableStat;
    private _damageVisual: UpgradableSprites;
    public get damageMulti(): number {return this._damageMulti;}
    public set damageMulti(value: number) {this._damageMulti = value;}
    public get attackUpgrade(): UpgradableStat {return this._attackUpgrade;}
    public set attackUpgrade(value: UpgradableStat) {this._attackUpgrade = value;}
    public get damageVisual(): UpgradableSprites {return this._damageVisual;}
    public set damageVisual(value: UpgradableSprites) {this._damageVisual = value;}
    public get attackUpgradeLevel(): number {return this.attackUpgrade.level}
    public get attackUpgradeCost():number {return this.attackUpgrade.cost}
    public get canUpgradeAttack():boolean {return this.canAfford(this.attackUpgradeCost) || CheatCodes.getCheat(cheats.INFINITE_SCRAP)}
    public handleUpgradeAttack(value:number = 1, ignoreCost:boolean = false){
        if(this.canUpgradeAttack || ignoreCost){
            this.useScrap((ignoreCost)?0:this.attackUpgradeCost)
            this.attackUpgrade.upgrade(value)
            if(this.damageVisual){this.damageVisual.updateSprite(this.attackUpgradeLevel)}
            this.damageMulti = (this.attackUpgradeLevel*0.5)+1
        }
    }

    private _points: number = 0;
    public get points(): number {return this._points;}
    public set points(value: number) {this._points = value;}

    public constructor(sheet: Spritesheet){
        super(sheet)
    }

    public handleChargesUpdate(deltaT: number){
        if(this.frozen){return}
        if(this.boosterCharge){this.boosterCharge.update(deltaT)}
        if(this.shieldCharge){this.shieldCharge.update(deltaT)}
    }

    spawn(options: Record<string, any> = {}): void {
        this.booster.animation.playIfNotAlready(booster_animations.LOW, true)
        this.booster.visible = true;
        this.boostTimer = new Timer(2000, ()=>{this.deactivateBooster()});
        this.shieldTimer = new Timer(2000, ()=>{this.deactivateShield()});
    }

    takeDamage(damage: number, options:Record<string, any> = {}): boolean {
        return super.takeDamage(CheatCodes.getCheat(cheats.INVINSIBLE)?0:damage)
    }

    dying(): void {
        this.shield.visible = false
        this.booster.visible = false
        if(this.healthVisual){this.healthVisual.visible = false}
        if(this.damageVisual){this.damageVisual.visible = false}
    }

    public activateShield(){
        this.shield.visible = true;
        this.shieldTimer.reset();
        this.shieldTimer.start();
    }
    public deactivateShield(){
        this.shield.visible = false
        this.shieldTimer.pause();
        this.shieldTimer.reset();
    }

    public activateBoost(){
        this.booster.animation.playIfNotAlready(booster_animations.HIGH, true)
        this.boosted = true
        this.boostTimer.reset()
        this.boostTimer.start()
    }
    private deactivateBooster(){
        this.booster.animation.playIfNotAlready(booster_animations.LOW, true)
        this.boosted = false
    }

    finishMove(): void {
        super.finishMove()
        this.booster.position.copy(this.position)
        if(this.shield.visible){this.shield.position.copy(this.position)}
        if(this.healthVisual && this.healthVisual.visible){this.healthVisual.updatePosition()}
        if(this.damageVisual && this.damageVisual.visible){this.damageVisual.updatePosition()}
    }

    public pause():void{
        this.TimerPause()
        this.animation.pause()
        this.booster.animation.pause()
        if(this.healthVisual){this.healthVisual.pause()}
        if(this.damageVisual){this.damageVisual.pause()}
    }
    public resume():void{
        this.TimerResume()
        this.animation.resume()
        this.booster.animation.resume()
        if(this.healthVisual){this.healthVisual.resume()}
        if(this.damageVisual){this.damageVisual.resume()}
    }

    public TimerPause():void{
        this.boosterCharge.pause()
        this.shieldCharge.pause()
        this.shieldTimer.pause()
        this.boostTimer.pause()
    }
    public TimerResume():void{
        this.boosterCharge.resume()
        this.shieldCharge.resume()
        if(this.shielded){this.shieldTimer.start();}
        if(this.boosted){this.boostTimer.start();}
    }
}