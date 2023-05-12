import CanvasNode from "../../Wolfie2D/Nodes/CanvasNode";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import AnimationManager from "../../Wolfie2D/Rendering/Animations/AnimationManager";
import TweenController from "../../Wolfie2D/Rendering/Animations/TweenController";
import { playerTweens } from "../../game/actors/PlayerActor";


export default class UpgradableSprites{
    protected owner:CanvasNode
    protected sprite:AnimatedSprite
    protected levels:number[]

    protected get animations():AnimationManager{return this.sprite.animation}
    public get tween():TweenController{return this.sprite.tweens}

    constructor(owner:CanvasNode, sprite:AnimatedSprite){
        this.owner = owner
        this.sprite = sprite
        this.addDamageTween()
        this.levels = sprite.animation.keys.map((x)=>{return +x}).sort((a,b)=> {return a-b})
        if(this.levels[0] < 0){console.error("Indexes can't be less than 0")}
        this.sprite.position.set(this.owner.position.x, this.owner.position.y+6)
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
        this.sprite.position.set(this.owner.position.x, this.owner.position.y+6)
    }
    public pause():void{
        //this.visible = false
        if(!this.visible){return;}
        this.animations.pause()
    }
    public resume():void{
        //this.visible = true
        if(!this.visible){return;}
        this.animations.resume()
    }
    public get visible():boolean{return this.sprite.visible}
    public set visible(value:boolean){this.sprite.visible = value}

    private addDamageTween():void{
        this.sprite.tweens.add(playerTweens.DAMAGE, {
            startDelay: 0,
            duration: 18,
            effects: [{
                property: TweenableProperties.alpha,
                start: 1,
                end: .33,
                resetOnComplete: true
            }],
            loop: true
        })
    }
}