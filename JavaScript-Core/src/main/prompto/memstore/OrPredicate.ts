import MemPredicate from "./MemPredicate";
import {IStored} from "../store";

export default class OrPredicate {

    left: MemPredicate;
    right: MemPredicate;

    constructor(left: MemPredicate, right: MemPredicate) {
        this.left = left;
        this.right = right;
    }

    matches(stored: IStored): boolean {
        return this.left.matches(stored) || this.right.matches(stored);
    }

}
