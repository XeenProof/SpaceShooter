import Scene from "../../Wolfie2D/Scene/Scene";
import BeamActor from "../actors/BeamActor";
import PlayerActor from "../actors/PlayerActor";
import DamageActor from "../actors/abstractActors/DamageActor";
import HPActor from "../actors/abstractActors/HPActor";


export default abstract class ActorScene extends Scene{

    public abstract get player(): PlayerActor

    public abstract getEnemy(id: number): HPActor
    public abstract getShot(id: number): DamageActor
    public abstract getDamage(key: String): number
    public abstract getEnemyShot(id: number): DamageActor
}