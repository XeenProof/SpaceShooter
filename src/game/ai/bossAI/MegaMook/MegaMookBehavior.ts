import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import { Events } from "../../../../constants/events";
import SummonsManager from "../../../../utils/SummonsManager/SummonsManager";
import Weapon from "../../../../utils/WeaponManager/Weapon";
import WeaponsManager from "../../../../utils/WeaponManager/WeaponsManager";
import MegaMookActor from "../../../actors/BossActors/MegaMookActor";
import HPActor from "../../../actors/abstractActors/HPActor";
import BasicEnemyAI from "../../abstractAI/BasicEnemyAI";
import MegaMookSummon, { RegularMookSummons } from "./MegaMookSummons";
import MegaMookWeapon, { OctoShot, OctoShotV2 } from "./MegaMookWeapons";

const WEAPONS = {
    OCTOSHOT: "OCTOSHOT",
    OCTOSHOTV2: "OCTOSHOTV2"
}

const SUMMONS = {
    REGULAR: "REGULAR-MEGAMOOK"
}

const audio = {
    DAMAGED: 0,
    DEAD: 1,
    ATTACK: 2
}

export default class MegaMookBehavior extends BasicEnemyAI{
    protected override owner:MegaMookActor

    private weaponsTimer:Timer
    private weapons:WeaponsManager<MegaMookWeapon>
    private firedCounter:number;

    private summons:SummonsManager<MegaMookSummon>
    private summonsChart:Map<number, boolean>

    public initializeAI(owner: MegaMookActor, options: Record<string, any> = {}): void {
        super.initializeAI(owner, options)
        this.firedCounter = 0;
        this.weaponsTimer = new Timer(1500,()=>{this.handleWeaponFire()}, true)

        this.weapons = new WeaponsManager<MegaMookWeapon>()
        this.weapons.add(WEAPONS.OCTOSHOT, new OctoShot(this.owner, this), 1, 3)
        this.weapons.add(WEAPONS.OCTOSHOTV2, new OctoShotV2(this.owner, this), 2, 3)

        this.summons = new SummonsManager<MegaMookSummon>()
        this.summons.add(new RegularMookSummons(this.owner, this, SUMMONS.REGULAR))
        this.summonsChart = new Map<number, boolean>()
    }

    public activate(options: Record<string, any>): void {
        super.activate(options)
        this.weaponsTimer.start()
        this.initSummonsChart(.05, .1, .15, .2, .25, .30, .35, .40, .45, .50, .55, .6, .65, .7, .75, .8, .85, .9, .95)
    }

    private handleWeaponFire():void{
        this.owner.playSoundFX(audio.ATTACK)
        this.emitter.fireEvent(Events.ENEMY_SHOOTS, {
            projectiles: this.weapons.getProjectiles((this.owner.percentHealth > .25)?(this.firedCounter%2)+1:3)
        })
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

    protected handleRamDamage(enemyId):void {}

    protected OwnerTakeDamage(damage:number):boolean{
        let receivedDamage = super.OwnerTakeDamage(damage)
        if(receivedDamage && this.owner.health > 0){
            this.handleSummoning()
        }
        return receivedDamage
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
}