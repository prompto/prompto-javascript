import {IIterable} from "./index";

export default interface IIterableWithCounts<V> extends IIterable<V> {
    count: number;
    totalCount: number;
}
