
export default class OrPredicate {

    constructor(left, right) {
        this.left = left;
        this.right = right;
    }

    matches(stored) {
        return this.left.matches(stored) || this.right.matches(stored);
    }
}
