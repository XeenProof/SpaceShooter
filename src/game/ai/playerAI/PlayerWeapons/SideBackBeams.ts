import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import { PlayerProjectileKeys } from "../../../../constants/projectiles/projectileData";
import PlayerWeapon from "./PlayerWeapon";


export default class SideBackBeam extends PlayerWeapon{

    public get defaultValues(): Record<string, any>{
        return {
            key: PlayerProjectileKeys.BEAM,
            src: this.owner.position,
            id: this.owner.id
        }
    }

    public get activated(): boolean {
        return this.owner.attackUpgradeLevel >= 2
    }

    public get projectileList(): Record<string, any>[] {
        return [
            {...this.defaultValues, dir: Vec2.LEFT},
            {...this.defaultValues, dir: Vec2.RIGHT},
            {...this.defaultValues, dir: Vec2.DOWN}
        ]
    }
}