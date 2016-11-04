
function OrPredicate(left, right) {
    this.left = left;
    this.right = right;
    return this;
}

OrPredicate.prototype.matches = function(stored) {
    return this.left.matches(stored) || this.right.matches(stored);
};

exports.OrPredicate = OrPredicate;