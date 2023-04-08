import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import { Events } from "../../constants/events";
import MovementAI from "./abstractAI/MovementAI";


export default class ScrapBehavior extends MovementAI{
    protected override owner: Sprite

    initializeAI(owner: Sprite, options: Record<string, any>): void {
        this.owner = owner
        this.speed = (options.speed)?Math.abs(options.speed.y):150
        this.dir = Vec2.UP //I have no clue why this is backwards
        this.ignoreStates = true

        this.receiver.subscribe(Events.TRAVEL_SPEED_CHANGE)
    }
    activate(options: Record<string, any>): void {
        this.owner.position.copy(options.src)
        this.speed = (options.speed)?Math.abs(options.speed.y):this.speed
        console.log("Scrap Speed", this.speed)
    }
    update(deltaT: number): void {
        if(!this.owner.visible){return;}
        while(this.receiver.hasNextEvent()){
            this.handleEvent(this.receiver.getNextEvent())
        }
        super.update(deltaT)
    }
    handleEvent(event: GameEvent): void {
        console.log(event.type)
        switch(event.type){
            case Events.TRAVEL_SPEED_CHANGE:{
                this.speed = event.data.get("speed").y
            }
            default:{
                console.log("Unused Type:", event.type)
            }
        }
    }
}