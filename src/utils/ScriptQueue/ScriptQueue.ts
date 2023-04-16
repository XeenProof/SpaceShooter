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
        if(!this.hasNextNode){return null}
        let node = this.dequeue();
        node.used();
        if(node.repeat){this.enqueue(node)}
        return node
    }

    peekNextNode():ScriptNode{
        return (this.hasNextNode)?this.peekNext():null
    }
}

export function generateScriptQueue(script: scriptFormat[]):ScriptQueue{
    return new ScriptQueue(script.map((x)=>{
        let chance = x.chance?x.chance:1
        let repeat = x.repeat?x.repeat:0
        return new ScriptNode(x.type, x.options, chance, repeat)
    }))
}