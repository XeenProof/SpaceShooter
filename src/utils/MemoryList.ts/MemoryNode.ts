

export default class MemoryNode<T>{
    private _item: T
    private _next: MemoryNode<T>

    constructor(item: T = null){this.item = item}

    public get item(): T {return this._item}
    public set item(value: T) {this._item = value}
    public get next(): MemoryNode<T> {return this._next}
    public set next(value: MemoryNode<T>) {this._next = value}
    public get isEmpty():boolean {return !!this.item}

    public getMemory():T{
        let item = this.item
        this.item = null
        return item
    }

}