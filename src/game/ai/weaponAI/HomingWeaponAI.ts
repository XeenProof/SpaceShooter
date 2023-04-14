import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import DamageActor from "../../actors/abstractActors/DamageActor";
import HPActor from "../../actors/abstractActors/HPActor";
import BasicWeaponAI from "./BasicWeaponAI";

export default class HomingWeaponAI extends BasicWeaponAI{
    protected override owner: DamageActor;

    protected target: HPActor;

    public activate(options: Record<string, any>): void {
        super.activate(options)
        this.updateTarget()
    }

    protected updateData(): void {
        if(this.pathCompleted){
            this.handleHomingAspect()
        }
        super.updateData()
        this.owner.rotation = this.rotation
    }

    protected updateTarget():void{
        this.target = this.owner.getScene().getClosestEnemy(this.owner.position)
    }

    protected get targetDir():Vec2{
        return this.owner.position.dirTo(this.target.position)
    }
    protected get hasTarget():boolean{
        return !(this.target == null || !this.target.visible)
    }

    private handleHomingAspect():void{
        if(!this.hasTarget){this.updateTarget()}
        if(!this.hasTarget){return;}
        this.nextDir = this.targetDir
    }
}