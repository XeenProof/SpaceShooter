import Scene from "../../Wolfie2D/Scene/Scene";
import BeamActor from "../actors/WeaponActors/BeamActor";
import PlayerActor from "../actors/PlayerActor";
import DamageActor from "../actors/abstractActors/DamageActor";
import HPActor from "../actors/abstractActors/HPActor";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";


export default abstract class ActorScene extends Scene{

    public abstract get player(): PlayerActor
    public abstract get TravelSpeed(): Vec2
    public abstract get collectScrap(): number

    public abstract getEnemy(id: number): HPActor
    public abstract getShot(id: number): DamageActor
    public abstract getDamage(key: String): number
    public abstract getEnemyShot(id: number): DamageActor
    public abstract getCheat(key: string): boolean
}