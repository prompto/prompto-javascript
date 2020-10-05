
export default class NotPredicate {

    constructor(pred) {
        this.pred = pred;
    }

    matches(stored) {
        return !this.pred.matches(stored);
    }
}
