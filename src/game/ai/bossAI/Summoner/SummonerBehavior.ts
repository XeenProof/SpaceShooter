import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import { Events } from "../../../../constants/events";
import SummonsManager from "../../../../utils/SummonsManager/SummonsManager";
import SummonerActor from "../../../actors/BossActors/SummonerActor";
import BasicEnemyAI from "../../abstractAI/BasicEnemyAI";
import SummonerSummon, { SummonerShieldWall } from "./SummonerSummons";

const SUMMONS = {
    SHIELD: "SHIELD"
}

export default class SummonerBehavior extends BasicEnemyAI{
    protected override owner:SummonerActor
    private summons:SummonsManager<SummonerSummon>
    private summonsTimerShield:Timer

    public initializeAI(owner: SummonerActor, options?: Record<string, any>): void {
        super.initializeAI(owner, options)
        this.summons = new SummonsManager<SummonerSummon>()
        this.summons.add(new SummonerShieldWall(this.owner, this, SUMMONS.SHIELD), 1)

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