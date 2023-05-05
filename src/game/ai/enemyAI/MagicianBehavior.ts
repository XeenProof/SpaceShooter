import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { Events } from "../../../constants/events";
import Weapon from "../../../utils/WeaponManager/Weapon";
import WeaponsManager from "../../../utils/WeaponManager/WeaponsManager";
import BasicEnemyAI from "../abstractAI/BasicEnemyAI";
import MagicianActor from "../../actors/EnemyActors/MagicianActor";
import MagicianWeapons, { OctoShot, OctoShotV2,DownShot,OctoShotV3 }from "./MagicianWeapons";
import PlayerActor from "../../actors/PlayerActor";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import SummonsManager from "../../../utils/SummonsManager/SummonsManager";
import SummonerActor from "../../actors/BossActors/SummonerActor";
import MagicianSummon, { StarSummons } from "./MagicianSummons";
// import Level1MookWeapon, { OctoShot, OctoShotV2 } from "./Level1MookWeapons";

const WEAPONS = {
    OCTOSHOT: "OCTOSHOT",
    OCTOSHOTV2: "OCTOSHOTV2",
    DOWNSHOT: "DOWNSHOT",
    OCTOSHOTV3: "OCTOSHOTV3",
}

const SUMMONS = {
    REGULAR: "REGULAR-MEGAMOOK"
}

const audio = {
    DAMAGED: 0,
    DEAD: 1,
    ATTACK: 2
}

export default class MagicianBehavior extends BasicEnemyAI{
    protected override owner: MagicianActor

    private weaponsTimer:Timer
    private weapons:WeaponsManager<MagicianWeapons>
    private firedCounter:number;
    public get shootDir():Vec2{return this.owner.position.dirTo(this.target.position)}

    private summons:SummonsManager<MagicianSummon>
    private summonsChart:Map<number, boolean>

    public initializeAI(owner: MagicianActor, options: Record<string, any> = {}): void {
        super.initializeAI(owner, options)
        this.firedCounter = 0;
        this.weaponsTimer = new Timer(1500,()=>{this.handleWeaponFire()}, true)

        this.weapons = new WeaponsManager<MagicianWeapons>()
        this.weapons.add(WEAPONS.DOWNSHOT, new DownShot(this.owner, this), 1, 4)
        this.weapons.add(WEAPONS.OCTOSHOT, new OctoShot(this.owner, this), 2, 4)
        this.weapons.add(WEAPONS.OCTOSHOTV2, new OctoShotV2(this.owner, this), 3, 4)
        this.weapons.add(WEAPONS.OCTOSHOTV3, new OctoShotV3(this.owner, this), 4, 4)


        this.summons = new SummonsManager<MagicianSummon>()
        this.summons.add(new StarSummons(this.owner, this, SUMMONS.REGULAR))
        this.summonsChart = new Map<number, boolean>()

    }

    public activate(options: Record<string, any>): void {
        super.activate(options)
        this.weaponsTimer.start()
        this.initSummonsChart(.50, .50, .50, .50, .50, .50, .50, .50, .50, .50)
    }

    private handleWeaponFire():void{
        //this.shootdir=this.owner.position.dirTo(this.target.position)
        this.owner.playSoundFX(audio.ATTACK)
        this.emitter.fireEvent(Events.ENEMY_SHOOTS, {
            projectiles: this.weapons.getProjectiles((this.firedCounter%3)+1)
        })
        if(Math.random()>=0.40){
            this.handleSummoning()
        }
        this.firedCounter+=1;
    }

    protected stopAI(): void {
        this.weaponsTimer.pause()
        this.weaponsTimer.reset()
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

    protected handleSummonsTracking(event):void{
        let id = event.data.get("id")
        if(this.owner.id != id){return;}
        this.summons.addTrackedSummons(event.data.get("summoned"))
    }

    protected handleSummoning(){
        for(let [key, value] of this.summonsChart){
            if(this.owner.percentHealth <= key && value){
                this.emitter.fireEvent(Events.ENEMY_SUMMONS, {
                    id:this.owner.id, 
                    summons: this.summons.getSummons()
                })
                this.summonsChart.set(key, false)
            }
        }
    }

    private initSummonsChart(...percents:number[]){
        this.summonsChart.clear();
        for(let n of percents){this.summonsChart.set(n,true)}
    }

    // protected handleRamDamage(enemyId):void {}

    protected OwnerTakeDamage(damage:number):boolean{
        let receivedDamage = super.OwnerTakeDamage(damage)
        console.log(this.owner.health)
        if (this.owner.health<=0){
            this.emitter.fireEvent(Events.ENEMY_SHOOTS, {
                projectiles: this.weapons.getProjectiles(4)
            })
        }
        return receivedDamage
    }

    public pause(): void {
        super.pause()
        this.weaponsTimer.pause()
    }
    public resume(): void {
        super.resume()
        this.weaponsTimer.start()
    }

    protected initReceiver(): void {
        super.initReceiver()
        this.receiver.subscribe(Events.SUMMONING_COMPLETED)
    }

    protected updateData(){
        super.updateData()
    }
}