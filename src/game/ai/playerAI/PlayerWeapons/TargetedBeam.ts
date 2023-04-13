import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import { PlayerProjectileKeys } from "../../../../constants/projectiles/projectileData";
import PlayerWeapon from "./PlayerWeapon";


export default class TargetedBeam extends PlayerWeapon{
    public get activated(): boolean {
        return this.owner.attackUpgradeLevel >= 1
    }
    public get projectileList(): Record<string, any>[] {
        return [{key: PlayerProjectileKeys.TARGETED_BEAM, src: this.owner.position, dir: this.parent.playerMouseDir, id: this.owner.id}]
    }
}