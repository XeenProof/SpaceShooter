import HPActor from "../../../actors/abstractActors/HPActor";
import ComplexPatternAI from "../../abstractAI/ComplexPatternAI";
import BaseState from "../BaseState";


export default abstract class EnemyState extends BaseState{
    protected parent:ComplexPatternAI
    protected owner:HPActor
}