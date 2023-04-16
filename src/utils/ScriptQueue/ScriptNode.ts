

export default class ScriptNode {
    private _type: string
    private _options: Record<string, any>
    private _chance: number
    private _repeat: number

    constructor(type: string, options: Record<string, any>, chance:number = 1, repeat:number = 0){
        this._type = type
        this._options = options,
        this._chance = chance,
        this._repeat = repeat
    }

    public get type(): string {return this._type}
    public get options(): Record<string, any> {return this._options}
    public get chance(): number{return this._chance}
    public used():void{if(this._repeat > 0){this._repeat-=1}}
    public get repeat(): boolean {return (this._repeat > 0 || this._repeat == -1)}
}