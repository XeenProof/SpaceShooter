import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import Spawnable from "../../../utils/Interface/Spawnable";


export default abstract class DespawnAI extends StateMachineAI{
    protected owner: GameNode

    abstract initializeAI(owner: GameNode, options: Record<string, any>): void

    // update(deltaT: number): void {
    //     this.owner.attemptDespawn({});
    // }
}