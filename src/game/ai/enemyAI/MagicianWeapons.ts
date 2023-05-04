import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { EnemyProjectileKeys } from "../../../constants/projectiles/projectileData";
import Weapon from "../../../utils/WeaponManager/Weapon";
import MagicianActor from "../../actors/EnemyActors/MagicianActor";
import MagicianBehavior from "./MagicianBehavior";

export default abstract class MagicianWeapons extends Weapon{
    protected owner: MagicianActor
    protected parent: MagicianBehavior
    constructor(owner: MagicianActor, parent: MagicianBehavior){
        super(owner, parent)
    }
}

export class DownShot extends MagicianWeapons{
    //private list:Vec2[] = [this.parent.shootDir]
    private get defaultValues(): Record<string, any>{
        return {
            key: EnemyProjectileKeys.ENEMY_BEAM_GREEN,
            src: this.owner.position,
            id: this.owner.id
        }
    }
    public get projectileList(): Record<string, any>[] {
        return [{
            ...this.defaultValues,
            dir: this.parent.shootDir
        }]
    }
}

export class OctoShot extends MagicianWeapons{
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

export class OctoShotV2 extends MagicianWeapons{
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