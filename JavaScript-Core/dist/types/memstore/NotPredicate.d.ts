import MemPredicate from "./MemPredicate";
import { IStored } from "../store";
export default class NotPredicate implements MemPredicate {
    predicate: MemPredicate;
    constructor(predicate: MemPredicate);
    matches(stored: IStored): boolean;
}
