import Queue from "../DataTypes/Collections/Queue";
import EventQueue from "./EventQueue";
import GameEvent from "./GameEvent";

/**
 * Receives subscribed events from the EventQueue.
 */
export default class Receiver {
	/** The maximum number of events this Receiver can hold at one time */
	readonly MAX_SIZE: number;

	/** The inbox of the Receiver */
	private q: Queue<GameEvent>;
	private activated:boolean = true
	private eventFilters:Map<string, ((event:GameEvent)=>boolean)[]>

	/** Creates a new Receiver */
	constructor(){
		this.MAX_SIZE = 2000;
        this.q = new Queue(this.MAX_SIZE);
		
	}

	destroy(){
		EventQueue.getInstance().unsubscribe(this);
	}
	
	/**
	 * Adds these types of events to this receiver's queue every update.
	 * @param eventTypes The types of events this receiver will be subscribed to
	 */
	subscribe(eventTypes: string | Array<string>, filters:((event:GameEvent)=>boolean)[] = []): void {
		EventQueue.getInstance().subscribe(this, eventTypes);
		this.q.clear();
		if(filters.length <= 0){return}
		let list:string[] = (eventTypes instanceof Array)?eventTypes:[eventTypes]
		for(let s of list){this.addFilters(s, filters)}
	}

	/**
	 * Student added
	 * Adds a way to reject events unrelated to the receiver's owner
	 * Example: a node with id 5 doesn't care about collision between node 60 and 70
	 * @param eventType 
	 */
	addFilters(eventType: string, filters?:((event:GameEvent)=>boolean)[]):void{
		if(!this.eventFilters){this.eventFilters = new Map<string, ((event:GameEvent)=>boolean)[]>()}
		this.eventFilters.set(eventType, filters)
	}

	getFilter(eventType:string):((event:GameEvent)=>boolean)[]{
		return this.eventFilters?this.eventFilters.get(eventType)?this.eventFilters.get(eventType):[]:[]
	}

	/**
	 * Adds an event to the queue of this reciever. This is used by the @reference[EventQueue] to distribute events
	 * @param event The event to receive
	 */
	receive(event: GameEvent): void {
		try{
			if(!this.acceptEvent(event)){return}
			this.q.enqueue(event);
			if(event.type == "WEAPON_ENEMY_COLLISION"){console.log(this.q.getSize())}
		} catch(e){
			console.warn("Receiver overflow for event " + event.toString());
			throw e;
		}
	}

	acceptEvent(event:GameEvent):boolean{
		if(!this.activated){return false}
		let filters = this.getFilter(event.type)
		if(filters.length <= 0){return true}
		for(let f of filters){if(!f(event)){return false}}
		return true
	}

	/**
	 * Retrieves the next event from the receiver's queue
	 * @returns The next GameEvent
	 */
	getNextEvent(): GameEvent {
		return this.q.dequeue();
	}

	/**
	 * Looks at the next event in the receiver's queue, but doesn't remove it from the queue
	 * @returns The next GameEvent
	 */
	peekNextEvent(): GameEvent {
		return this.q.peekNext()
	}

	/**
	 * Returns true if the receiver has any events in its queue
	 * @returns True if the receiver has another event, false otherwise
	 */
	hasNextEvent(): boolean {
		return this.q.hasItems();
	}

	/**
	 * Ignore all events this frame
	 */
	ignoreEvents(): void {
		this.q.clear();
	}

	/**
	 * activate the receiver
	 */
	public activate():void{this.activated = true}
	public deactivate():void{this.activated = false}

}