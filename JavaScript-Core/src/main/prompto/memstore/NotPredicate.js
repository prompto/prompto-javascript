
class NotPredicate {
    constructor(pred) {
        this.pred = pred;
        return this;
    }

    matches(stored) {
        return !this.pred.matches(stored);
    }
}

exports.NotPredicate = NotPredicate;