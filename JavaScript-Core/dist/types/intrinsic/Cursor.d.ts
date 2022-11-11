import List from "./List";
import IIterable from "./IIterable";
import {IIterator} from "./index";

export default class Cursor<V> implements IIterator<V> {

    count: number;
    totalCount: number;

    constructor(mutable: boolean, iterable: IIterable<V>)
    toList(): List<V>;
    hasNext(): boolean;
    next(): V;


}
