import Spritesheet from "../../../Wolfie2D/DataTypes/Spritesheet";
import { Events } from "../../../constants/events";
import MookActor from "./MookActor";


export default class HoarderActor extends MookActor{

    private dropchart:Map<number, boolean>

    public resetDrops(...percentages:number[]):void{
        if(!this.dropchart){this.dropchart = new Map<number, boolean>()}
        this.dropchart.clear()
        for(let n of percentages){this.dropchart.set(n, true)}
    }

    constructor(sheet: Spritesheet){
        super(sheet)
    }

    takeDamage(damage: number): boolean {
        let bool = super.takeDamage(damage)
        this.handleScrapDrop()
        return bool
    }

    handleScrapDrop():void {
        if(!this.dropchart){return;}
        for(let [key, bool] of this.dropchart){
            if(this.percentHealth < key && bool){
                this.emitter.fireEvent(Events.DROP_SCRAP, {src: this.position})
                this.dropchart.set(key, false)
            }
        }
    }
}