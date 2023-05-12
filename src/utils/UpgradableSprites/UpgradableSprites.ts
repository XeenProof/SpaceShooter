import CanvasNode from "../../Wolfie2D/Nodes/CanvasNode";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import AnimationManager from "../../Wolfie2D/Rendering/Animations/AnimationManager";
import TweenController from "../../Wolfie2D/Rendering/Animations/TweenController";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import PlayerActor, { playerTweens } from "../../game/actors/PlayerActor";
import { playerstates } from "../../game/ai/States/PlayerStates/PlayerState";


export default class UpgradableSprites{
    protected owner:PlayerActor
    protected sprite:AnimatedSprite
    protected levels:number[]

    protected get animations():AnimationManager{return this.sprite.animation}
    public get tween():TweenController{return this.sprite.tweens}

    constructor(owner:PlayerActor, sprite:AnimatedSprite){
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
        if(!this.visible){return;}
        this.animations.pause()
        if(this.owner.ai.isState(playerstates.TAKING_DAMAGE)){
            this.tween.pause(playerTweens.DAMAGE)
        }
    }
    public resume():void{
        if(!this.visible){return;}
        this.animations.resume()
        if(this.owner.ai.isState(playerstates.TAKING_DAMAGE)){
            this.tween.resume(playerTweens.DAMAGE)
        }
    }
    public get visible():boolean{return this.sprite.visible}
    public set visible(value:boolean){this.sprite.visible = value}

    private addDamageTween():void{
        console.log("damage tween added")
        this.sprite.tweens.add(playerTweens.DAMAGE, {
            startDelay: 0,
            duration: 18,
            effects: [{
                property: TweenableProperties.alpha,
                start: 1,
                end: .25,
                ease: EaseFunctionType.IN_OUT_QUAD,
                resetOnComplete: true
            }],
            loop: true
        })
    }
}