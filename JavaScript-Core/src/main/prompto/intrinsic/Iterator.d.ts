export default interface Iterator<T> {
    hasNext(): boolean;
    next(): T;
}
