import Button from "../../../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../../../Wolfie2D/Nodes/UIElements/Label";
import Color from "../../../../Wolfie2D/Utils/Color";
import { cheats } from "../../../../constants/gameoptions";
import Checkbox from "../../../../utils/SelectionUtils/Checkbox";
import CheatCodes from "../../../../utils/Singletons/CheatCodes";


export default class CheatsCheckBox extends Checkbox{

    private _cheat: string;
    private _button: Button;
    private _text: Label;
    private defaultBackground:Color = Color.TRANSPARENT
    private hoverbackground:Color = new Color(255,255,255,0.25);
    
    constructor(button: Button, text:Label, cheat:string, options:Record<string, any>={}){
        super()
        this.button = button
        this.text = text
        this.cheat = cheat
        this.initData(options)
    }

    protected initData(options:Record<string, any>={}):void{
        this.button.size.set(50, 50);
        this.button.borderWidth = 2;
        this.button.borderColor = Color.YELLOW;
        this.button.backgroundColor = Color.TRANSPARENT;
        this.button.onClick = () => {this.clickEvent()}

        this.text.textColor = Color.YELLOW
        this.text.fontSize = options.fontSize?options.fontSize:40
        
        this.handleDisplayUpdate()
    }

    private clickEvent():void{
        console.log("Clicked", this.cheat)
        CheatCodes.triggerCheat(this.cheat)
        this.handleDisplayUpdate()
    }

    get value():boolean{return CheatCodes.getCheat(this.cheat)}
    settingsIfTrue(): void {this.button.text = "X"}
    settingsIfFalse(): void {this.button.text = ""}

    public get cheat(): string {return this._cheat;}
    public set cheat(value: string) {this._cheat = value;}
    public get button(): Button {return this._button;}
    public set button(value: Button) {this._button = value;}
    public get text(): Label {return this._text;}
    public set text(value: Label) {this._text = value;}
}