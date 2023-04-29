import SceneManager from "../../Wolfie2D/Scene/SceneManager";


export default abstract class Checkbox{



    public handleDisplayUpdate():void{
        if(this.value){this.settingsIfTrue()}
        else{this.settingsIfFalse()}
    }

    abstract settingsIfTrue():void;
    abstract settingsIfFalse():void;
    abstract get value():boolean

    get isActive():boolean{return true;}
}