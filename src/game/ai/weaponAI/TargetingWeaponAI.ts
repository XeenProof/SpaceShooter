import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import HPActor from "../../actors/abstractActors/HPActor";
import BasicWeaponAI from "./BasicWeaponAI";


export default class TargetingWeaponAI extends BasicWeaponAI{
    protected targetDirectionSet: boolean

    public activate(options: Record<string, any>): void {
        super.activate(options)
        this.targetDirectionSet = false
    }

    protected updateData(): void {
        if(this.pathCompleted && !this.targetDirectionSet){
            this.dir = this.targetDir
            this.speed = this.nextSpeed;
            this.targetDirectionSet = true
            return
        }
        if(!this.pathCompleted){super.updateData()}
        this.owner.rotation = this.rotation
    }

    protected get target():HPActor{return this.owner.getScene().getClosestEnemy(this.owner.position)}
    protected get targetDir():Vec2{
        let target = this.target
        return (target)?this.owner.position.dirTo(target.position):Vec2.UP
    }
}