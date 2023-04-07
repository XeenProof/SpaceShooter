import Spritesheet from "../../../Wolfie2D/DataTypes/Spritesheet";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Sprite from "../../../Wolfie2D/Nodes/Sprites/Sprite";
import Timer from "../../../Wolfie2D/Timing/Timer";
import HPShield from "../miscActors/HPShield";
import MookActor from "./MookActor";


export default class ShieldMookActor extends MookActor{
    private _shield: HPShield;
    public get shield(): HPShield {return this._shield;}
    public set shield(value: HPShield) {this._shield = value;}
    public get shielded(): boolean {return (this.shield)?this.shield.visible:false}

    public constructor(sheet: Spritesheet){
        super(sheet)
    }

    public activateShield(shiledhp?:number):void{
        this.shield.activateShield(shiledhp)
    }

    public get ramDamage(): number {
        return (this.shielded)?this.shield.health:super.ramDamage
    }

    public takeDamage(damage: number): boolean {
        let shieldDamage = Math.min(damage, (this.shielded)?this.shield.health:0)
        if(this.shield.health <= 0){this.shield.deactivateShield()}
        let enemyDamage = Math.max(0, damage-shieldDamage)
        if(this.shielded){this.shield.takeDamage(shieldDamage)}
        return super.takeDamage(enemyDamage)
    }

    public updateHealthBar(deltaT: number): void {
        this.shield.updateHealthBar(deltaT)
        super.updateHealthBar(deltaT);
    }

    public move(velocity: Vec2): void {
        super.move(velocity)
        if(this.shielded){this.shield.position.copy(this.position)}
    }

    public dying(): void {
        this.shield.deactivateShield()
        super.dying()
    }
    
}