import {IIterable, IIterator} from "../value";
import {List} from "./index";

export default class StrictSet<V> implements Iterable<V>, IIterable<V>  {
    length: number;

    constructor(items?: V[] | null);
    [Symbol.iterator](): Iterator<V>;
    toArray(): V[];
    add(item: V): void;
    addItems(items: V[] | StrictSet<V>): void;
    has(value: V): boolean;
    getIterator(): IIterator<V>;
    filter(expression: (a:V)=>boolean): List<V>;
    equals(value: any): boolean;
    intersect(other: StrictSet<V>): StrictSet<V>;

}
