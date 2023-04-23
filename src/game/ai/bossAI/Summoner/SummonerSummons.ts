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
        {y:500, x:50, speed: 300, thresh: 300, repeat:-1},
        {y:500, x:250, speed: 300, thresh: 300, repeat:-1},
        {y:500, x:450, speed: 300, thresh: 300, repeat:-1},
        {y:500, x:650, speed: 300, thresh: 300, repeat:-1},
        {y:500, x:850, speed: 300, thresh: 300, repeat:-1},
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
        let list  = this.paths.map((x)=>{return{
            ...this.defaultValues,
            enemyType: AllEnemyKeys.SHIELDED_MOOK,
            path: [x]
        }})
        console.log(list)
        return list
    }
}

export class SummonerBackRank extends SummonerSummon{
    private get paths():Record<string, any>[]{return [
        {y:100, x:150, speed: 300, thresh: 300, repeat:-1},
        {y:100, x:350, speed: 300, thresh: 300, repeat:-1},
        {y:100, x:550, speed: 300, thresh: 300, repeat:-1},
        {y:100, x:750, speed: 300, thresh: 300, repeat:-1},
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
            enemyType: AllEnemyKeys.COMMON_MOOK,
            path: [x]
        }})
        console.log(list)
        return list
    }
}