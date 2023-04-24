import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import { EnemyProjectileKeys } from "../../../../constants/projectiles/projectileData";
import Weapon from "../../../../utils/WeaponManager/Weapon";
import MegaMookActor from "../../../actors/BossActors/MegaMookActor";
import MegaMookBehavior from "./MegaMookBehavior";

export default abstract class MegaMookWeapon extends Weapon{
    protected owner: MegaMookActor
    protected parent: MegaMookBehavior
    constructor(owner: MegaMookActor, parent: MegaMookBehavior){
        super(owner, parent)
    }
}

export class OctoShot extends MegaMookWeapon{
    private list:Vec2[] = [Vec2.UP, Vec2.DOWN, Vec2.LEFT, Vec2.RIGHT,
        new Vec2(-1,-1).normalize(),new Vec2(1,-1).normalize(),new Vec2(-1,1).normalize(),new Vec2(1,1).normalize(),
    ]
    private get defaultValues(): Record<string, any>{
        return {
            key: EnemyProjectileKeys.ENEMY_BEAM_PURPLE,
            src: this.owner.position,
            id: this.owner.id
        }
    }
    public get projectileList(): Record<string, any>[] {
        return this.list.map((x)=>{return{
            ...this.defaultValues,
            dir: x
        }})
    }
}

export class OctoShotV2 extends MegaMookWeapon{
    private list:Vec2[] = [
        new Vec2(-1,-2).normalize(),
        new Vec2(-1,2).normalize(),
        new Vec2(1,-2).normalize(),
        new Vec2(1,2).normalize(),
        new Vec2(-2,-1).normalize(),
        new Vec2(-2,1).normalize(),
        new Vec2(2,-1).normalize(),
        new Vec2(2,1).normalize(),
    ]
    private get defaultValues(): Record<string, any>{
        return {
            key: EnemyProjectileKeys.ENEMY_BEAM_PURPLE,
            src: this.owner.position,
            id: this.owner.id
        }
    }
    public get projectileList(): Record<string, any>[] {
        return this.list.map((x)=>{return{
            ...this.defaultValues,
            dir: x
        }})
    }
}