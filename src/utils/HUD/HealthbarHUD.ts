import Updateable from "../../Wolfie2D/DataTypes/Interfaces/Updateable";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import HPActor from "../../game/actors/abstractActors/HPActor";
import HealthBarUser from "./HealthBarUser";


interface HealthBarOptions {
    size: Vec2;
    offset: Vec2;
    color?: Color;
    colors?: {
        highColor: Color,
        midColor: Color,
        lowColor: Color,
    };
}

/**
 * A UI component that's suppossed to represent a healthbar
 */
export default class HealthbarHUD implements Updateable {

    /** The scene and layer in the scene the healthbar is in */
    protected scene: Scene;
    protected layer: string;

    /** The GameNode that owns this healthbar */
    protected owner: HealthBarUser;

    /** The size and offset of the healthbar from it's owner's position */
    protected size: Vec2;
    protected offset: Vec2;

    /** The actual healthbar (the part with color) */
    protected healthBar: Label;
    /** The healthbars background (the part with the border) */
    protected healthBarBg: Label;

    private highColor = Color.GREEN;
    private midColor = Color.YELLOW;
    private lowColor = Color.RED;

    public constructor(scene: Scene, owner: HealthBarUser, layer: string, options: HealthBarOptions) {
        this.scene = scene;
        this.layer = layer;
        this.owner = owner;

        this.highColor = options.color?options.color:(options.colors?options.colors.highColor:Color.GREEN);
        this.midColor = options.color?options.color:(options.colors?options.colors.midColor:Color.YELLOW);
        this.lowColor = options.color?options.color:(options.colors?options.colors.lowColor:Color.RED);

        this.size = options.size;
        this.offset = options.offset;

        this.healthBar = <Label>this.scene.add.uiElement(UIElementType.LABEL, layer, {position: this.owner.position.clone().add(this.offset), text: ""});
        this.healthBar.size.copy(this.size);
        this.healthBar.backgroundColor = Color.RED;

        this.healthBarBg = <Label>this.scene.add.uiElement(UIElementType.LABEL, layer, {position: this.owner.position.clone().add(this.offset), text: ""});
        this.healthBarBg.backgroundColor = Color.TRANSPARENT;
        this.healthBarBg.borderColor = Color.BLACK;
        this.healthBarBg.borderWidth = 1;
        this.healthBarBg.size.copy(this.size);
    }

    /**
     * Updates the healthbars position according to the position of it's owner
     * @param deltaT 
     */
    public update(deltaT: number): void {  
        this.healthBar.position.copy(this.owner.position).add(this.offset);
        this.healthBarBg.position.copy(this.owner.position).add(this.offset);

        let scale = this.scene.getViewScale();
        this.healthBar.scale.scale(scale);
        this.healthBarBg.scale.scale(scale);

        let unit = this.healthBarBg.size.x / this.owner.maxHealth;
		this.healthBar.size.set(this.healthBarBg.size.x - unit * (this.owner.maxHealth - this.owner.health), this.healthBarBg.size.y);
		this.healthBar.position.set(this.healthBarBg.position.x - (unit / scale / 2) * (this.owner.maxHealth - this.owner.health), this.healthBarBg.position.y);

		this.healthBar.backgroundColor = this.owner.health < this.owner.maxHealth * 1/4 ? this.lowColor : this.owner.health < this.owner.maxHealth * 3/4 ? this.midColor : this.highColor;
    }

    get ownerId(): number { return this.owner.id; }

    set visible(visible: boolean) {
        this.healthBar.visible = visible;
        this.healthBarBg.visible = visible;
    }
    

}