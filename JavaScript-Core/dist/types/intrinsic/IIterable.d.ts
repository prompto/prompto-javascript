import {IIterator} from "./index";

export default interface IIterable<T> {
    getIterator(): IIterator<T>;
}
