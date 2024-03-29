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
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";


export default abstract class HPActor extends SpawnableActor implements HealthBarUser {

    protected battler: Battler;
    protected targetable: TargetableEntity;
    private _dropRate: number = 0;

    private _healthBar: HealthbarHUD;
    private _audioKeys: string[];

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

    get health(): number {return Math.max(this.battler.health, 0)}
    set health(value: number) {this.battler.health = value}

    get battlerActive(): boolean {return this.battler.battlerActive}
    set battlerActive(value: boolean) {this.battler.battlerActive = value}

    get healthBar(): HealthbarHUD {return this._healthBar;}
    set healthBar(value: HealthbarHUD) {this._healthBar = value;}

    get dropRate(): number {return this._dropRate;}
    set dropRate(value: number) {this._dropRate = value;}

    get OHKODamage(): number{return this.maxHealth}
    get percentHealth(): number{return this.health/this.maxHealth}

    get audioKeys(): string[] {return this._audioKeys;}
    set audioKeys(value: string[]) {this._audioKeys = value;}
    playSoundFX(index:number):void{
        if(!this.audioKeys){return}
        if(index < 0 || index >= this.audioKeys.length){return}
        this.emitter.fireEvent(GameEventType.PLAY_SFX, {key:this.audioKeys[index]})
    }

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
        this.position.set(0, 2000)
        this.healthBar.visible = false;
    }

    dying(): void{
        this.despawn()
    }

    get ramDamage(): number {return this.health}
    takeDamage(damage: number): boolean{
        this.health-=damage
        return (damage > 0)
    }
}