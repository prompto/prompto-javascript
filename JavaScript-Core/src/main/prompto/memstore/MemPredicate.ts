import {IStored} from "../store";

export default interface MemPredicate {

    matches(stored: IStored): boolean;
}
