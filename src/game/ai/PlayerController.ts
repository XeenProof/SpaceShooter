import AI from "../../Wolfie2D/DataTypes/Interfaces/AI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Emitter from "../../Wolfie2D/Events/Emitter";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import Receiver from "../../Wolfie2D/Events/Receiver";
import Input from "../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Timer from "../../Wolfie2D/Timing/Timer";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";

import { HW2Events } from "../Events";
import { Controls } from "../../constants/gameoptions";
import PlayerActor from "../actors/PlayerActor";
import { Events } from "../../constants/events";
import { PlayerProjectileKeys } from "../../constants/projectiles/projectileData";
import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import { playerstates } from "./States/PlayerStates/PlayerState";
import Idle from "./States/PlayerStates/Idle";
import TakingDamage from "./States/PlayerStates/TakingDamage";
import Dying from "./States/PlayerStates/Dying";

export const PlayerAnimations = {
    IDLE: "IDLE",
    HIT: "HIT",
    DEATH: "DEATH"
} as const;

/**
 * A class for controlling the player in the HW2Scene.
 * @author PeteyLumpkins
 */
export default class PlayerController extends StateMachineAI {
	/** The GameNode that owns this PlayerController AI */
	protected owner: PlayerActor;

	public get currentSpeed(): number {return this.owner.currentSpeed;}
	public set currentSpeed(value: number) {this.owner.currentSpeed = value;}

	/**
	 * This method initializes all variables inside of this AI class.
     * 
	 * @param owner The owner of this AI - i.e. the player
	 * @param options The list of options for ai initialization
	 */
	public initializeAI(owner: PlayerActor, options: Record<string,any>): void {
		this.owner = owner;

		this.receiver = new Receiver();
		this.emitter = new Emitter();

		this.addState(playerstates.IDLE, new Idle(this.owner, this))
		this.addState(playerstates.TAKING_DAMAGE, new TakingDamage(this.owner, this))
		this.addState(playerstates.DYING, new Dying(this.owner, this))
		
		this.receiver.subscribe(HW2Events.SHOOT_LASER);
		this.receiver.subscribe(HW2Events.DEAD)

		this.receiver.subscribe(Events.PLAYER_ENEMY_COLLISION)
		this.receiver.subscribe(Events.WEAPON_PLAYER_COLLISION)

		this.initialize(playerstates.IDLE)
		this.activate(options);
	}
	public activate(options: Record<string,any>): void {
		//sets a player's health
		let hp = options.hp?options.hp:30;
		this.owner.maxHealth = hp;
        this.owner.health = hp;

        // Set the player's movement speed
        this.currentSpeed = 300

        // Play the idle animation by default
		this.owner.animation.play(PlayerAnimations.IDLE, true);
	};
	/**
	 * Handles updates to the player 
	 * 
	 * @remarks
	 * 
	 * The PlayerController updates the player at every frame (each time the main
	 * GameLoop iterates). 
	 * 
	 * This method should handle all incoming user input events. Things like key-presses, 
	 * mouse-clicks, mouse-downs etc. In addition, this method should handle all events
	 * that the PlayerController's receiver is subscribed to.
	 * 
	 * This method is also responsible for updating the state of the player, and altering
	 * the rest of the game to changes in the state of the player. If the player's stats
	 * change, the UI needs to be notified so that it can reflect those changes. If the 
	 * player is dead, the scene needs to be notified so that it can change to GameOver scene.
	 * 
	 * @param deltaT - the amount of time that has passed since the last update
	 */
	public update(deltaT: number): void {
        // First, handle all events 
		while(this.receiver.hasNextEvent()){
			this.handleEvent(this.receiver.getNextEvent());
		}
		if(this.canMove){this.handleControls(deltaT);}
		
		super.update(deltaT)
	}
	/**
	 * This method handles all events that the reciever for the PlayerController is
	 * subscribed to.
	 * 
	 * @see {AI.handleEvent}
	 * 
	 * @param event a GameEvent that the PlayerController is subscribed to
	 */
	public handleEvent(event: GameEvent): void {
		switch(event.type) {
			case Events.PLAYER_ENEMY_COLLISION:{
				this.handleRamDamage(event.data.get("node"));
				break;
			}
			case Events.WEAPON_PLAYER_COLLISION:{
				this.handleDamage(event.data.get("other"))
				break;
			}
			case Events.PLAYER_ENEMY_COLLISION:{
				this.handleScrapPickup()
				break;
			}
			default: {
				throw new Error(`Unhandled event of type: ${event.type} caught in PlayerController`);
			}
		}
	}
	/**
	 * @see {AI.destroy}
	 */
	public destroy(): void {
		this.receiver.destroy()
	}

	public get canMove():boolean{
		if(this.isState(playerstates.DYING)){return false}
		return true
	}

	public handleControls(deltaT: number):void {
		// Get the player's input direction 
		let forwardAxis = (Input.isPressed(Controls.MOVE_UP) ? 1 : 0) + (Input.isPressed(Controls.MOVE_DOWN) ? -1 : 0);
		let horizontalAxis = (Input.isPressed(Controls.MOVE_LEFT) ? -1 : 0) + (Input.isPressed(Controls.MOVE_RIGHT) ? 1 : 0);
		if (Input.isMouseJustPressed()) {
			this.emitter.fireEvent(Events.PLAYER_SHOOTS, {
				src: this.owner.position,
				dir: Vec2.UP,
				key: PlayerProjectileKeys.BEAM,
				id: this.owner.id
			});
		}
		if(Input.isJustPressed(Controls.SHIELD)){this.owner.activateShield()}
		if(Input.isJustPressed(Controls.BOOST)){this.owner.activateBoost()}
		// Move the player
		let movement = Vec2.UP.scaled(forwardAxis * this.currentSpeed).add(new Vec2(horizontalAxis * this.currentSpeed, 0));
		this.owner.move(movement.scaled(deltaT));
	}


	protected handlePlayerDeath = () => {
		console.log("Handle player death")
		this.owner.animation.playIfNotAlready(PlayerAnimations.DEATH, false);
	}

	protected handleRamDamage(enemyId:number):void {
		let enemy = this.owner.getScene().getEnemy(enemyId)
		let player = this.owner
		let damage = Math.min(enemy.ramDamage, player.ramDamage)
		this.owner.takeDamage((this.owner.shielded)?damage:damage/2);
		if(this.owner.shielded){this.owner.deactivateShield()}
    }

	protected handleDamage(shotid:number):void {
		if(this.owner.shielded){return;}
		let bullet = this.owner.getScene().getEnemyShot(shotid)
        let damage = this.owner.getScene().getDamage(bullet.damage_key)
		let received = this.owner.takeDamage(damage)
		if(received && !this.isState(playerstates.DYING)){
			this.changeState(playerstates.TAKING_DAMAGE)
		}
	}

	protected handleScrapPickup():void{
		console.log("WIP: Player picked up scrap")
	}
} 



