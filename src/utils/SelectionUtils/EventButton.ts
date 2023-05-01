import Updateable from "../../Wolfie2D/DataTypes/Interfaces/Updateable";


export default abstract class EventButton implements Updateable{
    update(deltaT: number): void {
        this.handleDisplayUpdate()
    }

    public handleDisplayUpdate():void{
        if(this.unlocked){this.settingsIfUnlocked()}
        else{this.settingsIfLocked()}
    }

    abstract get unlocked():boolean
    abstract settingsIfLocked():void
    abstract settingsIfUnlocked():void
}