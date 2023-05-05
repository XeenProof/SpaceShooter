import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import { Events } from "../../../../constants/events";
import SummonsManager from "../../../../utils/SummonsManager/SummonsManager";
import Level6MookActor from "../../../actors/BossActors/Level5MookActor";
import BasicEnemyAI from "../../abstractAI/BasicEnemyAI";
import Level6MookSummons, { Level6BackRank, Level6ShieldWall,Level6PersonMook } from "./Level6MookSummons";

const SUMMONS = {
    SHIELD: "SHIELD",
    BACKRANK: "BACKRANK",
    PERSON: "PERSON"
}

export default class Level6MookBehavior extends BasicEnemyAI{
    protected override owner:Level6MookActor
    private summons:SummonsManager<Level6MookSummons>
    private summonsTimerShield:Timer
    private summonsCount: number;

    public initializeAI(owner: Level6MookActor, options?: Record<string, any>): void {
        super.initializeAI(owner, options)
        this.summonsCount = 0;
        this.summons = new SummonsManager<Level6MookSummons>()
        this.summons.add(new Level6ShieldWall(this.owner, this, SUMMONS.SHIELD), 1)
        this.summons.add(new Level6BackRank(this.owner, this, SUMMONS.BACKRANK), 2)
        this.summons.add(new Level6PersonMook(this.owner, this, SUMMONS.PERSON), 3)
        this.summonsTimerShield = new Timer(3000, ()=>{this.handleSummons()}, true)
    }

    public activate(options: Record<string, any>): void {
        super.activate(options)
        this.summonsTimerShield.start()
    }

    public handleEvent(event: GameEvent): void {
        switch(event.type){
            case Events.SUMMONING_COMPLETED:{
                this.handleSummonsTracking(event)
                break;
            }
            default:{
                super.handleEvent(event)
            }
        }
    }

    protected stopAI(): void {
        this.summonsTimerShield.pause()
        this.summonsTimerShield.reset()
    }

    protected handleSummons():void{
        console.log(this.summons.getSummons((this.summonsCount%3)+1))
        this.emitter.fireEvent(Events.ENEMY_SUMMONS, {
            id: this.owner.id,
            summons: this.summons.getSummons((this.summonsCount%3)+1)
        })
        this.summonsCount++;
    }

    protected handleSummonsTracking(event):void{
        let id = event.data.get("id")
        if(this.owner.id != id){return;}
        this.summons.addTrackedSummons(event.data.get("summoned"))
    }

    protected handleRamDamage(enemyId):void {}

    public pause(): void {
        super.pause()
        this.summonsTimerShield.pause()
    }
    public resume(): void {
        super.resume()
        this.summonsTimerShield.start()
    }

    /**Override*/
    protected initReceiver(): void {
        super.initReceiver()
        this.receiver.subscribe(Events.SUMMONING_COMPLETED)
    }
}

function getRandomInt(arg0: number): number {
    throw new Error("Function not implemented.");
}
