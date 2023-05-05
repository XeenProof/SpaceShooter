import Scene from "../../../Wolfie2D/Scene/Scene";
import PlayerActor from "../../actors/PlayerActor";
import DamageActor from "../../actors/abstractActors/DamageActor";
import HPActor from "../../actors/abstractActors/HPActor";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import SPScene from "../SPScene";


export default abstract class ActorScene extends SPScene{

    public abstract get player(): PlayerActor
    public abstract get TravelSpeed(): Vec2
    public abstract get collectScrap(): number
    public abstract get isPaused(): boolean

    public abstract getEnemy(id: number): HPActor
    public abstract getShot(id: number): DamageActor
    public abstract getEnemyDamage(key: String): number
    public abstract getPlayerDamage(key: String): number
    public abstract getEnemyShot(id: number): DamageActor
    public abstract getClosestEnemy(pos: Vec2): HPActor
}