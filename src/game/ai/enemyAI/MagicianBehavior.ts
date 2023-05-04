import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { Events } from "../../../constants/events";
import Weapon from "../../../utils/WeaponManager/Weapon";
import WeaponsManager from "../../../utils/WeaponManager/WeaponsManager";
import BasicEnemyAI from "../abstractAI/BasicEnemyAI";
import MagicianActor from "../../actors/EnemyActors/MagicianActor";
import MagicianWeapons, { OctoShot, OctoShotV2,DownShot }from "./MagicianWeapons";
import PlayerActor from "../../actors/PlayerActor";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
// import Level1MookWeapon, { OctoShot, OctoShotV2 } from "./Level1MookWeapons";

const WEAPONS = {
    OCTOSHOT: "OCTOSHOT",
    OCTOSHOTV2: "OCTOSHOTV2",
    DOWNSHOT: "DOWNSHOT"
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

    public initializeAI(owner: MagicianActor, options: Record<string, any> = {}): void {
        super.initializeAI(owner, options) //why it is not work?
        this.firedCounter = 0;
        this.weaponsTimer = new Timer(1500,()=>{this.handleWeaponFire()}, true)

        this.weapons = new WeaponsManager<MagicianWeapons>()
        this.weapons.add(WEAPONS.DOWNSHOT, new DownShot(this.owner, this), 1, 4)
        this.weapons.add(WEAPONS.OCTOSHOT, new OctoShot(this.owner, this), 2, 4)
        this.weapons.add(WEAPONS.OCTOSHOTV2, new OctoShotV2(this.owner, this), 3, 4)
    }

    public activate(options: Record<string, any>): void {
        super.activate(options)
        this.weaponsTimer.start()
    }

    private handleWeaponFire():void{
        //this.shootdir=this.owner.position.dirTo(this.target.position)
        this.owner.playSoundFX(audio.ATTACK)
        this.emitter.fireEvent(Events.ENEMY_SHOOTS, {
            projectiles: this.weapons.getProjectiles((this.firedCounter%3)+1)
        })
        this.firedCounter+=1;
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