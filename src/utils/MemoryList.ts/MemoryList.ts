import MemoryNode from "./MemoryNode";
import MemoryQueue from "./MemoryQueue";


export default abstract class MemoryList<T>{
    protected size:number
    protected preallocated:MemoryQueue<T>
    protected empty:MemoryQueue<T>

    constructor(size:number = 500){
        this.initMore(size)
    }

    private initNodes(prevSize){
        for(let i = prevSize; i < this.size; i++){
            this.preallocated.enqueue(new MemoryNode<T>(this.newMemory()))
        }
    }

    public initMore(size:number){
        let prevSize = this.size?this.size:0
        this.size = size
        this.initNodes(prevSize)
    }

    protected abstract newMemory():T

    public getMemory():T{
        let node = this.preallocated.dequeue()
        if(!node){console.error("No memory Left")}
        let item = node.getMemory()
        this.empty.enqueue(node)
        return item
    }

    public recycle(item:T):void{
        let emptyNode = this.empty.isEmpty?new MemoryNode<T>():this.empty.dequeue()
        emptyNode.item = item
        this.preallocated.enqueue(emptyNode)
    }
}