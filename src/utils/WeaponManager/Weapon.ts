import AI from "../../Wolfie2D/DataTypes/Interfaces/AI";
import GameNode from "../../Wolfie2D/Nodes/GameNode";

export default abstract class Weapon{
    protected owner: GameNode
    protected parent: AI

    constructor(owner: GameNode, parent: AI){
        this.owner = owner
        this.parent = parent
    }

    public get activated():boolean{return true;}

    public get listToFire():Record<string, any>[]{
        return this.activated?this.projectileList:[]
    }

    public abstract get projectileList():Record<string, any>[]
}