import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Receiver from "../../../Wolfie2D/Events/Receiver";
import Graphic from "../../../Wolfie2D/Nodes/Graphic";
import { Events } from "../../../constants/events";
import BeamActor from "../../actors/WeaponActors/BeamActor";
import MovementAI from "../abstractAI/MovementAI";

export default class BeamBehavior extends MovementAI {
    protected override owner: BeamActor;

    public initializeAI(owner: BeamActor, options: Record<string, any>): void {
        this.owner = owner;
        this.speed = options.speed?options.speed:500;
        this.dir = (options.dir)?options.dir:Vec2.UP;
        this.receiver = new Receiver();
        this.activate(options);
        

        this.receiver.subscribe(Events.WEAPON_ENEMY_COLLISION)
        this.receiver.subscribe(Events.WEAPON_PLAYER_COLLISION)
    }
    
    public activate(options: Record<string, any>): void {
        this.owner.position.copy(options.src)
        this.dir = (options.dir)?options.dir:this.dir;
        this.owner.rotation = Vec2.UP.angleToCCW(this.dir)
        this.speed = options.speed?options.speed:this.speed;
        this.receiver.ignoreEvents();
    }
    public handleEvent(event: GameEvent): void {
        // console.log(event, this.owner.id)
        switch(event.type){
            case Events.WEAPON_PLAYER_COLLISION:
            case Events.WEAPON_ENEMY_COLLISION:{
                this.handleWeaponCollision(event.data.get("other"))
                break;
            }
        }
    }
    public update(deltaT: number): void {
        if(!this.owner.visible){return;}
        this.owner.attemptDespawn();
        while(this.receiver.hasNextEvent()){
            this.handleEvent(this.receiver.getNextEvent());
        }
        super.update(deltaT)
    }

    protected handleWeaponCollision(id: number):void{
        if(this.owner.id != id){return;}
        this.owner.despawn()
    }
}