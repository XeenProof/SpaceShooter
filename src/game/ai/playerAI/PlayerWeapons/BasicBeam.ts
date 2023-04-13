import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import { PlayerProjectileKeys } from "../../../../constants/projectiles/projectileData";
import PlayerWeapon from "./PlayerWeapon";


export default class BasicBeam extends PlayerWeapon{
    public get projectileList(): Record<string, any>[] {
        return [{key: PlayerProjectileKeys.BEAM, src: this.owner.position, dir: Vec2.UP, id: this.owner.id}]
    }
}