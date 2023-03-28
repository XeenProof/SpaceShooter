import Spritesheet from "../../Wolfie2D/DataTypes/Spritesheet";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import BasicBattler from "../../utils/BattleSystem/BasicBattler";
import Battler from "../../utils/BattleSystem/Battler";
import BasicTargetable from "../../utils/Targeting/BasicTargetable";
import { TargetableEntity } from "../../utils/Targeting/TargetableEntity";
import { TargetingEntity } from "../../utils/Targeting/TargetingEntity";


export default class HPActor extends AnimatedSprite implements Battler {

    /** Give the player a battler compoonent */
    protected battler: Battler;
    protected targetable: TargetableEntity;

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

    getTargeting(): TargetingEntity[] {return this.targetable.getTargeting()}
    addTargeting(targeting: TargetingEntity): void {this.targetable.addTargeting(targeting);}
    removeTargeting(targeting: TargetingEntity): void {this.targetable.removeTargeting(targeting);}

    fireEvent(type:string, data:Record<string, any>){
        this.emitter.fireEvent(type, data)
    }
    
}