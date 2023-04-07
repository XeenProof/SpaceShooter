import Vec2 from "../../Wolfie2D/DataTypes/Vec2";


export default interface HealthBarUser{
    get health():number
    get maxHealth():number
    get position():Vec2
    get id():number
    updateHealthBar(deltaT:number):void
}