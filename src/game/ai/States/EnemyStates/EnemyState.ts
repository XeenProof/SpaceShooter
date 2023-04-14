import HPActor from "../../../actors/abstractActors/HPActor";
import BasicEnemyAI from "../../abstractAI/BasicEnemyAI";
import ComplexPatternAI from "../../abstractAI/ComplexPatternAI";
import BaseState from "../BaseState";


export default abstract class EnemyState extends BaseState{
    protected parent:BasicEnemyAI
    protected owner:HPActor
}