import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Label from "../../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import FactoryManager from "../../../Wolfie2D/Scene/Factories/FactoryManager";
import Scene from "../../../Wolfie2D/Scene/Scene";
import Viewport from "../../../Wolfie2D/SceneGraph/Viewport";
import Color from "../../../Wolfie2D/Utils/Color";
import { Events } from "../../../constants/events";
import { Layers } from "../../../constants/layers";
import { LoadData } from "../../../constants/load";
import Subscene from "../../../utils/Subscenes/Subscene";


export default class ControlScreen extends Subscene{
    private background:LoadData

    constructor(scene:Scene, add:FactoryManager, viewport:Viewport){
        super(scene, add, viewport, false, true)
    }

    public initScene(options: Record<string, any>): void {
        console.log(options)
        this.background = options.bg
    }

    public startScene(): void {
        this.initLayers()
        this.initControlScene()
    }

    protected initLayers():void{
        /**CONTROL SCREEN RELATED*/
		this.addLayer(Layers.CONTROLS_BACKGROUND, 101);
		this.addLayer(Layers.CONTROLS, 102);
    }

    protected activate(): void {
        this.hidden = false
    }

    protected deactivate(): void {
        this.hidden = true
    }

    protected initControlScene():void{
		const bgControl = this.add.sprite(this.background.KEY, Layers.CONTROLS_BACKGROUND);
		bgControl.scale.set(this.background.SCALE.X, this.background.SCALE.Y);
		bgControl.position.copy(this.viewport.getCenter());
		
        const header = <Label>this.add.uiElement(UIElementType.LABEL,  Layers.CONTROLS, {position: new Vec2(this.center.x, this.center.y - 300), text: "Controls"});
        header.textColor = Color.YELLOW;
        header.fontSize = 50;

        const health = <Label>this.add.uiElement(UIElementType.LABEL,  Layers.CONTROLS, {position: new Vec2(this.center.x, this.center.y -200), text: "1 - Heal"});
        health.textColor = Color.YELLOW;
        health.fontSize = 50;

        const upgradeHealth = <Label>this.add.uiElement(UIElementType.LABEL, Layers.CONTROLS, {position: new Vec2(this.center.x, this.center.y -150), text: "2 - Upgrade Health"});
        upgradeHealth.textColor = Color.YELLOW;
        upgradeHealth.fontSize = 50;

        const upgradeWeapon = <Label>this.add.uiElement(UIElementType.LABEL, Layers.CONTROLS, {position: new Vec2(this.center.x, this.center.y -100), text: "3 - Upgrade Weapon"});
        upgradeWeapon.textColor = Color.YELLOW;
        upgradeWeapon.fontSize = 50;

        const w = <Label>this.add.uiElement(UIElementType.LABEL, Layers.CONTROLS, {position: new Vec2(this.center.x, this.center.y ), text: "W - Move Up"});
        w.textColor = Color.YELLOW;
        w.fontSize = 50;
        const a = <Label>this.add.uiElement(UIElementType.LABEL, Layers.CONTROLS, {position: new Vec2(this.center.x, this.center.y + 50), text: "A - Move Left"});
        a.textColor = Color.YELLOW;
        a.fontSize = 50;
        const s = <Label>this.add.uiElement(UIElementType.LABEL, Layers.CONTROLS, {position: new Vec2(this.center.x, this.center.y + 100), text: "S - Move Down"});
        s.textColor = Color.YELLOW;
        s.fontSize = 50;
        const d = <Label>this.add.uiElement(UIElementType.LABEL, Layers.CONTROLS, {position: new Vec2(this.center.x, this.center.y + 150), text: "D - Move Right"});
        d.textColor = Color.YELLOW
        d.fontSize = 50;
        const space = <Label>this.add.uiElement(UIElementType.LABEL, Layers.CONTROLS, {position: new Vec2(this.center.x, this.center.y + 200), text: "Left Click - Shoot"});
        space.textColor = Color.YELLOW;
        space.fontSize = 50;
        const E = <Label>this.add.uiElement(UIElementType.LABEL, Layers.CONTROLS, {position: new Vec2(this.center.x, this.center.y + 250), text: "E - Activate Shield"});
        E.textColor = Color.YELLOW;
        E.fontSize = 50;
        const R = <Label>this.add.uiElement(UIElementType.LABEL, Layers.CONTROLS, {position: new Vec2(this.center.x, this.center.y + 300), text: "R - Activate Booster"});
        R.textColor = Color.YELLOW;
        R.fontSize = 50;
        const ESC = <Label>this.add.uiElement(UIElementType.LABEL, Layers.CONTROLS, {position: new Vec2(this.center.x, this.center.y + 350), text: "ESC - Pause/Unpause the Game"});
        ESC.textColor = Color.YELLOW;
        ESC.fontSize = 50;

        const back = this.add.uiElement(UIElementType.BUTTON, Layers.CONTROLS, {position: new Vec2(this.center.x-400, this.center.y - 400), text: "Back"});
        back.size.set(200, 50);
        back.borderWidth = 2;
        back.borderColor = Color.YELLOW;
        back.backgroundColor = Color.TRANSPARENT;
		back.onClickEventId = Events.BACK_TO_PAUSE;
	}
}