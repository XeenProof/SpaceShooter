import PlayerWeapon from "./PlayerWeapons/PlayerWeapon";


export default class PlayerWeaponManager{
    private weaponList:PlayerWeapon[]

    constructor(){
        this.weaponList = []
    }

    public get projectiles():Record<string, any>[]{
        return this.weaponList.map((x)=>{return x.listToFire}).reduce((x,y)=>{return [...x, ...y]}, [])
    }

    public add(weapon: PlayerWeapon){
        this.weaponList.push(weapon)
    }
}