import MemPredicate from "../memstore/MemPredicate";
import { IStored } from "../store";
export default class AndPredicate implements MemPredicate {
    left: MemPredicate;
    right: MemPredicate;
    constructor(left: MemPredicate, right: MemPredicate);
    matches(stored: IStored): boolean;
}
