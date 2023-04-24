import GameNode from "../../../../Wolfie2D/Nodes/GameNode";
import { AllEnemyKeys } from "../../../../constants/enemies/enemyData";
import Summons from "../../../../utils/SummonsManager/Summons";
import MegaMookActor from "../../../actors/BossActors/MegaMookActor";
import MegaMookBehavior from "./MegaMookBehavior";

export default abstract class MegaMookSummon extends Summons{
    protected override owner: MegaMookActor
    protected override parent: MegaMookBehavior
    constructor(owner: MegaMookActor, parent: MegaMookBehavior, key:string, max:number = 0){
        super(owner, parent, key, max)
    }
}

export class RegularMookSummons extends MegaMookSummon{
    private get defaultValues():Record<string, any>{
        return {
            summonKey:this.key,
            src: this.owner.position
        }
    }
    constructor(owner: MegaMookActor, parent: MegaMookBehavior, key:string){
        super(owner, parent, key, 5)
    }
    public get summonsList(): Record<string, any>[] {
        return [
            {...this.defaultValues, enemyType: AllEnemyKeys.TARGETED_MOOK},]
    }
}