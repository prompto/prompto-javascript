
function AndPredicate(left, right) {
    this.left = left;
    this.right = right;
    return this;
}

AndPredicate.prototype.matches = function(stored) {
    return this.left.matches(stored) && this.right.matches(stored);
};

exports.AndPredicate = AndPredicate;