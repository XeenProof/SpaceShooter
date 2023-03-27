import Spritesheet from "../../Wolfie2D/DataTypes/Spritesheet";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Scene from "../../Wolfie2D/Scene/Scene";


export default class MookActor extends AnimatedSprite {
    protected scene: Scene

    public constructor(sheet: Spritesheet){
        super(sheet)
    }
}