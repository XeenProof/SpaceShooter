import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import State from "../../../Wolfie2D/DataTypes/State/State";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import HPActor from "../../actors/abstractActors/HPActor";
import SpawnableActor from "../../actors/abstractActors/SpawnableActor";
import ComplexPatternAI from "../abstractAI/ComplexPatternAI";
import MovementAI from "../abstractAI/MovementAI";


export default abstract class BaseState extends State{
    protected parent:StateMachineAI
    protected owner:SpawnableActor

    constructor(owner:SpawnableActor, parent:StateMachineAI){
        super(parent)
        this.owner = owner
    }

    public abstract onEnter(options: Record<string, any>): void;

    /**
     * Handle game events from the parent.
     * @param event the game event
     */
	public handleInput(event: GameEvent): void {
        switch(event.type) {
            // Default - throw an error
            default: {
                throw new Error(`Unhandled event in PlayerState of type ${event.type}`);
            }
        }
	}

	public update(deltaT: number): void {
        
    }

    public abstract onExit(): Record<string, any>;

}