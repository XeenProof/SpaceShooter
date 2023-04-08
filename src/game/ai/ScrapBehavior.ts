import GameEvent from "../../Wolfie2D/Events/GameEvent";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import { Events } from "../../constants/events";
import MovementAI from "./abstractAI/MovementAI";


export default class ScrapBehavior extends MovementAI{
    protected override owner: Sprite

    initializeAI(owner: Sprite, options: Record<string, any>): void {
        this.owner = owner
        this.speed = (options.speed)?options.speed:150

        this.receiver.subscribe(Events.TRAVEL_SPEED_CHANGE)
    }
    activate(options: Record<string, any>): void {
        //this.owner.position.copy(options.src)
        this.speed = (options.speed)?options.speed:this.speed
    }
    update(deltaT: number): void {
        if(!this.owner.visible){return;}
        while(this.receiver.hasNextEvent()){
            this.handleEvent(this.receiver.getNextEvent())
        }
        super.update(deltaT)
    }
    handleEvent(event: GameEvent): void {
        switch(event.type){
            case Events.TRAVEL_SPEED_CHANGE:{
                this.speed = event.data.get("speed").y
            }
        }
    }
}