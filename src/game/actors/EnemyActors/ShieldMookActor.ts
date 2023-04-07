import Spritesheet from "../../../Wolfie2D/DataTypes/Spritesheet";
import Sprite from "../../../Wolfie2D/Nodes/Sprites/Sprite";
import Timer from "../../../Wolfie2D/Timing/Timer";
import MookActor from "./MookActor";


export default class ShieldMookActor extends MookActor{
    private _shield: Sprite;
    private _shieldhealth: number;
    private _maxshieldHealth: number;
    private shieldTimer: Timer;
    public get shield(): Sprite {return this._shield;}
    public set shield(value: Sprite) {this._shield = value;}
    public get shielded(): boolean {return (this.shield)?this.shield.visible:false}

    public get shieldhealth(): number {return this._shieldhealth;}
    public set shieldhealth(value: number) {this._shieldhealth = value;}

    public constructor(sheet: Spritesheet){
        super(sheet)
    }

    
}