import Scene from "../../Wolfie2D/Scene/Scene";


export default abstract class LevelSelect<T extends Scene>{
    protected scene: new (...args: any) => T

    public handleDisplayUpdate():void{
        if(this.unlocked){this.settingsIfUnlocked()}
        else{this.settingsIfLocked}
    }

    abstract get unlocked():boolean

    abstract settingsIfLocked():void
    abstract settingsIfUnlocked():void
}