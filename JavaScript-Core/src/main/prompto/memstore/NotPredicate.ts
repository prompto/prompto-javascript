import MemPredicate from "./MemPredicate";
import {IStored} from "../store";

export default class NotPredicate implements MemPredicate {

    predicate: MemPredicate;

    constructor(predicate: MemPredicate) {
        this.predicate = predicate;
    }

    matches(stored: IStored) {
        return !this.predicate.matches(stored);
    }
}
