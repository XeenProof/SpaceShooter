

export default class UpgradableStat{
    private _level: number
    private _cost: number
    private costUpdater:(prev:number)=>number;

    constructor(cost:number = 10, level:number = 0, costUpdater:(prev:number)=>number = (prev:number) => {return prev*2}){
        this.level = level
        this.cost = cost
        this.costUpdater = costUpdater
    }

    public get level(): number {return this._level}
    public set level(value: number) {this._level = value}
    public get cost(): number {return this._cost}
    public set cost(value: number) {this._cost = value}

    public upgrade(by:number = 1){
        console.log("upgrade clicked")
        this.level += by;
        for(let i = 0; i < 1; i++){
            console.log("loop")
            this.cost = this.costUpdater(this.cost)
        }
    }
}