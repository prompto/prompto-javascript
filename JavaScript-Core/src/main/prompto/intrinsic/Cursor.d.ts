import List from "./List";

export default class Cursor<V> {

    count: number;
    totalCount: number;

    toList(): List<V>;
}
