import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import { Events } from "../../../../constants/events";
import SummonsManager from "../../../../utils/SummonsManager/SummonsManager";
import Level5MookActor from "../../../actors/BossActors/Level5MookActor";
import BasicEnemyAI from "../../abstractAI/BasicEnemyAI";
import Level5MookSummons, { Level5BackRank, Level5Star,Level5Sheild } from "./Level5MookSummons";

const SUMMONS = {
    SHIELD: "SHIELD",
    BACKRANK: "BACKRANK",
    STAR: "STAR"
}

export default class Level5MookBehavior extends BasicEnemyAI{
    protected override owner:Level5MookActor
    private summons:SummonsManager<Level5MookSummons>
    private summonsTimerShield:Timer

    public initializeAI(owner: Level5MookActor, options?: Record<string, any>): void {
        super.initializeAI(owner, options)
        this.summons = new SummonsManager<Level5MookSummons>()
        this.summons.add(new Level5Star(this.owner, this, SUMMONS.STAR), 1)
        this.summons.add(new Level5BackRank(this.owner, this, SUMMONS.BACKRANK), 2)
        this.summons.add(new Level5Sheild(this.owner, this, SUMMONS.SHIELD), 3)

        this.summonsTimerShield = new Timer(2000, ()=>{this.handleSummons()}, true)
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
        console.log(this.summons.getSummons())
        this.emitter.fireEvent(Events.ENEMY_SUMMONS, {
            id: this.owner.id,
            summons: this.summons.getSummons()
        })
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