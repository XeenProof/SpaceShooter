import Spritesheet from "../../../Wolfie2D/DataTypes/Spritesheet";
import MookActor from "../EnemyActors/MookActor"


export default class Level1MookActor extends MookActor{

    public constructor(sheet: Spritesheet){
        super(sheet)
    }

    public takeDamage(damage: number): boolean {
        let bool = super.takeDamage(damage)
        if(bool){this.scale.set(this.percentHealth*2+1, this.percentHealth*2+1)}
        return bool
    }
}