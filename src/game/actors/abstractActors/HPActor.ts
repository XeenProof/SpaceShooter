import Spritesheet from "../../../Wolfie2D/DataTypes/Spritesheet";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Timer from "../../../Wolfie2D/Timing/Timer";
import BasicBattler from "../../../utils/BattleSystem/BasicBattler";
import Battler from "../../../utils/BattleSystem/Battler";
import HealthbarHUD from "../../../utils/HUD/HealthbarHUD";
import HealthBarUser from "../../../utils/HUD/HealthBarUser";
import BasicTargetable from "../../../utils/Targeting/BasicTargetable";
import { TargetableEntity } from "../../../utils/Targeting/TargetableEntity";
import { TargetingEntity } from "../../../utils/Targeting/TargetingEntity";
import SpawnableActor from "./SpawnableActor";


export default abstract class HPActor extends SpawnableActor implements HealthBarUser {

    /** Give the player a battler compoonent */
    protected battler: Battler;
    protected targetable: TargetableEntity;
    private _healthBar: HealthbarHUD;

    private _DamageTimer: Timer;

    constructor(sheet: Spritesheet){
        super(sheet);
        this.battler = new BasicBattler(this)
        this.targetable = new BasicTargetable(this)
    }

    initHealth(hp: number, maxHealth: number = hp, trueMaxHealth:number = maxHealth){
        this.health = hp;
        this.maxHealth = maxHealth;
        this.trueMaxHealth = trueMaxHealth;
    }

    get battleGroup(): number {return this.battler.battleGroup;}
    set battleGroup(value: number) {this.battler.battleGroup = value;}

    get trueMaxHealth(): number {return this.battler.trueMaxHealth;}
    set trueMaxHealth(value: number) {this.battler.trueMaxHealth = value}

    get maxHealth(): number {return this.battler.maxHealth}
    set maxHealth(value: number) {this.battler.maxHealth = value}

    get health(): number {return this.battler.health}
    set health(value: number) {this.battler.health = value}

    get battlerActive(): boolean {return this.battler.battlerActive}
    set battlerActive(value: boolean) {this.battler.battlerActive = value}

    get healthBar(): HealthbarHUD {return this._healthBar;}
    set healthBar(value: HealthbarHUD) {this._healthBar = value;}

    public get DamageTimer(): Timer {return this._DamageTimer;}
    public set DamageTimer(value: Timer) {this._DamageTimer = value;}

    getTargeting(): TargetingEntity[] {return this.targetable.getTargeting()}
    addTargeting(targeting: TargetingEntity): void {this.targetable.addTargeting(targeting);}
    removeTargeting(targeting: TargetingEntity): void {this.targetable.removeTargeting(targeting);}

    fireEvent(type:string, data:Record<string, any>){this.emitter.fireEvent(type, data)}

    despawnConditions(options: Record<string, any>): boolean {
        return false;
    }

    despawn(): void {
        super.despawn()
        this.healthBar.visible = false;
    }

    dying(): void{
        console.log("dying")
        this.despawn()
    }

    get ramDamage(): number {return this.health}
    takeDamage(damage: number): void{
        this.health-=damage
    }
}