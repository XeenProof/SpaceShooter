import { AllEnemyKeys } from "../../../../constants/enemies/enemyData";
import Summons from "../../../../utils/SummonsManager/Summons";
import SummonerActor from "../../../actors/BossActors/SummonerActor";
import SummonerBehavior from "./SummonerBehavior";


export default abstract class SummonerSummon extends Summons{
    protected override owner: SummonerActor
    protected override parent: SummonerBehavior
    constructor(owner: SummonerActor, parent: SummonerBehavior, key:string, max:number = 0){
        super(owner, parent, key, max)
    }
}

export class SummonerShieldWall extends SummonerSummon{
    private get paths():Record<string, any>[]{return [
        {y:600, x:50, speed: 100, thresh: 300, wait:0},
        {y:600, x:250, speed: 100, thresh: 300, wait:0},
        {y:600, x:450, speed: 100, thresh: 300, wait:0},
        {y:600, x:650, speed: 100, thresh: 300, wait:0},
        {y:600, x:850, speed: 100, thresh: 300, wait:0},
    ]}
    private get defaultValues():Record<string, any>{
        return {
            summonKey:this.key,
            src: this.owner.position
        }
    }
    constructor(owner: SummonerActor, parent: SummonerBehavior, key:string){
        super(owner, parent, key, 1)
    }
    public get summonsList():Record<string, any>[]{
        console.log("before list")
        let list  = this.paths.map((x)=>{return{
            ...this.defaultValues,
            enemyType: AllEnemyKeys.TARGETED_MOOK,
            path: [x]
        }})
        console.log(list)
        return list
    }
}