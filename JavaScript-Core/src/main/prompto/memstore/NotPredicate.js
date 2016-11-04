
function NotPredicate(pred) {
    this.pred = pred;
    return this;
}

NotPredicate.prototype.matches = function(stored) {
    return !this.pred.matches(stored);
};

exports.NotPredicate = NotPredicate;