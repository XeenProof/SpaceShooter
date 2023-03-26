// import StateMachineGoapAI from "../../../../Wolfie2D/AI/StateMachineGoapAI";
// import GoapAction from "../../../../Wolfie2D/DataTypes/Interfaces/GoapAction";
import StateMachineGoapAI from "../../../../Wolfie2D/AI/Goap/StateMachineGoapAI";
import GoapAction from "../../../../Wolfie2D/AI/Goap/GoapAction";
import GameEvent from "../../../../Wolfie2D/Events/GameEvent";


export default abstract class WeaponAction extends GoapAction {
    onEnter(options: Record<string, any>): void {
        throw new Error("Method not implemented.");
    }
    handleInput(event: GameEvent): void {
        throw new Error("Method not implemented.");
    }
    update(deltaT: number): void {
        throw new Error("Method not implemented.");
    }
    onExit(): Record<string, any> {
        throw new Error("Method not implemented.");
    }
    public abstract performAction(): void;

    updateCost(options: Record<string, number>): void {
        throw new Error("Method not implemented.");
    }
    toString(): string {
        throw new Error("Method not implemented.");
    }

}