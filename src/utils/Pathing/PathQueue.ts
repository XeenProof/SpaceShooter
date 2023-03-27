import Queue from "../../Wolfie2D/DataTypes/Collections/Queue";
import PathNode from "./PathNode";

export default class PathQueue{
    private path: Queue<PathNode>
    private repeats: Queue<PathNode>
    private maxsize: number;

    constructor(size:number = 100, list:Array<PathNode> = []){
        this.initQueue(size, list)
    }
    
    public enqueue(node: PathNode):void{
        this.path.enqueue(node);
    }

    public dequeue(): PathNode{
        return this._dequeue()
    }

    public clear(): void {
        this.path.clear();
        this.repeats.clear();
    }

    public merge(other: PathQueue):PathQueue{
        let queue = this.getFittingQueue(other.size)
        other.forEach((x)=>{queue.enqueue(x)})
        return queue;
    }

    public forEach(func: (item: PathNode, index?: number) => void): void {
        this.repeats.forEach(func);
        this.path.forEach(func);
    }

    public enqueueArray(other: Array<PathNode>):PathQueue{
        let queue = this.getFittingQueue(other.length)
        other.forEach((x)=>{queue.enqueue(x)})
        return queue
    }

    public peek(): PathNode{
        return (this.pullFrom)?this.pullFrom.peekNext():null;
    }

    private getFittingQueue(extraSpace: number){
        let sizeNeeded = this.size + extraSpace;
        let generateNew = (sizeNeeded > this.maxsize)
        let queue = (generateNew)?new PathQueue(sizeNeeded*2): this
        if(generateNew){
            while(this.pullFrom != null){
                queue.enqueue(this._dequeue(true))
            }
        }
        return queue
    }

    private _dequeue(ignoreRepeat: boolean = false): PathNode{
        let queue = this.pullFrom;
        if(queue == null){return null;}
        let node = queue.dequeue();
        if(ignoreRepeat){return node;}
        node.used();
        if(node.repeat){this.repeats.enqueue(node)}
        return node;
    }

    private get pullFrom(): Queue<PathNode>{
        let path = (this.path.getSize() > 0)?this.path.peekNext():null;
        let repeat = (this.repeats.getSize() > 0)?this.repeats.peekNext():null;
        if(path == null && repeat == null){return null}
        if(path == null){return this.repeats;}
        if(repeat == null){return this.path;}
        if(path.repeat){return this.path;}
        if(repeat.repeat){return this.repeats;}
        return this.path;
    }

    private initQueue(size:number, list:Array<PathNode>){
        this.path = new Queue(size);
        this.repeats = new Queue(size);
        this.maxsize = size;
        list.forEach((node)=>{this.enqueue(node);})
    }

    private get size(){return this.path.getSize() + this.repeats.getSize();}
}