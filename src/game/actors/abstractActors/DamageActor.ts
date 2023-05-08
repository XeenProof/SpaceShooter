import SpawnableActor from "./SpawnableActor";


export default abstract class DamageActor extends SpawnableActor{
    abstract despawnConditions(options: Record<string, any>): boolean
    despawn(): void {
        super.despawn()
        this.position.set(1200, 1200)
    }

    private _damage_key: String;
    public get damage_key(): String {return this._damage_key;}
    public set damage_key(value: String) {this._damage_key = value;}
}