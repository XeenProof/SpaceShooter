import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import { GAMEPLAY_DIMENTIONS } from "../../constants/dimenstions";
import { Events } from "../../constants/events";
import ActorScene from "../scenes/GameplayScenes/ActorScene";
import MovementAI from "./abstractAI/MovementAI";


export default class ScrapBehavior extends MovementAI{
    protected override owner: Sprite
    private get scene():ActorScene{return <ActorScene>this.owner.getScene()}
    private get baseSpeed():number{return Math.abs(this.scene.TravelSpeed.y)}

    initializeAI(owner: Sprite, options: Record<string, any>): void {
        this.owner = owner
        this.speed = (options.speed)?Math.abs(options.speed.y):this.baseSpeed
        this.dir = Vec2.DOWN 
        this.ignoreStates = true
        this.receiver.deactivate()

        this.receiver.subscribe(Events.TRAVEL_SPEED_CHANGE)
        this.receiver.subscribe(Events.PLAYER_SCRAP_COLLISION)
        this.receiver.subscribe(Events.PAUSE)
    }
    activate(options: Record<string, any>): void {
        this.owner.position.copy(options.src)
        this.owner.enablePhysics()
        this.speed = (options.speed)?Math.abs(options.speed.y):this.speed
        this.receiver.activate()
    }
    update(deltaT: number): void {
        if(!this.owner.visible){return;}
        if(this.isOffScreen()){this.despawn()}
        if(!this.owner.visible){return;}
        while(this.receiver.hasNextEvent()){
            this.handleEvent(this.receiver.getNextEvent())
        }
        super.update(deltaT)
    }
    handleEvent(event: GameEvent): void {
        switch(event.type){
            case Events.TRAVEL_SPEED_CHANGE:{
                this.speed = Math.abs(event.data.get("speed").y)
                break;
            }
            case Events.PLAYER_SCRAP_COLLISION:{
                this.handleCollected(event.data.get("other"))
                break;
            }
            case Events.PAUSE: {
				this.handlePause(event.data.get("pausing"))
				break
			}
            default:{
                console.log("Unused Type:", event.type)
            }
        }
    }
    private isOffScreen():boolean {
        return (this.owner.position.y-this.owner.boundary.halfSize.y > GAMEPLAY_DIMENTIONS.YEND)
    }

    protected handleCollected(id: number):void{
        if(this.owner.id != id){return;}
        this.despawn()
    }

    protected despawn():void{
        this.owner.visible = false;
        this.receiver.deactivate()
        this.owner.position.set(1200,1200)
    }

    public handlePause(pausing: boolean):void{
        if(pausing){this.pause()}
		else{this.resume()}
    }

    public pause():void{
		this.owner.freeze()
		// this.owner.TimerPause()
	}
    public resume():void{
		this.owner.unfreeze()
		// this.owner.TimerResume()
	}

}