import Shape from "../../../Wolfie2D/DataTypes/Shapes/Shape";
import Spritesheet from "../../../Wolfie2D/DataTypes/Spritesheet";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import MookActor from "../EnemyActors/MookActor"


export default class Level1MookActor extends MookActor{
    private initHalfSize:Vec2

    public constructor(sheet: Spritesheet){
        super(sheet)
    }

    public takeDamage(damage: number): boolean {
        let bool = super.takeDamage(damage)
        if(bool){
            this.scale.set(this.percentHealth*2+1, this.percentHealth*2+1)
            this.collisionShape.halfSize.set(this.initHalfSize.x*this.scale.x/3, this.initHalfSize.y*this.scale.y/3)
        }
        return bool
    }

    public addPhysics(collisionShape?: Shape, colliderOffset?: Vec2, isCollidable?: boolean, isStatic?: boolean): void {
        super.addPhysics(collisionShape, colliderOffset, isCollidable, isStatic)
        this.initHalfSize = this.collisionShape.halfSize.clone()
    }
}