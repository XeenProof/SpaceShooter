import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import HoarderActor from "../../actors/EnemyActors/HoarderActor";
import BasicEnemyAI from "../abstractAI/BasicEnemyAI";


export default class HoarderBehavior extends BasicEnemyAI{
    protected override owner: HoarderActor;
    protected stopAI(): void {}
    
    public get faceDir():Vec2{return (this.dir)?this.dir:Vec2.UP}
    public get rotation():number{return Vec2.UP.angleToCCW(this.faceDir)}

    public activate(options: Record<string, any>): void {
        super.activate(options)
        this.owner.resetDrops(.1,.2,.3,.4,.5,.6,.7,.8,.9)
    }

    public update(deltaT: number): void {
        super.update(deltaT)
    }

    protected updateData(): void {
        this.owner.rotation = this.rotation
        super.updateData()
    }
}