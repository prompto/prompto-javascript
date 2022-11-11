import List from "./List";
import {StrictSet} from "./index";

export default class Document<K,V> {

    $user_keys: string[];
    $safe_length: number;
    $afe_keys: StrictSet<K>;
    $safe_values: List<V>;

    equals(obj: any): boolean;
    $safe_setMember(name: K, value: V): void;
    $safe_getMember(name: K): V | null;
    $safe_add(value: Document<K,V>): Document<K,V>;
}
