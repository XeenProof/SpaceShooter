

export default class ScriptNode {
    private _type: string
    private _options: Record<string, any>

    constructor(type: string, options: Record<string, any>){
        this._type = type
        this._options = options
    }

    public get type(): string {return this._type}
    public get options(): Record<string, any> {return this._options}
}