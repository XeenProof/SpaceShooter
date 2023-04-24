import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { Events } from "../../../constants/events";
import PathQueue from "../../../utils/Pathing/PathQueue";
import PlayerActor from "../../actors/PlayerActor";
import PersonMookActor from "../../actors/EnemyActors/PersonMookActor";
import ComplexPatternAI from "../abstractAI/ComplexPatternAI";
import { enemyStates } from "../../../constants/enemies/enemyAnimations";
import Idle from "../States/EnemyStates/Idle";
import TakingDamage from "../States/EnemyStates/TakingDamage";
import Dying from "../States/EnemyStates/Dying";
import BasicEnemyAI from "../abstractAI/BasicEnemyAI";
import { EnemyProjectileKeys } from "../../../constants/projectiles/projectileData";
import WeaponsManager from "../../../utils/WeaponManager/WeaponsManager";
import PersonMookWeapons,{ ConeShot} from "./PersonMookWeapons";

const audio = {
    DAMAGED: 0,
    DEAD: 1,
    ATTACK: 2
}

const WEAPONS = {
    CONESHOT: "CONESHOT",
}

export default class PersonMookBehavior extends BasicEnemyAI {
    protected override owner: PersonMookActor

    protected weaponCooldown: Timer;
    private weapons:WeaponsManager<PersonMookWeapons>

    public initializeAI(owner: PersonMookActor, options: Record<string, any>): void {
        this.weaponCooldown = new Timer(1500, ()=>{this.actionPattern()}, true);
        super.initializeAI(owner, options)

        this.weapons = new WeaponsManager<PersonMookWeapons>()
        this.weapons.add(WEAPONS.CONESHOT, new ConeShot(this.owner, this), 1, 3)
    }

    public activate(options: Record<string, any>): void {
        super.activate(options)
        this.weaponCooldown.start()
    }

    protected actionPattern():void{
        this.owner.playSoundFX(audio.ATTACK)
        this.owner.fireEvent(Events.ENEMY_SHOOTS, 
            {projectiles:this.weapons.getProjectiles()})
    }

    public update(deltaT: number){
        super.update(deltaT)
    }

    protected stopAI(): void {
        this.weaponCooldown.pause()
        this.weaponCooldown.reset()
    }

    public pause(): void {
        super.pause()
        this.weaponCooldown.pause()
    }
    public resume(): void {
        super.resume()
        this.weaponCooldown.start()
    }
}