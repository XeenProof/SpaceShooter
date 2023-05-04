import Spritesheet from "../../../Wolfie2D/DataTypes/Spritesheet";
import MookActor from "./MookActor";
import PlayerActor from "../PlayerActor";


export default class MagicianActor extends MookActor{
    public constructor(sheet: Spritesheet){
        super(sheet)
    }
}