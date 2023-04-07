import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Sprite from "../../../Wolfie2D/Nodes/Sprites/Sprite";
import HealthBarUser from "../../../utils/HUD/HealthBarUser";
import HealthbarHUD from "../../../utils/HUD/HealthbarHUD";


export default class HPShield implements HealthBarUser{
    private _sprite: Sprite;
    private _health:number;
    private _maxhealth:number;
    private _shieldBar: HealthbarHUD;

    constructor(sprite: Sprite){
        this.sprite = sprite
    }

    public get sprite(): Sprite {return this._sprite;}
    public set sprite(value: Sprite) {this._sprite = value;}

    get id(): number {return this.sprite.id}

    get health(): number {return this._health}
    get maxHealth(): number {return this._maxhealth}

    public set health(value: number) {this._health = value;}
    public set maxHealth(value: number) {this._health = value;}

    public get shieldBar(): HealthbarHUD {return this._shieldBar;}
    public set shieldBar(value: HealthbarHUD) {this._shieldBar = value;}

    public get position():Vec2 {
        return this.sprite.position
    }

    public updateHealthBar(deltaT: number): void {
        console.log(this.shieldBar.owner.maxHealth)
        if(this.shieldBar){this.shieldBar.update(deltaT)}
    }

    public takeDamage(damage: number):boolean{
        this.health-=damage
        return (damage > 0)
    }

    public activateShield(shieldhp:number = this.maxHealth){
        this.health = shieldhp
        this.maxHealth = shieldhp
        this.visible = true
        console.log(this.health)
    }

    public deactivateShield(){
        this.visible = false
    }

    public get visible():boolean{
        return this.sprite.visible
    }

    public set visible(value: boolean){
        this.sprite.visible = value;
        this.shieldBar.visible = value;
    }

}