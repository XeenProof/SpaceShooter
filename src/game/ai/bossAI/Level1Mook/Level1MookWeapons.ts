import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import { EnemyProjectileKeys } from "../../../../constants/projectiles/projectileData";
import Weapon from "../../../../utils/WeaponManager/Weapon";
import Level1MookActor from "../../../actors/BossActors/Level1MookActor";
import Level1MookBehavior from "./Level1MookBehavior";

export default abstract class Level1MookWeapons extends Weapon{
    protected owner: Level1MookActor
    protected parent: Level1MookBehavior
    constructor(owner: Level1MookActor, parent: Level1MookBehavior){
        super(owner, parent)
    }
}

export class OctoShot extends Level1MookWeapons{
    private list:Vec2[] = [Vec2.UP, Vec2.DOWN, Vec2.LEFT, Vec2.RIGHT,
        new Vec2(-1,-1).normalize(),new Vec2(1,-1).normalize(),new Vec2(-1,1).normalize(),new Vec2(1,1).normalize(),
    ]
    private get defaultValues(): Record<string, any>{
        return {
            key: EnemyProjectileKeys.ENEMY_BEAM_GREEN,
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

export class OctoShotV2 extends Level1MookWeapons{
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
            key: EnemyProjectileKeys.ENEMY_BEAM_GREEN,
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