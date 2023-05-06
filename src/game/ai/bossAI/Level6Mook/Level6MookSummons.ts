import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import { AllEnemyKeys } from "../../../../constants/enemies/enemyData";
import Summons from "../../../../utils/SummonsManager/Summons";
import Level6MookActor from "../../../actors/BossActors/Level6MookActor";
import Level6MookBehavior from "./Level6MookBehavior";


export default abstract class Level6MookSummons extends Summons{
    protected override owner: Level6MookActor
    protected override parent: Level6MookBehavior
    constructor(owner: Level6MookActor, parent: Level6MookBehavior, key:string, max:number = 0){
        super(owner, parent, key, max)
    }
}

export class Level6Star extends Level6MookSummons{
    private get paths():Record<string, any>[]{return [
        [{y:200, x:50, speed: 300, thresh: 300},{y:200, x:50, speed: 1, thresh: 300, repeat:200}],
        [{y:200, x:850, speed: 300, thresh: 300},{y:200, x:850, speed: 1, thresh: 300, repeat:400}],
        // {y:500, x:650, speed: 300, thresh: 300, repeat:300},
    ]}
    private get defaultValues():Record<string, any>{
        return {
            summonKey:this.key,
            src: this.owner.position
        }
    }
    constructor(owner: Level6MookActor, parent: Level6MookBehavior, key:string){
        super(owner, parent, key, 1)
    }
    public get summonsList():Record<string, any>[]{
        let list  = this.paths.map((x)=>{return{
            ...this.defaultValues,
            enemyType: AllEnemyKeys.STAR,
            path: x
        }})
        console.log(list)
        return list
    }
}

export class Level6Magician extends Level6MookSummons{
    private get paths():Record<string, any>[]{return [
        [{y:300, x:50, speed: 300, thresh: 300},{y:300, x:50, speed: 1, thresh: 300, repeat:-1}],
        [{y:300, x:850, speed: 300, thresh: 300},{y:300, x:850, speed: 1, thresh: 300, repeat:-1}],
    ]}
    private get defaultValues():Record<string, any>{
        return {
            summonKey:this.key,
            src: this.owner.position
        }
    }
    constructor(owner: Level6MookActor, parent: Level6MookBehavior, key:string){
        super(owner, parent, key, 1)
    }
    public get summonsList():Record<string, any>[]{
        let list  = this.paths.map((x)=>{return{
            ...this.defaultValues,
            enemyType: AllEnemyKeys.MAGICIAN_MOOK,
            path: x
        }})
        console.log(list)
        return list
    }
}

export class Level6BackRank extends Level6MookSummons{
    private counter:number
    private possibleEnemies:string[] = [AllEnemyKeys.TARGETED_MOOK, AllEnemyKeys.PERSON_MOOK,AllEnemyKeys.MAGICIAN_MOOK]
    private get nextEnemyType():string{
        let type = this.possibleEnemies[this.counter%this.possibleEnemies.length]
        this.counter++;
        return type;
    }
    private get paths():Record<string, any>[]{return [
        [{y:100, x:150, speed: 300, thresh: 300},{y:100, x:150, speed: 1, thresh: 300, repeat:-1}],
        [{y:100, x:750, speed: 300, thresh: 300},{y:100, x:750, speed: 1, thresh: 300, repeat:-1}],
    ]}
    private get defaultValues():Record<string, any>{
        return {
            summonKey:this.key,
            src: this.owner.position
        }
    }
    constructor(owner: Level6MookActor, parent: Level6MookBehavior, key:string){
        super(owner, parent, key, 1)
        this.counter = 0
    }
    public get summonsList():Record<string, any>[]{
        console.log("before list")
        let enemyType = this.nextEnemyType
        let list  = this.paths.map((x)=>{return{
            ...this.defaultValues,
            enemyType: enemyType,
            path: x
        }})
        console.log(list)
        return list
    }
}

export class Level6AtTarget extends Level6MookSummons{
    private counter:number
    private possibleEnemies:string[] = [AllEnemyKeys.TARGETED_MOOK, AllEnemyKeys.PERSON_MOOK]
    private get targetPost():{x:number, y:number}{
        let pos:Vec2 = this.parent.targetPosition
        return {x:pos.x, y:pos.y}
    }
    private get nextEnemyType():string{
        let type = this.possibleEnemies[this.counter%this.possibleEnemies.length]
        this.counter++;
        return type;
    }
    private get defaultValues():Record<string, any>{
        return {
            summonKey:this.key,
            src: this.owner.position
        }
    }
    constructor(owner: Level6MookActor, parent: Level6MookBehavior, key:string){
        super(owner, parent, key, 1)
        this.counter = 0
    }
    public get summonsList():Record<string, any>[]{
        let enemyType = this.nextEnemyType
        let pos = this.targetPost
        let list  = [{
            ...this.defaultValues,
            enemyType: enemyType,
            path:  [{speed: 300, thresh: 300, ...pos},{speed: 1, thresh: 300, repeat:-1, ...pos}]
        }]
        return list
    }
}

export class Level6Sheild extends Level6MookSummons{
    private get paths():Record<string, any>[]{return [
        [{y:500, x:150, speed: 300, thresh: 300},{y:200, x:50, speed: 1, thresh: 300, repeat:200}],
        [{y:500, x:350, speed: 300, thresh: 300},{y:300, x:50, speed: 1, thresh: 300, repeat:300}],
        [{y:500, x:550, speed: 300, thresh: 300},{y:200, x:850, speed: 1, thresh: 300, repeat:400}],
        // {y:500, x:650, speed: 300, thresh: 300, repeat:300},
        [{y:500, x:750, speed: 300, thresh: 300},{y:300, x:850, speed: 1, thresh: 300, repeat:200}],
    ]}
    private get defaultValues():Record<string, any>{
        return {
            summonKey:this.key,
            src: this.owner.position
        }
    }
    constructor(owner: Level6MookActor, parent: Level6MookBehavior, key:string){
        super(owner, parent, key, 1)
    }
    public get summonsList():Record<string, any>[]{
        let list  = this.paths.map((x)=>{return{
            ...this.defaultValues,
            enemyType: AllEnemyKeys.SHIELDED_MOOK,
            path: x
        }})
        console.log(list)
        return list
    }
}