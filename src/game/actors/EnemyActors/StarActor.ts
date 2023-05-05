import Spritesheet from "../../../Wolfie2D/DataTypes/Spritesheet";
import AnimatedSprite from "../../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Scene from "../../../Wolfie2D/Scene/Scene";
import RandUtils from "../../../Wolfie2D/Utils/RandUtils";
import { Events } from "../../../constants/events";
import { Layers } from "../../../constants/layers";
import HealthbarHUD from "../../../utils/HUD/HealthbarHUD";
import BasicTargetable from "../../../utils/Targeting/BasicTargetable";
import { TargetableEntity } from "../../../utils/Targeting/TargetableEntity";
import { TargetingEntity } from "../../../utils/Targeting/TargetingEntity";
import BaseScene from "../../scenes/GameplayScenes/BaseScene";
import HPActor from "../abstractActors/HPActor";
import MookActor from "./MookActor";

const animations = {
    IDLE: "IDLE",
    TAKING_DAMAGE: "TAKING_DAMAGE"
}

export default class StarActor extends MookActor{
    public constructor(sheet: Spritesheet){
        super(sheet)
    }
}