import {IIterable, IIterator} from "../value";
import {List} from "./index";

export default class StrictSet<T> implements Iterable<T>, IIterable<T>  {
    length: number;

    constructor(items?: T[] | null);
    [Symbol.iterator](): Iterator<T>;
    toArray(): T[];
    add(item: T): void;
    addItems(items: T[] | StrictSet<T>): void;
    has(value: T): boolean;
    getIterator(): IIterator<T>;
    filter(expression: (a:T)=>boolean): List<T>;
    equals(value: any): boolean;
    intersect(other: StrictSet<T>): StrictSet<T>;

}
