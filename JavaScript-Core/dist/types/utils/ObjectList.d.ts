export default class ObjectList<T> extends Array<T> {
    constructor(items?: T[] | null, item?: T | null);
    addAll(items: T[]): void;
    add(item: T): void;
    insert(before: number, item: T): void;
    remove(index: number): void;
    toString(): string;
}
