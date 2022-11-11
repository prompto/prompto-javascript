import { IIterator } from "../intrinsic";
import { Context } from "../runtime";
import { IValue } from "./index";
export default interface IValueIterable {
    getIterator(context: Context): IIterator<IValue>;
}
