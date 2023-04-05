import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { GAMEPLAY_DIMENTIONS } from "../../../constants/dimenstions";
import Spawnable from "../../../utils/Interface/Spawnable";
import ActorScene from "../../scenes/ActorScene";
import BaseScene from "../../scenes/BaseScene";

export default abstract class SpawnableActor extends AnimatedSprite{

    protected scene: ActorScene;
    public override getScene() {return this.scene;}
    public override setScene(value: ActorScene) {this.scene = value;}

    private _canDespawn = true;
    public get canDespawn() {return this._canDespawn;}
    public set canDespawn(value) {this._canDespawn = value;}

    spawn(options: Record<string, any>): void {
        this.visible = true;
        this.setAIActive(true, options)
    }
    attemptDespawn(options: Record<string, any> = {}):void{if(this.despawnConditions(options) && this.canDespawn){this.despawn()}}
    
    despawn(): void {
        this.visible = false;
    }

    abstract despawnConditions(options: Record<string, any>): boolean

    /** Some useful functions*/
    public get onScreen(): boolean{return !this.offScreen}
    public get offScreen(): boolean{return (this.offScreenDown || this.offScreenUp || this.offScreenLeft || this.offScreenRight)}
    public get offScreenDown(): boolean{return (this.position.y > GAMEPLAY_DIMENTIONS.YEND);}
    public get offScreenUp(): boolean{return (this.position.y < GAMEPLAY_DIMENTIONS.YSTART);}
    public get offScreenLeft(): boolean{return (this.position.x < GAMEPLAY_DIMENTIONS.XSTART);}
    public get offScreenRight():boolean{return (this.position.x > GAMEPLAY_DIMENTIONS.XEND);}
    
}