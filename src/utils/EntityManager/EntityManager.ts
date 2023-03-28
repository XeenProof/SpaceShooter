import GameNode from "../../Wolfie2D/Nodes/GameNode";


/**Key would equate the type of enemy */
export default class EntityManager{
    private entityKeys:Array<string>
    private entities:Map<string, Array<GameNode>>
    private initFuncs:Map<string, ()=>GameNode>

    constructor(){
        this.entityKeys = new Array<string>()
        this.entities = new Map<string,Array<GameNode>>()
        this.initFuncs = new Map<string, ()=>GameNode>();
    }

    public initiateEntity(key: string, total:number, func: ()=>GameNode = this.getinitFunc(key)):void{
        if(!func){console.log("can't initiate"); return}

    }

    public getinitFunc(key:string){return this.initFuncs.get(key)}
    public getEntityList(key:string){return this.entities.get(key);}
    public get keys(){return this.entityKeys}
}