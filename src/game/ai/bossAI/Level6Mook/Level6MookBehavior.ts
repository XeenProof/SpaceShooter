import Vec2 from "../../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import { Events } from "../../../../constants/events";
import SummonsManager from "../../../../utils/SummonsManager/SummonsManager";
import Level6MookActor from "../../../actors/BossActors/Level5MookActor";
import BasicEnemyAI from "../../abstractAI/BasicEnemyAI";
import Level6MookSummons, { Level6BackRank, Level6Star,Level6AtTarget,Level6Magician,Level6Sheild} from "./Level6MookSummons";
import Level6MookWeapons, {DownShot, OctoShot, OctoShotV2} from "./Level6MookWeapons";
import WeaponsManager from "../../../../utils/WeaponManager/WeaponsManager";

const SUMMONS = {
    SHIELD: "SHIELD",
    BACKRANK: "BACKRANK",
    ATTARGET: "ATTARGET",
    STAR:"STAR",
}

const WEAPONS = {
    OCTOSHOT: "OCTOSHOT",
    OCTOSHOTV2: "OCTOSHOTV2",
    DOWNSHOT: "DOWNSHOT",
}

const audio = {
    DAMAGED: 0,
    DEAD: 1,
    ATTACK: 2
}

export default class Level6MookBehavior extends BasicEnemyAI{
    protected override owner:Level6MookActor
    private summons:SummonsManager<Level6MookSummons>
    private summonsTimerShield:Timer
    private summonsCount: number;
    private firedCounter: number;
    private weaponsTimer:Timer
    private weapons:WeaponsManager<Level6MookWeapons>

    public get targetPosition():Vec2 {return this.target.position}

    public initializeAI(owner: Level6MookActor, options?: Record<string, any>): void {
        super.initializeAI(owner, options)

        this.firedCounter = 0;
        this.weaponsTimer = new Timer(1000,()=>{this.handleWeaponFire()}, true)

        this.weapons = new WeaponsManager<Level6MookWeapons>()
        this.weapons.add(WEAPONS.DOWNSHOT, new DownShot(this.owner, this), 1, 4)
        this.weapons.add(WEAPONS.OCTOSHOT, new OctoShot(this.owner, this), 2, 4)
        this.weapons.add(WEAPONS.OCTOSHOTV2, new OctoShotV2(this.owner, this), 3, 4)
        
        this.summonsCount = 0;
        this.summons = new SummonsManager<Level6MookSummons>()
        this.summons.add(new Level6Star(this.owner, this, SUMMONS.STAR), 1)
        this.summons.add(new Level6BackRank(this.owner, this, SUMMONS.BACKRANK), 2)
        this.summons.add(new Level6AtTarget(this.owner, this, SUMMONS.ATTARGET), 3)
        this.summons.add(new Level6Sheild(this.owner, this, SUMMONS.SHIELD), 4)
        this.summonsTimerShield = new Timer(5000, ()=>{this.handleSummons()}, true)
    }

    public activate(options: Record<string, any>): void {
        super.activate(options)
        this.summonsTimerShield.start()
        this.weaponsTimer.start()
    }

    private handleWeaponFire():void{
        this.owner.playSoundFX(audio.ATTACK)
        this.emitter.fireEvent(Events.ENEMY_SHOOTS, {
            projectiles: this.weapons.getProjectiles((this.firedCounter%3)+1)
        })
        this.firedCounter+=1;
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
        this.weaponsTimer.pause()
        this.weaponsTimer.reset()
        this.summonsTimerShield.pause()
        this.summonsTimerShield.reset()
    }

    protected handleSummons():void{
        this.emitter.fireEvent(Events.ENEMY_SUMMONS, {
            id: this.owner.id,
            summons: this.summons.getSummons()
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
        this.weaponsTimer.pause()
    }
    public resume(): void {
        super.resume()
        this.summonsTimerShield.start()
        this.weaponsTimer.start()
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
