import Timer from "../../../../Wolfie2D/Timing/Timer";
import { Events } from "../../../../constants/events";
import Weapon from "../../../../utils/WeaponManager/Weapon";
import WeaponsManager from "../../../../utils/WeaponManager/WeaponsManager";
import MegaMookActor from "../../../actors/BossActors/MegaMookActor";
import HPActor from "../../../actors/abstractActors/HPActor";
import BasicEnemyAI from "../../abstractAI/BasicEnemyAI";
import { OctoShot, OctoShotV2 } from "./MegaMookWeapons";

const WEAPONS = {
    OCTOSHOT: "OCTOSHOT",
    OCTOSHOTV2: "OCTOSHOTV2"
}

export default class MegaMookBehavior extends BasicEnemyAI{
    protected override owner:MegaMookActor

    private weaponsTimer:Timer
    private weapons:WeaponsManager<Weapon>
    private firedCounter:number;

    public initializeAI(owner: HPActor, options: Record<string, any> = {}): void {
        super.initializeAI(owner, options)
        this.firedCounter = 0;
        this.weaponsTimer = new Timer(1500,()=>{this.handleWeaponFire()}, true)
        this.weapons = new WeaponsManager<Weapon>()
        this.weapons.add(WEAPONS.OCTOSHOT, new OctoShot(this.owner, this), 1, 3)
        this.weapons.add(WEAPONS.OCTOSHOTV2, new OctoShotV2(this.owner, this), 2, 3)
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

    protected handleRamDamage(enemyId):void {}
}