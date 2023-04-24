import PersonMookBehavior from "./PersonMookBehavior";
import { EnemyProjectileKeys } from "../../../constants/projectiles/projectileData";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import PersonMookActor from "../../actors/EnemyActors/PersonMookActor";
import Weapon from "../../../utils/WeaponManager/Weapon";

export default abstract class PersonMookWeapons extends Weapon{
    protected owner: PersonMookActor
    protected parent: PersonMookBehavior
    constructor(owner: PersonMookActor, parent: PersonMookBehavior){
        super(owner, parent)
    }
}

export class ConeShot extends PersonMookWeapons{
    private list:Vec2[] = [Vec2.DOWN, Vec2.LEFT, Vec2.RIGHT,
        new Vec2(1,1).normalize(),
        new Vec2(-1,1).normalize(),
    ]
    private get defaultValues(): Record<string, any>{
        return {
            key: EnemyProjectileKeys.ENEMY_BEAM_CYAN,
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