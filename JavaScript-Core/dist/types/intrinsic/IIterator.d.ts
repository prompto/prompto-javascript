export default interface IIterator<T> {
    hasNext(): boolean;
    next(): T;
}
