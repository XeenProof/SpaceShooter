

export default interface Spawnable{

    /**Spawns in the Node */
    spawn(options: Record<string, any>):void;

    /**Checks for if something needs despawning */
    despawnConditions(options: Record<string, any>):boolean;

    /**Attempts to despawn Node*/
    attemptDespawn(options: Record<string, any>):void;

    /** Despawns the node*/
    despawn():void;
}