import Spritesheet from "../../../Wolfie2D/DataTypes/Spritesheet";
import MookActor from "../EnemyActors/MookActor"


export default class SummonerActor extends MookActor{
    public constructor(sheet: Spritesheet){
        super(sheet)
    }
}