import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { PlayerProjectileKeys } from "../../../constants/projectiles/projectileData";
import Weapon from "../../../utils/WeaponManager/Weapon";
import PlayerActor from "../../actors/PlayerActor";
import PlayerController from "./PlayerController";


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

export class BasicBeam extends PlayerWeapon{
    public get projectileList(): Record<string, any>[] {
        return [{key: PlayerProjectileKeys.BEAM, src: this.owner.position, dir: Vec2.UP, id: this.owner.id}]
    }
}

export class SideBackBeam extends PlayerWeapon{
    private get defaultValues(): Record<string, any>{
        return {
            key: PlayerProjectileKeys.BEAM,
            src: this.owner.position,
            id: this.owner.id
        }
    }

    public get projectileList(): Record<string, any>[] {
        return [
            {...this.defaultValues, dir: Vec2.LEFT},
            {...this.defaultValues, dir: Vec2.RIGHT},
            {...this.defaultValues, dir: Vec2.DOWN}
        ]
    }
}

export class TargetedBeam extends PlayerWeapon{
    public get projectileList(): Record<string, any>[] {
        return [{key: PlayerProjectileKeys.TARGETED_BEAM, 
            src: this.owner.position, 
            dir: this.parent.playerMouseDir, 
            id: this.owner.id}]
    }
}

export class QuadHomingBeam extends PlayerWeapon{
    private list:Vec2[] = [new Vec2(-100,200), new Vec2(-200,100), new Vec2(100,200), new Vec2(200,100)]
    private get defaultValues(): Record<string, any>{
        return {
            key: PlayerProjectileKeys.TARGETED_BEAM,
            src: this.owner.position,
            id: this.owner.id
        }
    }

    public get projectileList(): Record<string, any>[] {
        let src = this.owner.position
        let positions = this.list.map((pos)=>{return {x:pos.x+src.x, y:pos.y+src.y, speed: 300}})
        return positions.map((x)=>{
            return {
                ...this.defaultValues,
                path: [x],
                speed: 600
            }
        })
    }
}