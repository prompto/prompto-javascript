import { IntegerValue, IValue } from "./index";
export default interface ISliceable extends IValue {
    slice(first: IntegerValue | null, last: IntegerValue | null): ISliceable;
}
