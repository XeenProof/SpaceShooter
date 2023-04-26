import MemoryNode from "./MemoryNode"


export default class MemoryQueue<T>{
    private size:number
    private head:MemoryNode<T>
    private tail:MemoryNode<T>

    public enqueue(node:MemoryNode<T>):void{
        this.size++
        if(this.isEmpty){
            this.head = node
            this.tail = node
            return
        }
        this.tail.next = node
        this.tail = node
    }

    public dequeue():MemoryNode<T>{
        let node = this.head
        this.head = node.next
        node.next = null
        return node
    }

    public get isEmpty():boolean{return this.head == null || this.tail == null || this.size == 0}
}