
class OrPredicate {
    constructor(left, right) {
        this.left = left;
        this.right = right;
        return this;
    }

    matches(stored) {
        return this.left.matches(stored) || this.right.matches(stored);
    }
}

exports.OrPredicate = OrPredicate;