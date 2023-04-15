import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import { GAMEPLAY_DIMENTIONS } from "../../../constants/dimenstions";
import { PlayerProjectileKeys } from "../../../constants/projectiles/projectileData";
import Weapon from "../../../utils/WeaponManager/Weapon";
import PlayerActor from "../../actors/PlayerActor";
import PlayerController from "./PlayerController";


export default abstract class PlayerWeapon extends Weapon{
    protected owner: PlayerActor
    protected parent: PlayerController
    protected levelRequirement: number
    protected upperRequirement: number

    constructor(owner: PlayerActor, parent: PlayerController, level: number = 0, upperlevel: number = Infinity){
        super(owner, parent)
        this.levelRequirement = level
        this.upperRequirement = upperlevel
    }

    public get activated():boolean{
        return this.owner.attackUpgradeLevel >= this.levelRequirement && this.owner.attackUpgradeLevel <= this.upperRequirement
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

export class DiagonalBeam extends PlayerWeapon{
    private list:Vec2[] = [new Vec2(1,1).normalize(), new Vec2(-1,1).normalize(), new Vec2(1,-1).normalize(), new Vec2(-1,-1).normalize()]
    private get defaultValues(): Record<string, any>{
        return {
            key: PlayerProjectileKeys.BEAM,
            src: this.owner.position,
            id: this.owner.id
        }
    }

    public get projectileList(): Record<string, any>[] {
        return this.list.map((x)=>{
            return {
                ...this.defaultValues,
                dir: x
            }
        })
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

export class MiniBarrage extends PlayerWeapon{
    private screenwidthend = GAMEPLAY_DIMENTIONS.XEND
    private screenwidthstart = GAMEPLAY_DIMENTIONS.XSTART
    private get screenwidth():number {return this.screenwidthend-this.screenwidthstart}
    private projectileCount:number = 7;
    private getValues(value:number):{x:number, speed:number}{
        let divided = this.screenwidth/this.projectileCount
        let half = divided/2
        let x = divided*value+half
        let speed = Math.abs(this.owner.position.x-x)
        return {x:x, speed:speed}
    }
    private get list():{x:number, speed:number}[] {
        let list:{x:number, speed:number}[] = []
        for(let i = 0; i < this.projectileCount; i++){
            list.push(this.getValues(i))
        }
        return list
    }
    private get defaultValues(): Record<string, any>{
        return {
            key: PlayerProjectileKeys.BEAM,
            src: this.owner.position,
            id: this.owner.id,
            dir: Vec2.UP,
            speed: 600
        }
    }
    
    public get projectileList(): Record<string, any>[] {
        let positions = this.list.map((x)=>{return {
            ...x,
            y: this.owner.position.y
        }})
        return positions.map((x)=>{
            return{
                ...this.defaultValues,
                path: [x]
            }
        })
    }
}

export class HomingBarrage extends PlayerWeapon{
    private screenwidthend = GAMEPLAY_DIMENTIONS.XEND
    private screenwidthstart = GAMEPLAY_DIMENTIONS.XSTART
    private get screenwidth():number {return this.screenwidthend-this.screenwidthstart}
    private projectileCount:number = 5;
    private getValues(value:number):{x:number, speed:number}{
        let divided = this.screenwidth/this.projectileCount
        let half = divided/2
        let x = divided*value+half
        let speed = Math.abs(this.owner.position.x-x)
        return {x:x, speed:speed}
    }
    private get list():{x:number, speed:number}[] {
        let list:{x:number, speed:number}[] = []
        for(let i = 0; i < this.projectileCount; i++){
            list.push(this.getValues(i))
        }
        return list
    }
    private get defaultValues(): Record<string, any>{
        return {
            key: PlayerProjectileKeys.TARGETED_BEAM,
            src: this.owner.position,
            id: this.owner.id,
            speed: 600
        }
    }
    
    public get projectileList(): Record<string, any>[] {
        let positions = this.list.map((x)=>{return {
            ...x,
            y: this.owner.position.y
        }})
        return positions.map((x)=>{
            return{
                ...this.defaultValues,
                path: [x]
            }
        })
    }
}