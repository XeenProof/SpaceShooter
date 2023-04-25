import Scene from "../../Wolfie2D/Scene/Scene";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";


export default abstract class LevelSelect<T extends Scene>{
    private _sceneManager: SceneManager;
    private _scene: new (...args: any) => T;
    private _options: Record<string, any>;

    constructor(manager:SceneManager,constr:new (...args: any) => T, options:Record<string,any> = {}){
        this.scene = constr
        this.options = options
        this.sceneManager = manager
    }

    public handleDisplayUpdate():void{
        if(this.unlocked){this.settingsIfUnlocked()}
        else{this.settingsIfLocked()}
    }

    get unlocked():boolean{
        return true
    }

    abstract settingsIfLocked():void
    abstract settingsIfUnlocked():void

    protected get options(): Record<string, any> {return this._options;}
    protected set options(value: Record<string, any>) {this._options = value;}
    protected get scene(): new (...args: any) => T {return this._scene;}
    protected set scene(value: new (...args: any) => T) {this._scene = value;}
    protected get sceneManager(): SceneManager {return this._sceneManager;}
    protected set sceneManager(value: SceneManager) {this._sceneManager = value;}
}