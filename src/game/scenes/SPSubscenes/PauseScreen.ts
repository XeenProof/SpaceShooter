import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Sprite from "../../../Wolfie2D/Nodes/Sprites/Sprite";
import Button from "../../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import FactoryManager from "../../../Wolfie2D/Scene/Factories/FactoryManager";
import Scene from "../../../Wolfie2D/Scene/Scene";
import Viewport from "../../../Wolfie2D/SceneGraph/Viewport";
import Color from "../../../Wolfie2D/Utils/Color";
import { Events } from "../../../constants/events";
import { Layers } from "../../../constants/layers";
import Subscene from "../../../utils/Subscenes/Subscene";

export default class PauseScreen extends Subscene{
    private bg:Sprite
    private pauseText:Label
    private buttonsList:Button[]

    constructor(scene:Scene, add:FactoryManager, viewport:Viewport){
        super(scene, add, viewport, false, true)
        this.buttonsList = []
        console.log(this.hidden)
    }

    public loadScene(): void {
        this.load.image("PauseBackground","assets/sprites/pausebackground.png");
    }

    public startScene(): void {
        this.initLayers()
        this.initPauseScene()
    }

    protected initLayers():void{
        this.addLayer(Layers.PAUSE_BACKGROUND, 99);
		this.addLayer(Layers.PAUSE, 100);
    }

    protected activate(): void {
        this.hidden = false
    }

    protected deactivate(): void {
        this.hidden = true
    }

    protected initPauseScene():void{
		const bgPaused = this.add.sprite("PauseBackground", Layers.PAUSE_BACKGROUND);
		bgPaused.scale.set(0.5, 0.5);
		bgPaused.position.copy(new Vec2(this.center.x-100, this.center.y));
        this.bg = bgPaused

		const pauseText = <Label> this.add.uiElement(UIElementType.LABEL, Layers.PAUSE, {position: new Vec2(this.center.x-100, this.center.y - 120), text: "PAUSE"});
		pauseText.textColor = Color.WHITE
        this.pauseText = pauseText

		const cont = <Button>this.add.uiElement(UIElementType.LABEL, Layers.PAUSE, {position: new Vec2(this.center.x-100, this.center.y - 40), text: "CONTINUE"});
		cont.size.set(200, 50);
		cont.backgroundColor= Color.YELLOW
		cont.borderWidth=5;
		cont.borderColor=Color.BLACK;
		cont.onClickEventId = Events.PAUSE
		cont.onClickEventData = {pausing: false}
		this.buttonsList.push(cont)

		const controls = <Button>this.add.uiElement(UIElementType.LABEL, Layers.PAUSE, {position: new Vec2(this.center.x-100, this.center.y + 20), text: "CONTROLS"});
		controls.size.set(200, 50);
		controls.backgroundColor= Color.YELLOW;
		controls.borderWidth=5;
		controls.borderColor=Color.BLACK;
		controls.onClickEventId=Events.CONTROLS;
        this.buttonsList.push(controls)

		const exit = <Button>this.add.uiElement(UIElementType.LABEL, Layers.PAUSE, {position: new Vec2(this.center.x-100, this.center.y+80), text: "EXIT"});
		exit.size.set(200, 50);
		exit.backgroundColor= Color.YELLOW;
		exit.borderWidth=5;
		exit.borderColor=Color.BLACK;
		exit.onClickEventId=Events.EXIT;
        this.buttonsList.push(exit)
	}
}