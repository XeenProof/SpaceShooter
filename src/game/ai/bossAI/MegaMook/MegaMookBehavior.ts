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

export default class MegaMookBehavior extends BasicEnemyAI{
    protected override owner:MegaMookActor

    private weaponsTimer:Timer
    private weapons:WeaponsManager<MegaMookWeapon>
    private firedCounter:number;

    private summons:SummonsManager<MegaMookSummon>

    public initializeAI(owner: HPActor, options: Record<string, any> = {}): void {
        super.initializeAI(owner, options)
        this.firedCounter = 0;
        this.weaponsTimer = new Timer(1500,()=>{this.handleWeaponFire()}, true)

        this.weapons = new WeaponsManager<MegaMookWeapon>()
        this.weapons.add(WEAPONS.OCTOSHOT, new OctoShot(this.owner, this), 1, 3)
        this.weapons.add(WEAPONS.OCTOSHOTV2, new OctoShotV2(this.owner, this), 2, 3)

        this.summons = new SummonsManager<MegaMookSummon>()
        this.summons.add(new RegularMookSummons(this.owner, this, SUMMONS.REGULAR))

        this.receiver.subscribe(Events.SUMMONING_COMPLETED)

        console.log(this.weapons)
    }

    public activate(options: Record<string, any>): void {
        super.activate(options)
        this.weaponsTimer.start()
    }

    private handleWeaponFire():void{
        this.emitter.fireEvent(Events.ENEMY_SHOOTS, {
            projectiles: this.weapons.getProjectiles((this.firedCounter%2)+1)
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
            this.emitter.fireEvent(Events.ENEMY_SUMMONS, {
                id:this.owner.id,
                summons: this.summons.getSummons()
            })
        }
        return receivedDamage
    }
}