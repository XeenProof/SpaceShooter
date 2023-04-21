import Updateable from "../../Wolfie2D/DataTypes/Interfaces/Updateable";
import Timer from "../../Wolfie2D/Timing/Timer";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";


export default class RechargableStat implements Updateable{
    private _value:number;
    private _maxValue:number;
    private _timer: Timer;
    private _delay: number;
    private _rechargeAmount: number;
    private _useChargeAmount: number;
    constructor(value: number, maxValue:number = value, delay:number = 10000, rechargeAmount:number = 1, useChargeAmount:number = 1){
        this.value = value
        this.maxValue = maxValue
        this.delay = delay
        this.rechargeAmount = rechargeAmount;
        this.useChargeAmount = useChargeAmount;
    }
    update(deltaT: number): void {
        if(!this.timer.isActive() && !this.isMaxed){
            this.timer.reset()
            this.timer.start()
        }
    }

    /**use function */
    public useCharge():void{
        if(!this.canUse){return;}
        this.value-=this.useChargeAmount
    }

    /**Basic booleans */
    public get isMaxed():boolean{return (this.value >= this.maxValue)}
    public get canUse():boolean{return (this.value >= this.useChargeAmount)}

    /**Basic getters */
    private get timer(): Timer {return this._timer;}
    public get value() {return this._value;}
    public set value(value) {this._value = value;}
    public get maxValue() {return this._maxValue;}
    public set maxValue(value) {this._maxValue = value;}
    public get rechargeAmount(): number {return this._rechargeAmount;}
    public set rechargeAmount(value: number) {this._rechargeAmount = value;}
    public get useChargeAmount(): number {return this._useChargeAmount;}
    public set useChargeAmount(value: number) {this._useChargeAmount = value;}
    public get delay(): number {return this._delay;}
    public set delay(value: number) {
        if(this._timer == null){
            this._timer = new Timer(value)
        }
        this._timer.reinit(value, ()=>{this.recharge(this.rechargeAmount)});
        this._delay = value;
    }

    private recharge(rechargeAmount:number):void{
        this.value = Math.min(this.maxValue, this.value+rechargeAmount)
        console.log(this.value, this.maxValue)
    }

    public pause(){
        this.timer.pause()
    }
    public resume(){
        if(!this.isMaxed){this.timer.start()}
    }
}