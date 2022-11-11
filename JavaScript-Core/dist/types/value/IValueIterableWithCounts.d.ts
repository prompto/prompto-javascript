import IValueIterable from "./IValueIterable";
export default interface IValueIterableWithCounts extends IValueIterable {
    count: number;
    totalCount: number;
}
