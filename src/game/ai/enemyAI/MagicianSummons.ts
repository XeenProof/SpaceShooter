import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import { AllEnemyKeys } from "../../../constants/enemies/enemyData";
import Summons from "../../../utils/SummonsManager/Summons";
import MagicianActor from "../../actors/EnemyActors/MagicianActor";
import MagicianBehavior from "./MagicianBehavior";


export default abstract class MagicianSummon extends Summons{
    protected override owner: MagicianActor
    protected override parent: MagicianBehavior
    constructor(owner: MagicianActor, parent: MagicianBehavior, key:string, max:number = 0){
        super(owner, parent, key, max)
    }
}

export class StarSummons extends MagicianSummon{
    private get defaultValues():Record<string, any>{
        return {
            summonKey:this.key,
            src: this.owner.position
        }
    }
    constructor(owner: MagicianActor, parent: MagicianBehavior, key:string){
        super(owner, parent, key, 1)
    }
    public get summonsList(): Record<string, any>[] {
        return [
            {...this.defaultValues, enemyType: AllEnemyKeys.COMMON_MOOK},]
    }
}