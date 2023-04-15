import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import { PlayerProjectileKeys } from "../../../../constants/projectiles/projectileData";
import PlayerWeapon from "./PlayerWeapon";


export default class QuadHomingBeam extends PlayerWeapon{
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