import Scene from "../../Wolfie2D/Scene/Scene";
import PlayerActor from "../actors/PlayerActor";
import HPActor from "../actors/abstractActors/HPActor";


export default abstract class ActorScene extends Scene{

    public abstract get player(): PlayerActor

    public abstract getEnemy(id: number): HPActor
}