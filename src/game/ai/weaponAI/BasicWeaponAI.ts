import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import { enemyStates } from "../../../constants/enemies/enemyAnimations";
import { Events } from "../../../constants/events";
import PathQueue from "../../../utils/Pathing/PathQueue";
import DamageActor from "../../actors/abstractActors/DamageActor";
import HPActor from "../../actors/abstractActors/HPActor";
import Attack from "../States/AttackingState";
import ComplexPatternAI from "../abstractAI/ComplexPatternAI";

export default class BasicWeaponAI extends ComplexPatternAI{
    protected override owner: DamageActor;

    protected nextDir: Vec2;
    protected nextSpeed: number;

    public initializeAI(owner: DamageActor, options: Record<string, any>): void {
        this.owner = owner
        this.path = new PathQueue(options.pathLength?options.pathLength:10)

        this.addState(enemyStates.IDLE, new Attack(this.owner, this))
        this.activate(options);
        this.ignoreStates = true;

        this.receiver.subscribe(Events.WEAPON_ENEMY_COLLISION)
        this.receiver.subscribe(Events.WEAPON_PLAYER_COLLISION)
    }

    public activate(options: Record<string, any>): void {
        super.activate(options)
        this.nextDir = (options.dir)?options.dir:Vec2.UP
        this.nextSpeed = (options.speed)?options.speed:500
        this.receiver.ignoreEvents();
        this.initialize(enemyStates.IDLE)
        this.owner.rotation = this.rotation
    }

    public update(deltaT: number): void {
        if(!this.owner.visible){return;}
        this.owner.attemptDespawn();
        if(!this.owner.visible){return;}
        while(this.receiver.hasNextEvent()){
            this.handleEvent(this.receiver.getNextEvent());
        }
        super.update(deltaT)
    }

    protected updateData(): void {
        if(this.pathCompleted){
            this.dir = this.nextDir
            this.speed = this.nextSpeed;
            return
        }
        super.updateData()
    }

    public handleEvent(event: GameEvent): void {
        switch(event.type){
            case Events.WEAPON_PLAYER_COLLISION:
            case Events.WEAPON_ENEMY_COLLISION:{
                this.handleWeaponCollision(event.data.get("other"))
                break;
            }
        }
    }

    protected handleWeaponCollision(id: number):void{
        if(this.owner.id != id){return;}
        this.owner.despawn()
    }

    protected get rotation():number{return Vec2.UP.angleToCCW((this.dir)?this.dir:this.nextDir)}
}