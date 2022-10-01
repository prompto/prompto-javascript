import {StrictSet} from "./index";
import List from "./List";
import {IIterator} from "../value";

export interface KVP<K,V> {
    key: K;
    value: V;
}

export default class Dictionary<K, V> extends Map<K, V> {

    length: number;
    mutable: boolean;
    $keys: StrictSet<K>;
    $values: List<V>;
    $entries: List<KVP<K,V>>;

    constructor(mutable?: boolean, entries?: object);
    isEmpty(): boolean;
    add(dict: Dictionary<K, V>): void;
    hasItem(key: K): boolean;
    setItem(key: K, value: V): void;
    getItem(key: K): V | null;
    iterator(): IIterator<KVP<K, V>>;
    removeItem(value: K): boolean;
    removeValue(value: V): boolean;
}
