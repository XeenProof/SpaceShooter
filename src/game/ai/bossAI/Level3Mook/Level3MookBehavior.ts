import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import Timer from "../../../../Wolfie2D/Timing/Timer";
import { Events } from "../../../../constants/events";
import SummonsManager from "../../../../utils/SummonsManager/SummonsManager";
import Weapon from "../../../../utils/WeaponManager/Weapon";
import WeaponsManager from "../../../../utils/WeaponManager/WeaponsManager";
import Level1MookActor from "../../../actors/BossActors/Level1MookActor";
import HPActor from "../../../actors/abstractActors/HPActor";
import BasicEnemyAI from "../../abstractAI/BasicEnemyAI";
import Level3MookWeapon, { OctoShot, OctoShotV2 } from "./Level3MookWeapons";

const WEAPONS = {
    OCTOSHOT: "OCTOSHOT",
    OCTOSHOTV2: "OCTOSHOTV2"
}

const audio = {
    DAMAGED: 0,
    DEAD: 1,
    ATTACK: 2
}

export default class Level1MookBehavior extends BasicEnemyAI{
    protected override owner:Level1MookActor

    private weaponsTimer:Timer
    private weapons:WeaponsManager<Level3MookWeapon>
    private firedCounter:number;

    public initializeAI(owner: Level1MookActor, options: Record<string, any> = {}): void {
        super.initializeAI(owner, options)
        // this.firedCounter = 0;
        this.weaponsTimer = new Timer(1500,()=>{this.handleWeaponFire()}, true)

        this.weapons = new WeaponsManager<Level3MookWeapon>()
        this.weapons.add(WEAPONS.OCTOSHOT, new OctoShot(this.owner, this), 1, 3)
        this.weapons.add(WEAPONS.OCTOSHOTV2, new OctoShotV2(this.owner, this), 2, 3)
    }

    public activate(options: Record<string, any>): void {
        super.activate(options)
        this.weaponsTimer.start()
    }

    private handleWeaponFire():void{
        this.owner.playSoundFX(audio.ATTACK)
        this.emitter.fireEvent(Events.ENEMY_SHOOTS, {
            projectiles: this.weapons.getProjectiles()
        })
        // this.firedCounter+=1;
    }

    protected stopAI(): void {
        this.weaponsTimer.pause()
        this.weaponsTimer.reset()
    }

    // public handleEvent(event: GameEvent): void {
    //     switch(event.type){
    //         default:{
    //             super.handleEvent(event)
    //         }
    //     }
    // }

    protected handleRamDamage(enemyId):void {}

    protected OwnerTakeDamage(damage:number):boolean{
        let receivedDamage = super.OwnerTakeDamage(damage)
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
    }
}