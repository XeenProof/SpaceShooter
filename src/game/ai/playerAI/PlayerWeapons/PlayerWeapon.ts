import PlayerActor from "../../../actors/PlayerActor";
import PlayerController from "../PlayerController";


export default abstract class PlayerWeapon{
    protected owner: PlayerActor
    protected parent: PlayerController

    constructor(owner: PlayerActor, parent: PlayerController){
        this.owner = owner
        this.parent = parent
    }

    public get activated():boolean{return true;}

    public get listToFire():Record<string, any>[]{
        return this.activated?this.projectileList:[]
    }

    public abstract get projectileList():Record<string, any>[]
}