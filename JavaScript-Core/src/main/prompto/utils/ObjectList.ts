export default class ObjectList<T> extends Array<T> {

    constructor(items?: T[] | null, item?: T | null) {
        super();
        if(items) {
            this.addAll(items);
        }
        if(item) {
            this.add(item);
        }
    }

    addAll(items: T[]): void {
        this.push( ...Array.from(items));
    }

    add(item: T): void {
        this.push(item);
    }

    insert(before: number, item: T) {
        this.splice(before, 0, item);
    }

    remove(index: number): void {
        this.splice(index, 1);
    }

    toString(): string {
        return this.join(", ");
    }
}


