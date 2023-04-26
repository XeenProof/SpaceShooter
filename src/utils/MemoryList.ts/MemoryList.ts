import MemoryNode from "./MemoryNode";
import MemoryQueue from "./MemoryQueue";


export default abstract class MemoryList<T>{
    protected size:number
    protected preallocated:MemoryQueue<T>
    protected empty:MemoryQueue<T>

    constructor(size:number = 0){
        this.preallocated = new MemoryQueue()
        this.empty = new MemoryQueue()
        this.initMore(size)
    }

    private initNodes(prevSize){
        for(let i = prevSize; i < this.size; i++){
            console.log("allocated")
            this.preallocated.enqueue(new MemoryNode<T>(this.newMemory()))
        }
    }

    public initMore(size:number){
        let prevSize = this.size?this.size:0
        this.size = Math.max(size,prevSize)
        this.initNodes(prevSize)
    }

    protected abstract newMemory():T

    public getMemory():T{
        let node = this.preallocated.dequeue()
        if(!node){return null}
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