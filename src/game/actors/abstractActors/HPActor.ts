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
import RandUtils from "../../../Wolfie2D/Utils/RandUtils";
import { Events } from "../../../constants/events";


export default abstract class HPActor extends SpawnableActor implements HealthBarUser {

    protected battler: Battler;
    protected targetable: TargetableEntity;
    private _dropRate: number = 0;

    private _healthBar: HealthbarHUD;

    constructor(sheet: Spritesheet){
        super(sheet);
        this.battler = new BasicBattler(this)
        this.targetable = new BasicTargetable(this)
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

    get dropRate(): number {return this._dropRate;}
    set dropRate(value: number) {this._dropRate = value;}

    get OHKODamage(): number{return this.maxHealth}

    updateHealthBar(deltaT: number){
        this.healthBar.update(deltaT)
    }

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
        console.log(this.dropRate)
        if(RandUtils.randomChance(this.dropRate)){
            this.emitter.fireEvent(Events.DROP_SCRAP, {src: this.position})
        }
        this.despawn()
    }

    get ramDamage(): number {return this.health}
    takeDamage(damage: number): boolean{
        this.health-=damage
        return (damage > 0)
    }
}