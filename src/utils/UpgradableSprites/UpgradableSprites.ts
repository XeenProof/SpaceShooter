import CanvasNode from "../../Wolfie2D/Nodes/CanvasNode";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import AnimationManager from "../../Wolfie2D/Rendering/Animations/AnimationManager";


export default class UpgradableSprites{
    protected owner:CanvasNode
    protected sprite:AnimatedSprite
    protected levels:number[]

    protected get animations():AnimationManager{return this.sprite.animation}

    constructor(owner:CanvasNode, sprite:AnimatedSprite){
        this.owner = owner
        this.sprite = sprite
        this.levels = sprite.animation.keys.map((x)=>{return +x}).sort((a,b)=> {return a-b})
        if(this.levels[0] < 0){console.error("Indexes can't be less than 0")}
        this.sprite.position.copy(this.owner.position)
        this.updateSprite(0)
    }

    public getAnimationLevel(value: number):number{
        let current = -1
        for(let index of this.levels){
            if(index > value){return current}
            current = index
        }
        return current
    }

    public updateSprite(level: number):void{
        let clamped = this.getAnimationLevel(level)
        this.visible == (clamped >= 0)
        if(!this.visible){this.animations.stop()}
        let key = `${clamped}`
        this.animations.playIfNotAlready(key, true)
        console.log("update sprite", key)
    }

    public updatePosition():void{
        if(!this.visible){return;}
        this.sprite.position.copy(this.owner.position)
    }
    public pause():void{
        if(!this.visible){return;}
        this.animations.pause()
    }
    public resume():void{
        if(!this.visible){return;}
        this.animations.resume()
    }
    public get visible():boolean{return this.sprite.visible}
    public set visible(value:boolean){this.sprite.visible = value}
}