import {IIterator} from "./index";
import {Context} from "../runtime";

export default interface IIterable<T> {
    getIterator(context: Context): IIterator<T>;
}
