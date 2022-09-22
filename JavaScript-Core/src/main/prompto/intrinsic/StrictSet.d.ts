import {Iterator as PromptoIterator} from "./index";

export default class StrictSet<T> implements Iterable<T>  {
    length: number;

    constructor(items?: T[] | null);
    [Symbol.iterator](): Iterator<T>;
    toArray(): T[];
    add(item: T): void;
    addItems(items: T[] | StrictSet<T>): void;
    has(value: T): boolean;
    iterator(): PromptoIterator<T>;
    equals(value: any): boolean;
    intersect(other: StrictSet<T>): StrictSet<T>;

}
