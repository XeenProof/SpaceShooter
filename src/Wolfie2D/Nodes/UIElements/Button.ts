import Label from "./Label";
import Color from "../../Utils/Color";
import Vec2 from "../../DataTypes/Vec2";

/** A clickable button UIElement */
export default class Button extends Label {
	private _disable: boolean;

	constructor(position: Vec2, text: string){
		super(position, text);
		
		this.backgroundColor = new Color(150, 75, 203);
		this.borderColor = new Color(41, 46, 30);
		this.textColor = new Color(255, 255, 255);
		this.disable = false
	}

	public get disable(): boolean {return this._disable;}
	public set disable(value: boolean) {this._disable = value;}

	// @override
	calculateBackgroundColor(): Color {
		// Change the background color if clicked or hovered
		if(this.isEntered && !this.isClicked && !this.disable){
			return this.backgroundColor.lighten();
		} else if(this.isClicked && !this.disable){
			return this.backgroundColor.darken();
		} else {
			return this.backgroundColor;
		}
	}
}