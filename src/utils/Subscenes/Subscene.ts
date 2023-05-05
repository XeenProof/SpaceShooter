import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import ResourceManager from "../../Wolfie2D/ResourceManager/ResourceManager";
import FactoryManager from "../../Wolfie2D/Scene/Factories/FactoryManager";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";


export default class Subscene{
    protected scene:Scene
    protected add:FactoryManager
    private _active: boolean;
    protected viewport: Viewport
    protected layers:Layer[]
    protected _hidden:boolean

    constructor(scene:Scene, add:FactoryManager, viewport:Viewport, activated:boolean = true, hidden:boolean = false){
        this.scene = scene
        this.add = add
        this.viewport = viewport
        this.layers = []
        this.hidden = hidden
        this.active = activated
    }

    protected activate():void{}
    protected deactivate():void{}

    public get active(): boolean {return this._active;}
    public set active(value: boolean) {
        this._active = value;
        if(value){this.activate()}
        else{this.deactivate()}
    }

    public loadScene(): void {}
    public startScene(): void {}
    public updateScene(deltaT: number): void {}
    public unloadScene(): void {}

    public addLayer(key:string, depth:number = 0):void{
        let layer = this.scene.addLayer(key, depth)
        layer.setHidden(this.hidden)
        this.layers.push(layer)
    }
    public getLayer(key:string):Layer{return this.scene.getLayer(key)}

    public get hidden():boolean{return this._hidden}
    public set hidden(value:boolean){
        this._hidden = value
        for(let l of this.layers){
            l.setHidden(value)
        }
    }
    
    protected get center():Vec2{return this.viewport.getCenter()}
    protected get load():ResourceManager{return this.scene.load}
}