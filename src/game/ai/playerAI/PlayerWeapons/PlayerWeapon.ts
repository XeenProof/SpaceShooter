import Weapon from "../../../../utils/WeaponManager/Weapon";
import PlayerActor from "../../../actors/PlayerActor";
import PlayerController from "../PlayerController";


export default abstract class PlayerWeapon extends Weapon{
    protected owner: PlayerActor
    protected parent: PlayerController
    protected levelRequirement: number

    constructor(owner: PlayerActor, parent: PlayerController, level: number = 0){
        super(owner, parent)
        this.levelRequirement = level
    }

    public get activated():boolean{
        return this.owner.attackUpgradeLevel >= this.levelRequirement
    }
}