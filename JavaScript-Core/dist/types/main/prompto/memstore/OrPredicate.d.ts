import MemPredicate from "./MemPredicate";
import { IStored } from "../store";
export default class OrPredicate {
    left: MemPredicate;
    right: MemPredicate;
    constructor(left: MemPredicate, right: MemPredicate);
    matches(stored: IStored): boolean;
}
