import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import { EnemyProjectileKeys } from "../../../../constants/projectiles/projectileData";
import Weapon from "../../../../utils/WeaponManager/Weapon";
import Level3MookActor from "../../../actors/BossActors/Level1MookActor";
import Level3MookBehavior from "./Level3MookBehavior";

export default abstract class Level3MookWeapons extends Weapon{
    protected owner: Level3MookActor
    protected parent: Level3MookBehavior
    constructor(owner: Level3MookActor, parent: Level3MookBehavior){
        super(owner, parent)
    }
}

export class OctoShot extends Level3MookWeapons{
    private list:Vec2[] = [Vec2.DOWN,
        new Vec2(-1,1).normalize(),new Vec2(1,1).normalize(),
    ]
    private get defaultValues(): Record<string, any>{
        return {
            key: EnemyProjectileKeys.LEVEL3_BOSS_BEAM,
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

export class OctoShotV2 extends Level3MookWeapons{
    private list:Vec2[] = [Vec2.DOWN,
        new Vec2(-1,2).normalize(),
        new Vec2(1,2).normalize(),
        new Vec2(-2,1).normalize(),
        new Vec2(2,1).normalize(),
        new Vec2(1,1).normalize(),
        new Vec2(-1,1).normalize(),
    ]
    private get defaultValues(): Record<string, any>{
        return {
            key: EnemyProjectileKeys.ENEMY_BEAM_BLUE,
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