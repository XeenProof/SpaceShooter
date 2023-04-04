import Queue from "../../Wolfie2D/DataTypes/Collections/Queue";
import { scriptFormat } from "../../constants/scripts/scriptTypes";
import ScriptNode from "./ScriptNode";


export default class ScriptQueue extends Queue<ScriptNode>{

    constructor(nodes: ScriptNode[]){
        super(nodes.length+3);
        nodes.forEach((x)=>{this.enqueue(x)})
    }

    get hasNextNode():boolean {
        return this.hasItems()
    }

    getNextNode():ScriptNode{
        return (this.hasNextNode)?this.dequeue():null
    }

    peekNextNode():ScriptNode{
        return (this.hasNextNode)?this.peekNext():null
    }
}

export function generateScriptQueue(script: scriptFormat[]):ScriptQueue{
    return new ScriptQueue(script.map((x)=>{return new ScriptNode(x.type, x.options)}))
}